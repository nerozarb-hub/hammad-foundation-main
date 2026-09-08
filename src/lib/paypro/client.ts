import 'server-only';
import { getPayProConfig, type PayProConfig } from './config.ts';
import { isValidPayProDomain } from './security.ts';
import { nodePayProTransport, sendPayProRequest, type PayProTransportFn } from './transport.ts';

function item(body: string): Record<string, unknown> {
  let parsed: unknown;
  try { parsed = JSON.parse(body); } catch { throw new Error('Malformed gateway response'); }
  // Multiple records are ambiguous, so do not choose the first arbitrarily.
  if (Array.isArray(parsed)) { if (parsed.length !== 1) throw new Error('Ambiguous gateway response'); parsed = parsed[0]; }
  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) throw new Error('Malformed gateway response');
  return parsed as Record<string, unknown>;
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
      MerchantId: this.config.merchantId, OrderNumber: params.orderNumber,
      OrderAmount: (moneyMinor(params.amount) / 100).toFixed(2),
      OrderDueDate: new Date(now.getTime() + 14 * 86400_000).toISOString().slice(0, 10),
      OrderType: 'Service', IssueDate: now.toISOString().slice(0, 10),
      OrderExpireAfterSeconds: String(params.expireAfterSeconds ?? 86400),
      CustomerName: params.donorName, CustomerMobile: params.donorPhone || '', CustomerEmail: params.donorEmail || '', CustomerAddress: '',
    }];
    const data = item((await sendPayProRequest(this.config, '/v2/ppro/co', 'POST', token, payload, this.transport)).body);
    if (!['00', '0', 'Success'].includes(String(data.Status))) throw new Error('Order creation not confirmed');
    const payProId = identifier(data.PayProId);
    if (!payProId || (data.OrderNumber !== undefined && data.OrderNumber !== params.orderNumber)) throw new Error('Order identity mismatch');
    const click2PayUrl = typeof data.Click2Pay === 'string' ? data.Click2Pay : '';
    if (!isValidPayProDomain(click2PayUrl)) throw new Error('Untrusted payment URL');
    const billUrl = typeof data.BillUrl === 'string' ? data.BillUrl : undefined;
    if (billUrl && !isValidPayProDomain(billUrl)) throw new Error('Untrusted bill URL');
    return { payProId, orderNumber: params.orderNumber, click2PayUrl, billUrl, status: String(data.Status), description: '' };
  }
  async getOrderStatus(payProId: string) {
    if (!identifier(payProId)) throw new Error('PayProID is required');
    const token = await this.authenticate();
    const data = item((await sendPayProRequest(this.config, '/v2/ppro/ggos', 'GET', token,
      { userName: this.config.merchantId, cpayId: payProId }, this.transport)).body);
    const returnedId = identifier(data.PayProId ?? data.cpayId);
    if (!returnedId || returnedId !== payProId || (data.cpayId !== undefined && identifier(data.cpayId) !== payProId)) throw new Error('Gateway identity mismatch');
    // Status is an API result code, not evidence of settlement. Only explicit
    // OrderStatus=PAID plus matching identity and amount can settle a donation.
    const rawStatus = String(data.OrderStatus ?? '').toUpperCase();
    let status: 'paid' | 'pending' | 'failed' | 'expired';
    if (rawStatus === 'PAID') status = 'paid';
    else if (['UNPAID', 'PENDING'].includes(rawStatus)) status = 'pending';
    else if (rawStatus === 'FAILED') status = 'failed';
    else if (rawStatus === 'EXPIRED') status = 'expired';
    else throw new Error('Unrecognized gateway payment status');
    const paidAmount = data.PaidAmount === undefined ? undefined : moneyMinor(data.PaidAmount) / 100;
    if (status === 'paid' && paidAmount === undefined) throw new Error('Gateway paid amount missing');
    return { status, isPaid: status === 'paid', payProId: returnedId, rawStatus, paidAmount, description: '' };
  }
}
