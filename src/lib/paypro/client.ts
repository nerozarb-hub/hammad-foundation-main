import { getPayProConfig, type PayProConfig } from "./config.ts";
import { isValidPayProDomain } from "./security.ts";
import type {
  PayProCreateOrderPayload,
  PayProCreateOrderResponse,
  PayProGgosRequest,
  PayProGgosResponse,
  PayProOrderResponseItem,
  PayProGgosResponseItem,
} from "./types.ts";

export class PayProClient {
  private config: PayProConfig;

  constructor(customConfig?: Partial<PayProConfig>) {
    const base = getPayProConfig();
    this.config = { ...base, ...customConfig };
  }

  /**
   * Authenticate server-side with PayPro V2.
   * Extracts the authentication token from response headers.
   * NEVER logs or exposes the credentials or auth token.
   */
  async authenticate(): Promise<string> {
    if (this.config.environment === "production" && !this.config.baseUrl) {
      throw new Error("PayPro configuration error: PAYPRO_BASE_URL must be explicitly supplied in the production environment");
    }

    if (!this.config.isConfigured) {
      if (this.config.environment === "sandbox" || this.config.environment === "demo") {
        return "mock_sandbox_auth_token_" + Date.now();
      }
      throw new Error("PayPro credentials are not configured");
    }

    const url = `${this.config.baseUrl}/v2/ppro/auth`;

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          clientid: this.config.clientId,
          clientsecret: this.config.clientSecret,
        }),
      });

      if (!res.ok) {
        throw new Error(`PayPro authentication failed with status ${res.status}`);
      }

      // PayPro returns the auth token in the response headers (case-insensitive)
      const token = res.headers.get("token") || res.headers.get("Token");

      if (token) {
        return token;
      }

      // Fallback: check if returned in body json
      const body = await res.json().catch(() => null);
      if (body && typeof body === "object") {
        const bodyToken = (body as Record<string, unknown>).Token || (body as Record<string, unknown>).token;
        if (typeof bodyToken === "string" && bodyToken) {
          return bodyToken;
        }
      }

      throw new Error("PayPro response did not include an authentication token");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "PayPro authentication error";
      // Never log or leak secrets
      throw new Error(`PayPro Auth Error: ${message}`);
    }
  }

  /**
   * Create an order via PayPro V2 API (`/v2/ppro/co`).
   */
  async createOrder(params: {
    orderNumber: string;
    amount: number;
    donorName: string;
    donorEmail?: string;
    donorPhone?: string;
    expireAfterSeconds?: number;
  }): Promise<{
    payProId: string;
    orderNumber: string;
    click2PayUrl: string;
    billUrl?: string;
    status: string;
    description: string;
  }> {
    if (this.config.environment === "production" && !this.config.baseUrl) {
      throw new Error("PayPro configuration error: PAYPRO_BASE_URL must be explicitly supplied in the production environment");
    }

    // Sandbox / mock mode when unconfigured or demo
    if (!this.config.isConfigured) {
      if (this.config.environment === "sandbox" || this.config.environment === "demo") {
        const mockPayProId = "PP-" + Math.floor(100000 + Math.random() * 900000);
        return {
          payProId: mockPayProId,
          orderNumber: params.orderNumber,
          click2PayUrl: `https://demoapi.paypro.com.pk/click2pay?id=${mockPayProId}&ord=${encodeURIComponent(params.orderNumber)}`,
          billUrl: `https://demoapi.paypro.com.pk/bill?id=${mockPayProId}`,
          status: "00",
          description: "Mock order created successfully in sandbox mode",
        };
      }
      throw new Error("PayPro credentials are not configured");
    }

    const token = await this.authenticate();

    const now = new Date();
    const issueDate = now.toISOString().slice(0, 10);
    // Due date 14 days in the future
    const dueDate = new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);

    const payload: [ { MerchantId: string }, PayProCreateOrderPayload ] = [
      {
        MerchantId: this.config.merchantId,
      },
      {
        MerchantId: this.config.merchantId,
        OrderNumber: params.orderNumber,
        OrderAmount: params.amount.toString(),
        OrderDueDate: dueDate,
        OrderType: "Service",
        IssueDate: issueDate,
        OrderExpireAfterSeconds: (params.expireAfterSeconds || 86400).toString(),
        CustomerName: params.donorName,
        CustomerMobile: params.donorPhone || "",
        CustomerEmail: params.donorEmail || "",
        CustomerAddress: "",
      },
    ];

    const url = `${this.config.baseUrl}/v2/ppro/co`;

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        token: token,
        Token: token,
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      throw new Error(`PayPro order creation failed with status ${res.status}`);
    }

    const rawData = (await res.json()) as PayProCreateOrderResponse;
    const item: PayProOrderResponseItem | undefined = Array.isArray(rawData) ? rawData[0] : rawData;

    if (!item) {
      throw new Error("Empty or malformed response from PayPro create order API");
    }

    // PayPro returns Status "00" or "0" for success
    const status = String(item.Status ?? "");
    const description = String(item.Description ?? "");

    if (status !== "00" && status !== "0" && status !== "Success" && status !== "") {
      throw new Error(`PayPro order creation rejected: ${description || status}`);
    }

    const payProId = String(item.PayProId || item.InvoiceId || "");
    const returnedOrderNumber = String(item.OrderNumber || params.orderNumber);
    const click2Pay = String(item.Click2Pay || item.click2pay || "");
    const billUrl = item.BillUrl ? String(item.BillUrl) : undefined;

    if (!click2Pay) {
      throw new Error("PayPro response did not return a Click2Pay URL");
    }

    // Validate Click2Pay URL domain to prevent open redirect vulnerabilities
    if (!isValidPayProDomain(click2Pay, this.config.baseUrl)) {
      throw new Error("PayPro returned an untrusted Click2Pay URL domain");
    }

    return {
      payProId,
      orderNumber: returnedOrderNumber,
      click2PayUrl: click2Pay,
      billUrl,
      status,
      description,
    };
  }

  /**
   * Check General Order Status via PayPro V2 GGOS (`GET /v2/ppro/ggos`).
   *
   * Official PayPro V2 contract:
   * GET /v2/ppro/ggos
   * Request body:
   * {
   *   "userName": PAYPRO_MERCHANT_ID,
   *   "cpayId": PAYPRO_ID
   * }
   *
   * We do NOT send our Hammad OrderNumber to GGOS.
   * The PayProID returned from Create Order is the cpayId required by GGOS.
   */
  async getOrderStatus(orderIdentifier: string | { payProId: string }): Promise<{
    status: "paid" | "pending" | "failed" | "expired";
    isPaid: boolean;
    payProId: string;
    rawStatus: string;
    description: string;
    paidAmount?: number;
  }> {
    if (this.config.environment === "production" && !this.config.baseUrl) {
      throw new Error("PayPro configuration error: PAYPRO_BASE_URL must be explicitly supplied in the production environment");
    }

    const payProId = typeof orderIdentifier === "string" ? orderIdentifier.trim() : (orderIdentifier.payProId || "").trim();

    if (!payProId) {
      throw new Error("PayProID (cpayId) is required to query General Order Status (GGOS)");
    }

    if (!this.config.isConfigured) {
      if (this.config.environment === "sandbox" || this.config.environment === "demo") {
        return {
          status: "pending",
          isPaid: false,
          payProId,
          rawStatus: "UNPAID",
          description: "Mock sandbox status: Pending payment",
        };
      }
      throw new Error("PayPro credentials are not configured");
    }

    const token = await this.authenticate();

    const payload: PayProGgosRequest = {
      userName: this.config.merchantId,
      cpayId: payProId,
    };

    const url = `${this.config.baseUrl}/v2/ppro/ggos`;

    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        token: token,
        Token: token,
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      throw new Error(`PayPro GGOS status request failed with status ${res.status}`);
    }

    const rawData = (await res.json()) as PayProGgosResponse;
    const item: PayProGgosResponseItem | undefined = Array.isArray(rawData) ? rawData[0] : rawData;

    if (!item) {
      throw new Error("Empty response received from PayPro GGOS API");
    }

    const rawStatus = String(item.OrderStatus || item.Status || "").toUpperCase();
    const description = String(item.Description || "");
    const returnedPayProId = String(item.PayProId || item.cpayId || payProId);
    const paidAmount = item.PaidAmount ? Number(item.PaidAmount) : undefined;

    const isPaid = rawStatus === "PAID" || rawStatus === "SUCCESS" || rawStatus === "00";
    const isExpired = rawStatus === "EXPIRED" || rawStatus === "CANCELLED";

    let status: "paid" | "pending" | "failed" | "expired" = "pending";
    if (isPaid) {
      status = "paid";
    } else if (isExpired) {
      status = "expired";
    } else if (rawStatus === "FAILED" || rawStatus === "REJECTED") {
      status = "failed";
    }

    return {
      status,
      isPaid,
      payProId: returnedPayProId,
      rawStatus,
      description,
      paidAmount,
    };
  }
}

