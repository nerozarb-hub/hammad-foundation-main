import { timingSafeEqual } from 'node:crypto';
import { getPaymentPool, verifyRuntimeDatabase } from '../../../../lib/db/pool.ts';
import { PayProClient } from '../../../../lib/paypro/client.ts';
import { assertGatewayEnabled, getPayProConfig } from '../../../../lib/paypro/config.ts';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function equal(left: string, right: string) {
  const a = Buffer.from(left);
  const b = Buffer.from(right);
  return a.length === b.length && timingSafeEqual(a, b);
}

export async function POST(request: Request) {
  let stage = 'configuration';
  try {
    const config = getPayProConfig();
    const authorization = request.headers.get('authorization') || '';
    const encoded = authorization.startsWith('Basic ') ? authorization.slice(6) : '';
    const decoded = encoded ? Buffer.from(encoded, 'base64').toString('utf8') : '';
    const separator = decoded.indexOf(':');
    const username = separator < 0 ? '' : decoded.slice(0, separator);
    const password = separator < 0 ? '' : decoded.slice(separator + 1);
    if (!equal(username, config.callbackUsername) || !equal(password, config.callbackPassword)) {
      return Response.json({ success: false }, { status: 401 });
    }

    assertGatewayEnabled(config);
    stage = 'database';
    const database = getPaymentPool();
    await verifyRuntimeDatabase(database);
    stage = 'authentication';
    await new PayProClient(config).authenticate();
    stage = 'recent-attempts';
    const attempts = await database.query(`SELECT order_number, status, amount,
      gateway_attempted_at IS NOT NULL AS gateway_attempted,
      paypro_id IS NOT NULL AS paypro_id_attached
      FROM donations ORDER BY created_at DESC LIMIT 5`);
    return Response.json({
      success: true,
      configuration: 'pass',
      database: 'pass',
      authentication: 'pass',
      attempts: attempts.rows,
    });
  } catch {
    console.error(`[payments] readiness_failed:${stage}`);
    return Response.json({ success: false, stage }, { status: 503 });
  }
}
