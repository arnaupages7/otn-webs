// GET /api/waitlist-count — returns the current total waitlist count from KV

interface Env {
  COUNTER: KVNamespace
}

export const onRequestGet: PagesFunction<Env> = async ({ env }) => {
  const total = parseInt((await env.COUNTER.get('total')) ?? '0', 10)
  return Response.json({ total }, {
    headers: { 'Cache-Control': 'public, max-age=60' },
  })
}

export const onRequest: PagesFunction = async () => {
  return Response.json({ ok: false, error: 'method_not_allowed' }, { status: 405 })
}
