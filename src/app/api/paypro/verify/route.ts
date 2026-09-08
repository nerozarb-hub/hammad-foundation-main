import { createPaymentHandlers } from '../../../../lib/payments/handlers.ts';
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
const handler = createPaymentHandlers().verify;
export const GET = handler;
export const POST = handler;
