import type { PayProConfig } from "./config.ts";

export type PayProTransportFn = (request: { url: string; method: "GET" | "POST"; headers: Record<string, string>; body?: string; timeoutMs?: number }) => Promise<{ status: number; headers: Headers; body: string }>;

async function defaultSendPayProRequest(request: Parameters<PayProTransportFn>[0]) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), request.timeoutMs ?? 15_000);
  try {
    const response = await fetch(request.url, { method: request.method, headers: request.headers, body: request.body, signal: controller.signal });
    return { status: response.status, headers: response.headers, body: await response.text() };
  } finally {
    clearTimeout(timeout);
  }
}

let activeTransport: PayProTransportFn = defaultSendPayProRequest;
export function setPayProTransport(transport: PayProTransportFn) { activeTransport = transport; }
export function resetPayProTransport() { activeTransport = defaultSendPayProRequest; }
export async function sendPayProRequest(config: PayProConfig, path: string, method: "GET" | "POST", token: string, body?: unknown) {
  const url = `${config.baseUrl}${path}`;
  return activeTransport({ url, method, headers: { "Content-Type": "application/json", Accept: "application/json", token, Token: token }, body: body === undefined ? undefined : JSON.stringify(body) });
}
