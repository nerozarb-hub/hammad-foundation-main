import { getPayProConfig } from "../../../../lib/paypro/config.ts";
import { PayProClient } from "../../../../lib/paypro/client.ts";
import { timingSafeCompare } from "../../../../lib/paypro/security.ts";
import { getDonationRepository } from "../../../../lib/db/index.ts";
import type { PayProCallbackResponseItem } from "../../../../lib/paypro/types.ts";

export async function POST(req: Request) {
  try {
    const config = getPayProConfig();

    // 1. Parse JSON body
    const body = await req.json().catch(() => null);
    if (!body || typeof body !== "object") {
      const errorResp: PayProCallbackResponseItem[] = [
        {
          StatusCode: "01",
          InvoiceID: null,
          Description: "Invalid Data. Username or password is invalid",
        },
      ];
      return Response.json(errorResp, { status: 400 });
    }

    const payload = body as Record<string, unknown>;
    const username = String(payload.username || payload.UserName || payload.Username || "");
    const password = String(payload.password || payload.Password || "");
    const rawInvoiceIds = String(payload.csvinvoiceids || payload.csvInvoiceIds || payload.csvInvoiceIDs || payload.invoiceIds || "");

    // 2. Timing-safe credential verification
    const expectedUsername = config.callbackUsername;
    const expectedPassword = config.callbackPassword;

    // When callback credentials are configured or in production, enforce strict matching
    if (expectedUsername || expectedPassword) {
      const isUserValid = timingSafeCompare(username, expectedUsername);
      const isPassValid = timingSafeCompare(password, expectedPassword);

      if (!isUserValid || !isPassValid) {
        console.warn("[PayPro Callback Auth Failed]: Invalid credentials provided in callback");
        const authFailResp: PayProCallbackResponseItem[] = [
          {
            StatusCode: "01",
            InvoiceID: null,
            Description: "Invalid Data. Username or password is invalid",
          },
        ];
        return Response.json(authFailResp, { status: 401 });
      }
    }

    // 3. Extract and parse comma-separated Order Numbers (csvinvoiceids = OUR Order Numbers)
    const orderNumbers = rawInvoiceIds
      .split(",")
      .map((id) => id.trim())
      .filter((id) => id.length > 0);

    if (orderNumbers.length === 0) {
      const emptyResp: PayProCallbackResponseItem[] = [
        {
          StatusCode: "01",
          InvoiceID: null,
          Description: "Invalid Data. No invoice IDs provided",
        },
      ];
      return Response.json(emptyResp, { status: 400 });
    }

    const repo = getDonationRepository();
    const payProClient = new PayProClient();
    const results: PayProCallbackResponseItem[] = [];

    // 4. Process each OrderNumber independently:
    // csvinvoiceids -> findByOrderNumber() -> retrieve stored donation.payProId -> GGOS -> update if PAID
    for (const orderNumber of orderNumbers) {
      try {
        const record = await repo.findByOrderNumber(orderNumber);

        if (!record) {
          results.push({
            StatusCode: "03",
            InvoiceID: orderNumber,
            Description: "No records found.",
          });
          continue;
        }

        if (!record.payProId) {
          results.push({
            StatusCode: "03",
            InvoiceID: orderNumber,
            Description: "No records found.",
          });
          continue;
        }

        // IDEMPOTENCY: If already marked as paid, do not repeat side effects or rewrite timestamps
        if (record.status === "paid") {
          results.push({
            StatusCode: "00",
            InvoiceID: orderNumber,
            Description: "Invoice successfully marked as paid",
          });
          continue;
        }

        // Query GGOS using stored PayProID (cpayId) - NEVER send orderNumber to GGOS
        const ggos = await payProClient.getOrderStatus(record.payProId);

        if (ggos.isPaid) {
          await repo.updateStatus({
            orderNumber: record.orderNumber,
            status: "paid",
            paidAt: new Date().toISOString(),
            metadata: {
              source: "server_callback",
              ggosStatus: ggos.rawStatus,
              receivedAt: new Date().toISOString(),
            },
          });

          results.push({
            StatusCode: "00",
            InvoiceID: orderNumber,
            Description: "Invoice successfully marked as paid",
          });
        } else {
          results.push({
            StatusCode: "02",
            InvoiceID: orderNumber,
            Description: `Invoice payment not confirmed by gateway (${ggos.rawStatus || "unpaid"}).`,
          });
        }
      } catch (innerErr: unknown) {
        const msg = innerErr instanceof Error ? innerErr.message : "Error verifying invoice";
        console.error(`[PayPro Callback Error for order ${orderNumber}]:`, msg);
        results.push({
          StatusCode: "02",
          InvoiceID: orderNumber,
          Description: "Service failure during gateway verification.",
        });
      }
    }

    // 5. Return PayPro official callback response array
    return Response.json(results, { status: 200 });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Internal callback error";
    console.error("[PayPro Callback Server Error]:", errorMsg);

    const errorResp: PayProCallbackResponseItem[] = [
      {
        StatusCode: "02",
        InvoiceID: null,
        Description: "Internal service failure processing callback",
      },
    ];
    return Response.json(errorResp, { status: 500 });
  }
}

