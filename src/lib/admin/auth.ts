import 'server-only';
import crypto from 'node:crypto';
import { cookies } from 'next/headers';

const SESSION_COOKIE_NAME = 'hf_admin_session';

function getAdminSecret(): string {
  return process.env.ADMIN_PASSWORD || process.env.PAYPRO_CALLBACK_PASSWORD || 'Live@YZ26Edu';
}

function getSigningKey(): Buffer {
  return crypto.createHash('sha256').update(getAdminSecret()).digest();
}

export function createAdminToken(): string {
  const expiresAt = Date.now() + 7 * 24 * 60 * 60 * 1000; // 7 days
  const payload = JSON.stringify({ role: 'admin', exp: expiresAt });
  const hmac = crypto.createHmac('sha256', getSigningKey()).update(payload).digest('base64url');
  const encodedPayload = Buffer.from(payload).toString('base64url');
  return `${encodedPayload}.${hmac}`;
}

export function verifyAdminToken(token: string): boolean {
  if (!token || !token.includes('.')) return false;
  const [encodedPayload, signature] = token.split('.');
  try {
    const payloadStr = Buffer.from(encodedPayload, 'base64url').toString('utf8');
    const expectedHmac = crypto.createHmac('sha256', getSigningKey()).update(payloadStr).digest('base64url');
    if (signature !== expectedHmac) return false;
    const data = JSON.parse(payloadStr) as { role: string; exp: number };
    return data.role === 'admin' && data.exp > Date.now();
  } catch {
    return false;
  }
}

export async function isAuthorizedAdmin(req?: Request): Promise<boolean> {
  // 1. Check Bearer authorization header if present
  if (req) {
    const authHeader = req.headers.get('authorization') || '';
    if (authHeader.startsWith('Bearer ')) {
      const token = authHeader.slice(7).trim();
      if (verifyAdminToken(token)) return true;
    }
  }

  // 2. Check HttpOnly cookie
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  if (sessionCookie && verifyAdminToken(sessionCookie)) {
    return true;
  }

  return false;
}

export { SESSION_COOKIE_NAME };
