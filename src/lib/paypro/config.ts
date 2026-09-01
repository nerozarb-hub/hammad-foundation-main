export interface PayProConfig {
  baseUrl: string;
  clientId: string;
  clientSecret: string;
  merchantId: string;
  callbackUsername: string;
  callbackPassword: string;
  environment: "production" | "sandbox" | "demo";
  appUrl: string;
  isConfigured: boolean;
}

export const DEMO_PAYPRO_BASE_URL = "https://demoapi.paypro.com.pk";

export function getPayProConfig(envOverrides?: Record<string, string | undefined>): PayProConfig {
  const envSource = envOverrides || process.env;

  const rawEnv = envSource.PAYPRO_ENV?.trim().toLowerCase();
  const environment: "production" | "sandbox" | "demo" =
    rawEnv === "production" ? "production" : rawEnv === "demo" ? "demo" : "sandbox";

  const rawBaseUrl = envSource.PAYPRO_BASE_URL?.trim();

  // In production, PAYPRO_BASE_URL must be explicitly supplied. We NEVER infer or hardcode a production URL.
  // In sandbox/demo, default explicitly to the confirmed official demo endpoint: https://demoapi.paypro.com.pk
  let baseUrl = "";
  if (environment === "production") {
    baseUrl = rawBaseUrl ? rawBaseUrl.replace(/\/$/, "") : "";
  } else {
    baseUrl = (rawBaseUrl || DEMO_PAYPRO_BASE_URL).replace(/\/$/, "");
  }

  const clientId = envSource.PAYPRO_CLIENT_ID?.trim() || "";
  const clientSecret = envSource.PAYPRO_CLIENT_SECRET?.trim() || "";
  const merchantId = envSource.PAYPRO_MERCHANT_ID?.trim() || "";
  const callbackUsername = envSource.PAYPRO_CALLBACK_USERNAME?.trim() || "";
  const callbackPassword = envSource.PAYPRO_CALLBACK_PASSWORD?.trim() || "";

  const appUrl = (
    envSource.NEXT_PUBLIC_APP_URL ||
    envSource.APP_URL ||
    envSource.NEXT_PUBLIC_HAMMAD_SITE_URL ||
    "https://hammad.yzeducationalservices.com"
  ).replace(/\/$/, "");

  // In production, isConfigured strictly requires baseUrl + credentials
  // In sandbox/demo, credentials are required for live sandbox calls
  const isConfigured = environment === "production"
    ? Boolean(baseUrl && clientId && clientSecret && merchantId)
    : Boolean(clientId && clientSecret && merchantId);

  return {
    baseUrl,
    clientId,
    clientSecret,
    merchantId,
    callbackUsername,
    callbackPassword,
    environment,
    appUrl,
    isConfigured,
  };
}

