export async function POST(request) {
  try {
    const body = await request.json();
    // Log to server console for developer inspection
    // eslint-disable-next-line no-console
    console.warn('CLIENT-DEBUG:', JSON.stringify(body, null, 2));
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn('CLIENT-DEBUG: failed to parse body');
  }
  return new Response(JSON.stringify({ ok: true }), { status: 200, headers: { 'Content-Type': 'application/json' } });
}
