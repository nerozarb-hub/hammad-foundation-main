import { NextResponse } from 'next/server';
import { isAuthorizedAdmin } from '@/lib/admin/auth';
import { getDonationRepository } from '@/lib/db';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  const authorized = await isAuthorizedAdmin(req);
  if (!authorized) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const url = new URL(req.url);
    const limitParam = url.searchParams.get('limit');
    const limit = limitParam ? parseInt(limitParam, 10) : 100;

    const repo = getDonationRepository();
    const donations = await repo.listRecent(limit);

    // Compute stats
    let totalAmountPaid = 0;
    let totalAmountAttempted = 0;
    let paidCount = 0;
    let pendingCount = 0;
    let failedCount = 0;

    for (const d of donations) {
      totalAmountAttempted += d.amount || 0;
      if (d.status === 'paid') {
        paidCount++;
        totalAmountPaid += d.amount || 0;
      } else if (d.status === 'pending') {
        pendingCount++;
      } else {
        failedCount++;
      }
    }

    return NextResponse.json({
      success: true,
      stats: {
        totalCount: donations.length,
        paidCount,
        pendingCount,
        failedCount,
        totalAmountPaid,
        totalAmountAttempted,
      },
      donations,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Database error';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
