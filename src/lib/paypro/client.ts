import 'server-only';
import { getPayProConfig, type PayProConfig } from './config.ts';
import { isValidPayProDomain } from './security.ts';
import { nodePayProTransport, sendPayProRequest, type PayProTransportFn } from './transport.ts';

function responsePair(body: string): { status: string; data: Record<string, unknown> } {
  let parsed: unknown;
  try { parsed = JSON.parse(body); } catch { throw new Error('Malformed gateway response'); }
  // PayPro V2 returns a two-object array: API status first, result data second.
  if (!Array.isArray(parsed) || parsed.length !== 2) throw new Error('Malformed gateway response');
  const [metadata, data] = parsed;
  if (!metadata || typeof metadata !== 'object' || Array.isArray(metadata) ||
      !data || typeof data !== 'object' || Array.isArray(data)) throw new Error('Malformed gateway response');
  const status = String((metadata as Record<string, unknown>).Status ?? '');
  if (status !== '00') throw new Error('Gateway operation not confirmed');
  return { status, data: data as Record<string, unknown> };
}
function identifier(value: unknown): string {
  if (typeof value === 'number' && !Number.isSafeInteger(value)) throw new Error('Invalid gateway identifier');
  if (typeof value !== 'string' && typeof value !== 'number') return '';
  const result = String(value).trim();
  if (!/^[A-Za-z0-9_-]{1,100}$/.test(result)) throw new Error('Invalid gateway identifier');
  return result;
}
export function moneyMinor(value: unknown): number {
  if (typeof value !== 'number' && typeof value !== 'string') throw new Error('Invalid payment amount');
  const text = String(value);
  if (!/^\d{1,10}(\.\d{1,2})?$/.test(text)) throw new Error('Invalid payment amount');
  const [whole, fraction = ''] = text.split('.');
  const result = Number(whole) * 100 + Number(fraction.padEnd(2, '0'));
  if (!Number.isSafeInteger(result)) throw new Error('Invalid payment amount');
  return result;
}

function payProDate(date: Date): string {
  const day = String(date.getUTCDate()).padStart(2, '0');
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  return `${day}/${month}/${date.getUTCFullYear()}`;
}

function payProAmount(value: number): string {
  const minor = moneyMinor(value);
  return minor % 100 === 0 ? String(minor / 100) : (minor / 100).toFixed(2);
}

export class PayProClient {
  private config: PayProConfig;
  private transport: PayProTransportFn;
  constructor(config: PayProConfig = getPayProConfig(), transport: PayProTransportFn = nodePayProTransport) {
    this.config = config; this.transport = transport;
  }
  async authenticate(): Promise<string> {
    const response = await sendPayProRequest(this.config, '/v2/ppro/auth', 'POST', undefined,
      { clientid: this.config.clientId, clientsecret: this.config.clientSecret }, this.transport);
    // Retain the existing header contract. Do not invent token response aliases.
    const token = response.headers.get('token');
    if (!token || token.length > 8192 || /[\r\n]/.test(token)) throw new Error('Missing gateway authentication token');
    return token;
  }
  async createOrder(params: { orderNumber: string; amount: number; donorName: string; donorEmail?: string; donorPhone?: string; expireAfterSeconds?: number }) {
    const token = await this.authenticate();
    const now = new Date();
    const payload = [{ MerchantId: this.config.merchantId }, {
      OrderNumber: params.orderNumber,
      OrderAmount: payProAmount(params.amount),
      OrderDueDate: payProDate(new Date(now.getTime() + 14 * 86400_000)),
      OrderType: 'Service', IssueDate: payProDate(now),
      OrderExpireAfterSeconds: String(params.expireAfterSeconds ?? 0),
      CustomerName: params.donorName, CustomerMobile: params.donorPhone || '', CustomerEmail: params.donorEmail || '', CustomerAddress: '',
    }];
    const { status, data } = responsePair((await sendPayProRequest(this.config, '/v2/ppro/co', 'POST', token, payload, this.transport)).body);
    const payProId = identifier(data.PayProId);
    if (!payProId || (data.OrderNumber !== undefined && data.OrderNumber !== params.orderNumber)) throw new Error('Order identity mismatch');
    const rawClick2PayUrl = typeof data.Click2Pay === 'string' ? data.Click2Pay : '';
    if (!isValidPayProDomain(rawClick2PayUrl)) throw new Error('Untrusted payment URL');
    const checkout = new URL(rawClick2PayUrl);
    checkout.searchParams.set('callback_url', new URL('/donation/return', this.config.appUrl).toString());
    const click2PayUrl = checkout.toString();
    const rawBillUrl = typeof data.BillUrl === 'string' ? data.BillUrl : undefined;
    // BillUrl is optional and older PayPro examples use a non-standard cpay.pk
    // endpoint. Never expose it unless it passes the same strict redirect policy.
    const billUrl = rawBillUrl && isValidPayProDomain(rawBillUrl) ? rawBillUrl : undefined;
    return { payProId, orderNumber: params.orderNumber, click2PayUrl, billUrl, status, description: typeof data.Description === 'string' ? data.Description : '' };
  }
  async getOrderStatus(payProId: string, expectedOrderNumber: string) {
    if (!identifier(payProId)) throw new Error('PayProID is required');
    if (!identifier(expectedOrderNumber)) throw new Error('Order number is required');
    const token = await this.authenticate();
    const { data } = responsePair((await sendPayProRequest(this.config, '/v2/ppro/ggos', 'GET', token,
      { userName: this.config.merchantId, cpayId: payProId }, this.transport)).body);
    const returnedOrderNumber = identifier(data.OrderNumber);
    if (!returnedOrderNumber || returnedOrderNumber !== expectedOrderNumber) throw new Error('Gateway identity mismatch');
    // Status is an API result code, not evidence of settlement. Only explicit
    // OrderStatus=PAID plus matching identity and amount can settle a donation.
    const rawStatus = String(data.OrderStatus ?? '').toUpperCase();
    let status: 'paid' | 'pending' | 'failed' | 'expired';
    if (rawStatus === 'PAID') status = 'paid';
    else if (['UNPAID', 'PENDING'].includes(rawStatus)) status = 'pending';
    else if (rawStatus === 'FAILED') status = 'failed';
    else if (rawStatus === 'EXPIRED') status = 'expired';
    else throw new Error('Unrecognized gateway payment status');
    const paidAmount = data.OrderAmountPaid === undefined ? undefined : moneyMinor(data.OrderAmountPaid) / 100;
    if (status === 'paid' && paidAmount === undefined) throw new Error('Gateway paid amount missing');
    return { status, isPaid: status === 'paid', payProId, orderNumber: returnedOrderNumber, rawStatus, paidAmount, description: '' };
  }
}
