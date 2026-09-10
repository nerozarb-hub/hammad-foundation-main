export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  return Response.json(
    {
      code: "PAYMENTS_MOVED_TO_YZ",
      message: "Payment status is handled through YZ Educational Services.",
    },
    { status: 410 },
  );
}

export const POST = GET;
