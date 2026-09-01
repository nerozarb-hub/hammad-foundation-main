import { PayProClient } from "../../../../lib/paypro/client.ts";
import { checkRateLimit } from "../../../../lib/paypro/security.ts";
import { getDonationRepository } from "../../../../lib/db/index.ts";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  // Click2Pay returns `ordId`, `status`, `msg`. Specifically `ordId` contains the PayProID.
  const payProId =
    searchParams.get("ordId") ||
    searchParams.get("payProId") ||
    searchParams.get("cpayId") ||
    searchParams.get("cpayid") ||
    searchParams.get("id") ||
    "";

  const orderNumber =
    searchParams.get("orderNumber") ||
    searchParams.get("ord") ||
    searchParams.get("order_number") ||
    "";

  return handleVerification(req, { orderNumber, payProId });
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));

  const payProId = typeof body?.ordId === "string"
    ? body.ordId
    : typeof body?.payProId === "string"
    ? body.payProId
    : typeof body?.cpayId === "string"
    ? body.cpayId
    : typeof body?.id === "string"
    ? body.id
    : "";

  const orderNumber = typeof body?.orderNumber === "string"
    ? body.orderNumber
    : typeof body?.ord === "string"
    ? body.ord
    : typeof body?.order_number === "string"
    ? body.order_number
    : "";

  return handleVerification(req, { orderNumber, payProId });
}

async function handleVerification(
  req: Request,
  identifiers: { orderNumber: string; payProId: string }
) {
  try {
    // 1. Rate limiting by client IP
    const forwarded = req.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0].trim() : "127.0.0.1";
    const rateLimit = checkRateLimit(`verify_${ip}`, 30, 60);

    if (!rateLimit.allowed) {
      return Response.json(
        {
          success: false,
          error: "Too many verification requests. Please wait a moment.",
        },
        {
          status: 429,
          headers: {
            "Retry-After": rateLimit.resetInSeconds.toString(),
          },
        }
      );
    }

    const { orderNumber, payProId } = identifiers;
    if (!orderNumber && !payProId) {
      return Response.json(
        {
          success: false,
          status: "failed",
          error: "Missing ordId / payProId or orderNumber for verification.",
        },
        { status: 400 }
      );
    }

    const repo = getDonationRepository();

    // 2. Fetch local donation record
    // If payProId (from ordId) is present, lookup by payProId first; otherwise by orderNumber
    let record = payProId
      ? await repo.findByPayProId(payProId)
      : await repo.findByOrderNumber(orderNumber);

    if (!record && orderNumber) {
      record = await repo.findByOrderNumber(orderNumber);
    }
    if (!record && payProId) {
      record = await repo.findByPayProId(payProId);
    }

    if (!record) {
      return Response.json(
        {
          success: false,
          status: "failed",
          error: "Donation record not found.",
        },
        { status: 404 }
      );
    }

    // 3. If already confirmed paid locally, return verified receipt (Idempotent)
    if (record.status === "paid") {
      return Response.json({
        success: true,
        status: "paid",
        orderNumber: record.orderNumber,
        payProId: record.payProId,
        amount: record.amount,
        currency: "PKR",
        donorName: record.donorName,
        paidAt: record.paidAt,
        isVerifiedWithGateway: true,
        message: "Payment successfully verified.",
      });
    }

    // 4. Verify transaction authenticity through server-side GGOS inquiry
    // NEVER trust query parameters (?status=success, ?msg=paid) alone.
    const effectivePayProId = record.payProId || payProId;

    if (!effectivePayProId) {
      return Response.json({
        success: true,
        status: "pending",
        orderNumber: record.orderNumber,
        payProId: null,
        amount: record.amount,
        currency: "PKR",
        donorName: record.donorName,
        paidAt: null,
        isVerifiedWithGateway: false,
        message: "Awaiting gateway identifier assignment.",
      });
    }

    const payProClient = new PayProClient();
    const ggosResult = await payProClient.getOrderStatus(effectivePayProId);

    if (ggosResult.isPaid) {
      const updated = await repo.updateStatus({
        orderNumber: record.orderNumber,
        status: "paid",
        paidAt: new Date().toISOString(),
        metadata: {
          ggosStatus: ggosResult.rawStatus,
          verifiedAt: new Date().toISOString(),
        },
      });

      return Response.json({
        success: true,
        status: "paid",
        orderNumber: updated?.orderNumber || record.orderNumber,
        payProId: updated?.payProId || record.payProId,
        amount: updated?.amount || record.amount,
        currency: "PKR",
        donorName: record.donorName,
        paidAt: updated?.paidAt || new Date().toISOString(),
        isVerifiedWithGateway: true,
        message: "Payment successfully confirmed with PayPro.",
      });
    }

    if (ggosResult.status === "pending") {
      return Response.json({
        success: true,
        status: "pending",
        orderNumber: record.orderNumber,
        payProId: record.payProId,
        amount: record.amount,
        currency: "PKR",
        donorName: record.donorName,
        paidAt: null,
        isVerifiedWithGateway: true,
        message: "Payment is pending or awaiting processing by the bank.",
      });
    }

    // Expired or Failed status
    await repo.updateStatus({
      orderNumber: record.orderNumber,
      status: ggosResult.status,
      metadata: {
        ggosStatus: ggosResult.rawStatus,
      },
    });

    return Response.json({
      success: true,
      status: ggosResult.status,
      orderNumber: record.orderNumber,
      payProId: record.payProId,
      amount: record.amount,
      currency: "PKR",
      donorName: record.donorName,
      paidAt: null,
      isVerifiedWithGateway: true,
      message: `Payment status: ${ggosResult.description || ggosResult.status}.`,
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Verification error";
    console.error("[PayPro Verification Error]:", errorMsg);

    return Response.json(
      {
        success: false,
        error: "Unable to verify order status with the payment gateway.",
      },
      { status: 500 }
    );
  }
}

