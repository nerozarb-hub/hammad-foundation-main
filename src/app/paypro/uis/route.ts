import { createPaymentHandlers } from '../../../lib/payments/handlers.ts';

// PayPro's callback specification uses the public `/paypro/uis` signature.
// Keep this compatibility route on the same authenticated, idempotent handler
// as the canonical API endpoint so there is only one settlement path.
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const POST = createPaymentHandlers().callback;
