import { PayProClient } from "../../../../lib/paypro/client.ts";
import { checkRateLimit, generateOrderNumber, validateDonationInput } from "../../../../lib/paypro/security.ts";
import { getDonationRepository } from "../../../../lib/db/index.ts";

export async function POST(req: Request) {
  try {
    // 1. Rate limiting by client IP
    const forwarded = req.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0].trim() : "127.0.0.1";
    const rateLimit = checkRateLimit(`create_order_${ip}`, 15, 60);

    if (!rateLimit.allowed) {
      return Response.json(
        {
          success: false,
          error: "Too many requests. Please wait a moment before trying again.",
        },
        {
          status: 429,
          headers: {
            "Retry-After": rateLimit.resetInSeconds.toString(),
          },
        }
      );
    }

    // 2. Parse & Validate input
    const body = await req.json().catch(() => null);
    const validation = validateDonationInput(body);

    if (!validation.valid || !validation.data) {
      return Response.json(
        {
          success: false,
          error: "Invalid donation information provided.",
          details: validation.errors,
        },
        { status: 400 }
      );
    }

    const { amount, donorName, donorEmail, donorPhone, supportOptionId } = validation.data;

    // 3. Resolve donation repository (fails closed in production if durable DB is unconfigured)
    const repo = getDonationRepository();

    // 4. Generate secure server-side Order Number
    const orderNumber = generateOrderNumber("HF");

    // 5. Persist pending donation in repository
    await repo.create({
      orderNumber,
      payProId: null,
      amount,
      donorName,
      donorEmail: donorEmail || null,
      donorPhone: donorPhone || null,
      supportOptionId,
      status: "pending",
      click2PayUrl: null,
      billUrl: null,
    });

    // 6. Call PayPro V2 create order API
    const payProClient = new PayProClient();
    const orderResult = await payProClient.createOrder({
      orderNumber,
      amount,
      donorName,
      donorEmail,
      donorPhone,
    });

    // 7. Update database record with PayPro response identifiers
    await repo.attachPayProId(
      orderNumber,
      orderResult.payProId,
      orderResult.click2PayUrl,
      orderResult.billUrl
    );

    // 8. Return safe checkout details to the browser
    return Response.json({
      success: true,
      orderNumber,
      payProId: orderResult.payProId,
      click2PayUrl: orderResult.click2PayUrl,
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Internal error";
    // Safe server-side log (no credentials or tokens logged)
    console.error("[PayPro Create Order Error]:", errorMsg);

    return Response.json(
      {
        success: false,
        error: "Unable to initialize payment with the payment gateway. Please try again or contact support.",
      },
      { status: 500 }
    );
  }
}

