import 'server-only';
import https from 'node:https';
import { assertGatewayEnabled, type PayProConfig } from './config.ts';

export type PayProTransportFn = (request: { url: string; method: 'GET' | 'POST'; headers: Record<string, string>; body?: string; timeoutMs?: number }) => Promise<{ status: number; headers: Headers; body: string }>;

// Node HTTPS supports the documented GGOS GET JSON body. No redirects or retries:
// repeating Create Order after an ambiguous failure could create a second invoice.
export const nodePayProTransport: PayProTransportFn = async (request) => new Promise((resolve, reject) => {
  const url = new URL(request.url);
  if (url.protocol !== 'https:' || url.username || url.password || url.port) return reject(new Error('Invalid gateway URL'));
  const headers = { ...request.headers, ...(request.body === undefined ? {} : { 'Content-Length': String(Buffer.byteLength(request.body)) }) };
  const req = https.request(url, { method: request.method, headers, rejectUnauthorized: true }, (res) => {
    const chunks: Buffer[] = [];
    let size = 0;
    res.on('data', (chunk: Buffer) => {
      size += chunk.length;
      if (size > 1024 * 1024) { res.destroy(); req.destroy(new Error('Gateway response too large')); return; }
      chunks.push(chunk);
    });
    res.on('error', () => reject(new Error('Gateway response failed')));
    res.on('end', () => {
      clearTimeout(deadline);
      const responseHeaders = new Headers();
      for (const [key, value] of Object.entries(res.headers)) if (value !== undefined) responseHeaders.set(key, Array.isArray(value) ? value.join(', ') : value);
      resolve({ status: res.statusCode ?? 502, headers: responseHeaders, body: Buffer.concat(chunks).toString('utf8') });
    });
  });
  const deadline = setTimeout(() => req.destroy(new Error('Gateway timeout')), request.timeoutMs ?? 15_000);
  req.on('error', () => { clearTimeout(deadline); reject(new Error('Gateway connection failed')); });
  req.end(request.body);
});

export async function sendPayProRequest(config: PayProConfig, path: '/v2/ppro/auth' | '/v2/ppro/co' | '/v2/ppro/ggos', method: 'GET' | 'POST', token?: string, body?: unknown, transport: PayProTransportFn = nodePayProTransport) {
  assertGatewayEnabled(config);
  const response = await transport({ url: `${config.baseUrl}${path}`, method,
    headers: { 'Content-Type': 'application/json', Accept: 'application/json', ...(token ? { token } : {}) },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  if (response.status < 200 || response.status >= 300) throw new Error('Gateway request rejected');
  return response;
}
