export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST() {
  return Response.json(
    {
      code: "PAYMENTS_MOVED_TO_YZ",
      message: "Hammad Foundation support payments are started through YZ Educational Services.",
    },
    { status: 410 },
  );
}
