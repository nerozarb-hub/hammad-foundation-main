import 'server-only';
import crypto from 'node:crypto';

export const hash = (value: string) => crypto.createHash('sha256').update(value).digest('hex');
export function json(body: unknown, status = 200, headers: Record<string, string> = {}) {
  return Response.json(body, { status, headers: { 'Cache-Control': 'no-store, private', 'Referrer-Policy': 'no-referrer', ...headers } });
}
export async function readJson(req: Request): Promise<Record<string, unknown>> {
  if (!req.headers.get('content-type')?.toLowerCase().startsWith('application/json')) throw new Error('JSON required');
  if (Number(req.headers.get('content-length')) > 16_384) throw new Error('Request too large');
  const reader = req.body?.getReader();
  if (!reader) throw new Error('Body required');
  const chunks: Uint8Array[] = [];
  let size = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.length;
      if (size > 16_384) { await reader.cancel(); throw new Error('Request too large'); }
      chunks.push(value);
    }
  } finally { reader.releaseLock(); }
  const value: unknown = JSON.parse(Buffer.concat(chunks).toString('utf8'));
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error('Object required');
  return value as Record<string, unknown>;
}
export function sameOrigin(req: Request, appUrl: string) {
  return req.headers.get('origin') === new URL(appUrl).origin && req.headers.get('sec-fetch-site') !== 'cross-site';
}
export function cookieName(orderNumber: string) { return `hf_receipt_${orderNumber}`; }
export function cookieValue(req: Request, orderNumber: string) {
  const name = cookieName(orderNumber);
  return (req.headers.get('cookie') || '').split(';').map(x => x.trim()).find(x => x.startsWith(`${name}=`))?.slice(name.length + 1) || '';
}
export function receiptCookie(orderNumber: string, token: string, secure: boolean) {
  return `${cookieName(orderNumber)}=${token}; Path=/api/paypro; HttpOnly; SameSite=Lax; Max-Age=1209600${secure ? '; Secure' : ''}`;
}
