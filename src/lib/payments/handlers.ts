import 'server-only';
import { getPayProConfig, assertGatewayEnabled, type PayProConfig } from '../paypro/config.ts';
import { PayProClient, moneyMinor } from '../paypro/client.ts';
import { generateOrderNumber, timingSafeCompare, validateDonationInput } from '../paypro/security.ts';
import { getDonationRepository, type IDonationRepository, type StoredDonation } from '../db/index.ts';
import { cookieValue, hash, json, readJson, receiptCookie, sameOrigin } from './http.ts';

interface Dependencies { config: () => PayProConfig; repository: () => IDonationRepository; gateway: (config: PayProConfig) => Pick<PayProClient, 'createOrder' | 'getOrderStatus'> }
const defaults: Dependencies = { config: getPayProConfig, repository: getDonationRepository, gateway: config => new PayProClient(config) };
const validOrder = (value: string) => /^HF-\d{8}-[A-F0-9]{32}$/.test(value);
const validPayProId = (value: string) => /^[A-Za-z0-9_-]{1,100}$/.test(value);

async function verifyRecord(repo: IDonationRepository, gateway: ReturnType<Dependencies['gateway']>, record: StoredDonation) {
  if (!record.payProId) throw new Error('Gateway identifier unavailable');
  // Paid records can only be written by validated server verification. Replays
  // return the durable result without calling the gateway again.
  if (record.status === 'paid') return record;
  const result = await gateway.getOrderStatus(record.payProId, record.orderNumber);
  if (result.payProId !== record.payProId || result.orderNumber !== record.orderNumber) throw new Error('Payment identity mismatch');
  if (result.status === 'paid' && (!result.isPaid || result.paidAmount === undefined || moneyMinor(result.paidAmount) !== moneyMinor(record.amount))) throw new Error('Payment amount mismatch');
  if (result.isPaid !== (result.status === 'paid')) throw new Error('Payment status mismatch');
  return repo.recordVerification(record.orderNumber, record.payProId, result.status, result.paidAmount);
}
function receipt(record: StoredDonation) {
  return { success: true, status: record.status, orderNumber: record.orderNumber, payProId: record.payProId,
    amount: record.amount, currency: record.currency, donorName: record.donorName, paidAt: record.paidAt,
    isVerifiedWithGateway: record.status === 'paid', message: record.status === 'paid' ? 'Payment confirmed by PayPro.' : 'Payment has not been confirmed as paid.' };
}
export function createPaymentHandlers(deps: Dependencies = defaults) {
  return {
    async create(req: Request) {
      try {
        const config = deps.config();
        if (!sameOrigin(req, config.appUrl)) return json({ success: false, error: 'Request origin rejected.' }, 403);
        let body;
        try { body = await readJson(req); } catch { return json({ success: false, error: 'Invalid request.' }, 400); }
        const validation = validateDonationInput(body);
        if (!validation.valid || !validation.data) return json({ success: false, error: 'Invalid donation information.', details: validation.errors }, 400);
        const key = req.headers.get('idempotency-key') || '';
        if (!/^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i.test(key)) return json({ success: false, error: 'Invalid checkout identifier.' }, 400);
        assertGatewayEnabled(config);
        const repo = deps.repository();
        // Global, durable limits do not trust caller-controlled proxy/IP headers.
        if (!await repo.consumeRateLimit('create', 30, 60)) return json({ success: false, error: 'Please try again shortly.' }, 429, { 'Retry-After': '60' });
        const input = validation.data;
        const requestHash = hash(JSON.stringify(input));
        // The client-generated idempotency key is a random bearer secret. Only
        // hashes are persisted; the derived receipt token goes in HttpOnly cookies.
        const receiptToken = hash(`receipt:${key}`);
        const record = await repo.reserve({ ...input, orderNumber: generateOrderNumber(), checkoutKeyHash: hash(key), requestHash, receiptTokenHash: hash(receiptToken) });
        if (!timingSafeCompare(record.requestHash, requestHash)) return json({ success: false, error: 'Checkout details changed. Start a new checkout.' }, 409);
        const headers = { 'Set-Cookie': receiptCookie(record.orderNumber, receiptToken, new URL(config.appUrl).protocol === 'https:') };
        if (record.click2PayUrl && record.payProId) return json({ success: true, orderNumber: record.orderNumber, payProId: record.payProId, click2PayUrl: record.click2PayUrl }, 200, headers);
        if (!await repo.claimGatewayAttempt(record.orderNumber)) return json({ success: false, error: 'This checkout is processing or requires reconciliation. Please contact support before starting another payment.' }, 409, headers);
        // Never retry automatically after this durable claim, including timeouts
        // and successful gateway responses followed by a failed database write.
        const result = await deps.gateway(config).createOrder({ ...input, orderNumber: record.orderNumber });
        if (result.orderNumber !== record.orderNumber) throw new Error('Gateway order mismatch');
        const stored = await repo.attachPayProId(record.orderNumber, result.payProId, result.click2PayUrl, result.billUrl);
        return json({ success: true, orderNumber: stored.orderNumber, payProId: stored.payProId, click2PayUrl: stored.click2PayUrl }, 200, headers);
      } catch { console.error('[payments] checkout_unavailable'); return json({ success: false, error: 'Payment initialization is unavailable. If you already submitted, contact support before starting another payment.' }, 503); }
    },
    async verify(req: Request) {
      try {
        const config = deps.config();
        const url = new URL(req.url);
        let values: Record<string, unknown>;
        if (req.method === 'POST') {
          if (!sameOrigin(req, config.appUrl)) return json({ success: false, error: 'Request origin rejected.' }, 403);
          try { values = await readJson(req); } catch { return json({ success: false, error: 'Invalid request.' }, 400); }
        } else {
          if (req.headers.get('sec-fetch-site') === 'cross-site') return json({ success: false, error: 'Request origin rejected.' }, 403);
          values = Object.fromEntries(url.searchParams);
        }
        const orders = [values.orderNumber, values.ord, values.order_number].filter(v => v !== undefined);
        const ids = [values.ordId, values.payProId, values.cpayId, values.cpayid, values.id].filter(v => v !== undefined);
        if (orders.some(v => typeof v !== 'string' || !validOrder(v)) || ids.some(v => typeof v !== 'string' || !validPayProId(v)) || new Set(orders).size > 1 || new Set(ids).size > 1) return json({ success: false, error: 'Invalid payment identifier.' }, 400);
        const orderNumber = orders[0] as string | undefined;
        const payProId = ids[0] as string | undefined;
        if (!orderNumber && !payProId) return json({ success: false, error: 'Payment identifier required.' }, 400);
        const repo = deps.repository();
        const record = orderNumber ? await repo.findByOrderNumber(orderNumber) : await repo.findByPayProId(payProId!);
        // Identifiers alone are never authorization to see donor information.
        if (!record || !timingSafeCompare(hash(cookieValue(req, record.orderNumber)), record.receiptTokenHash) || (payProId && payProId !== record.payProId)) return json({ success: false, error: 'Payment record unavailable for this session.' }, 404);
        if (record.status === 'paid' || !record.payProId) return json(receipt(record));
        // Unknown identifiers and invalid receipt capabilities must not consume
        // the scarce gateway-verification allowance shared by real donors.
        if (!await repo.consumeRateLimit('verify', 120, 60)) return json({ success: false, error: 'Please try again shortly.' }, 429, { 'Retry-After': '60' });
        assertGatewayEnabled(config);
        return json(receipt(await verifyRecord(repo, deps.gateway(config), record)));
      } catch { console.error('[payments] verification_unavailable'); return json({ success: false, error: 'Payment verification is unavailable.' }, 503); }
    },
    async callback(req: Request) {
      const failure = (status: number, code: string, description: string) => json([{ StatusCode: code, InvoiceID: null, Description: description }], status);
      try {
        const config = deps.config();
        if (!config.callbackUsername || !config.callbackPassword) return failure(503, '02', 'Callback unavailable.');
        const repo = deps.repository();
        // Bound online guessing before evaluating the static callback secret.
        if (!await repo.consumeRateLimit('callback-auth', 60, 60)) return failure(429, '02', 'Please retry later.');
        let body;
        try { body = await readJson(req); } catch { return failure(400, '01', 'Invalid request.'); }
        const username = body.username ?? body.UserName ?? body.Username;
        const password = body.password ?? body.Password;
        const userValid = timingSafeCompare(typeof username === 'string' ? username : '', config.callbackUsername);
        const passwordValid = timingSafeCompare(typeof password === 'string' ? password : '', config.callbackPassword);
        if (!userValid || !passwordValid) return failure(401, '01', 'Invalid callback credentials.');
        const raw = body.csvinvoiceids ?? body.csvInvoiceIds ?? body.csvInvoiceIDs ?? body.invoiceIds;
        if (typeof raw !== 'string') return failure(400, '01', 'Invalid invoice list.');
        const orders = [...new Set(raw.split(',').map(v => v.trim()))];
        if (!orders.length || orders.length > 20 || orders.some(v => !validOrder(v))) return failure(400, '01', 'Invalid invoice list.');
        if (!await repo.consumeRateLimit('callback', 120, 60)) return failure(429, '02', 'Please retry later.');
        const results = [];
        let transientFailure = false;
        for (const orderNumber of orders) {
          try {
            const record = await repo.findByOrderNumber(orderNumber);
            if (!record?.payProId) { results.push({ StatusCode: '03', InvoiceID: orderNumber, Description: 'No records found.' }); continue; }
            if (record.status !== 'paid') assertGatewayEnabled(config);
            const verified = await verifyRecord(repo, deps.gateway(config), record);
            results.push({ StatusCode: verified.status === 'paid' ? '00' : '02', InvoiceID: orderNumber,
              Description: verified.status === 'paid' ? 'Invoice successfully marked as paid' : 'Payment not confirmed.' });
          } catch { transientFailure = true; results.push({ StatusCode: '02', InvoiceID: orderNumber, Description: 'Verification unavailable.' }); }
        }
        return json(results, transientFailure ? 503 : 200);
      } catch { console.error('[payments] callback_unavailable'); return failure(503, '02', 'Callback unavailable.'); }
    },
  };
}
