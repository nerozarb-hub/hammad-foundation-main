import 'server-only';

export interface PayProConfig {
  baseUrl: string;
  clientId: string;
  clientSecret: string;
  merchantId: string;
  callbackUsername: string;
  callbackPassword: string;
  environment: 'production' | 'sandbox' | 'demo';
  appUrl: string;
  isConfigured: boolean;
  liveRequestsEnabled: boolean;
}

export const DEMO_PAYPRO_BASE_URL = 'https://demoapi.paypro.com.pk';
export const PRODUCTION_PAYPRO_BASE_URL = 'https://api.paypro.com.pk';

export function getPayProConfig(overrides?: Record<string, string | undefined>): PayProConfig {
  const env = overrides ?? process.env;
  const rawEnv = env.PAYPRO_ENV?.trim().toLowerCase();
  if (env.NODE_ENV === 'production' && !rawEnv) throw new Error('Explicit payment environment required');
  if (rawEnv && !['production', 'sandbox', 'demo'].includes(rawEnv)) throw new Error('Invalid payment environment');
  const environment = (rawEnv || 'sandbox') as PayProConfig['environment'];
  const baseUrl = (env.PAYPRO_BASE_URL?.trim() || (environment === 'production' ? '' : DEMO_PAYPRO_BASE_URL)).replace(/\/$/, '');
  if (baseUrl && baseUrl !== (environment === 'production' ? PRODUCTION_PAYPRO_BASE_URL : DEMO_PAYPRO_BASE_URL)) {
    throw new Error('Payment host does not match environment');
  }
  const appUrl = (env.APP_URL || env.NEXT_PUBLIC_APP_URL || env.NEXT_PUBLIC_HAMMAD_SITE_URL || 'https://hammad.yzeducationalservices.com').replace(/\/$/, '');
  const app = new URL(appUrl);
  if (environment === 'production' && (app.protocol !== 'https:' || app.username || app.password)) throw new Error('HTTPS application URL required');
  const clientId = env.PAYPRO_CLIENT_ID?.trim() || '';
  const clientSecret = env.PAYPRO_CLIENT_SECRET?.trim() || '';
  const merchantId = env.PAYPRO_MERCHANT_ID?.trim() || '';
  const callbackUsername = env.PAYPRO_CALLBACK_USERNAME?.trim() || '';
  const callbackPassword = env.PAYPRO_CALLBACK_PASSWORD?.trim() || '';
  return { baseUrl, environment, appUrl, clientId, clientSecret, merchantId, callbackUsername, callbackPassword,
    isConfigured: Boolean(baseUrl && clientId && clientSecret && merchantId && callbackUsername && callbackPassword),
    liveRequestsEnabled: env.PAYPRO_LIVE_REQUESTS_ENABLED === 'true' && (!env.VERCEL_ENV || env.VERCEL_ENV === 'production'),
  };
}

export function assertGatewayEnabled(config: PayProConfig): void {
  if (!config.isConfigured) throw new Error('Payment configuration incomplete');
  if (config.environment === 'production' && !config.liveRequestsEnabled) throw new Error('Live payment requests are disabled');
}
