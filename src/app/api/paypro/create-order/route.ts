import { createPaymentHandlers } from '../../../../lib/payments/handlers.ts';
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const POST = createPaymentHandlers().create;
