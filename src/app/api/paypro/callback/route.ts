export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST() {
  return Response.json(
    {
      code: "PAYMENTS_MOVED_TO_YZ",
      message: "Hammad Foundation no longer accepts provider callbacks. Use the YZ payment boundary.",
    },
    { status: 410 },
  );
}
