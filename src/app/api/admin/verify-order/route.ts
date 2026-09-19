import { NextResponse } from 'next/server';
import { isAuthorizedAdmin } from '@/lib/admin/auth';
import { getDonationRepository } from '@/lib/db';
import { getPayProConfig, assertGatewayEnabled } from '@/lib/paypro/config';
import { PayProClient, moneyMinor } from '@/lib/paypro/client';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  const authorized = await isAuthorizedAdmin(req);
  if (!authorized) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const orderNumber = typeof body.orderNumber === 'string' ? body.orderNumber.trim() : '';
    if (!orderNumber) {
      return NextResponse.json({ success: false, error: 'Order number is required' }, { status: 400 });
    }

    const repo = getDonationRepository();
    const record = await repo.findByOrderNumber(orderNumber);
    if (!record) {
      return NextResponse.json({ success: false, error: 'Donation record not found' }, { status: 404 });
    }

    if (record.status === 'paid') {
      return NextResponse.json({ success: true, status: 'paid', donation: record });
    }

    if (!record.payProId) {
      return NextResponse.json({ success: false, error: 'No PayPro ID attached to this order' }, { status: 400 });
    }

    const config = getPayProConfig();
    assertGatewayEnabled(config);
    const client = new PayProClient(config);

    const result = await client.getOrderStatus(record.payProId, record.orderNumber);

    if (result.status === 'paid' && result.isPaid && result.paidAmount !== undefined) {
      if (moneyMinor(result.paidAmount) === moneyMinor(record.amount)) {
        const updated = await repo.recordVerification(record.orderNumber, record.payProId, 'paid', result.paidAmount);
        return NextResponse.json({ success: true, status: 'paid', donation: updated });
      }
    }

    const updated = await repo.recordVerification(record.orderNumber, record.payProId, result.status, result.paidAmount);
    return NextResponse.json({ success: true, status: result.status, donation: updated });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Verification failed';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
