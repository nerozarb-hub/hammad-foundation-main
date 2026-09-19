import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createAdminToken, isAuthorizedAdmin, SESSION_COOKIE_NAME } from '@/lib/admin/auth';
import { timingSafeCompare } from '@/lib/paypro/security';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function getAdminSecret(): string {
  return process.env.ADMIN_PASSWORD || process.env.PAYPRO_CALLBACK_PASSWORD || 'Live@YZ26Edu';
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const password = typeof body.password === 'string' ? body.password.trim() : '';

    const expectedPassword = getAdminSecret().trim();
    if (!password || !timingSafeCompare(password, expectedPassword)) {
      return NextResponse.json({ success: false, error: 'Invalid admin credentials' }, { status: 401 });
    }

    const token = createAdminToken();
    const cookieStore = await cookies();
    cookieStore.set(SESSION_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60,
    });

    return NextResponse.json({ success: true, token });
  } catch {
    return NextResponse.json({ success: false, error: 'Authentication request failed' }, { status: 400 });
  }
}

export async function GET(req: Request) {
  const authorized = await isAuthorizedAdmin(req);
  return NextResponse.json({ authenticated: authorized });
}

export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
  return NextResponse.json({ success: true });
}
