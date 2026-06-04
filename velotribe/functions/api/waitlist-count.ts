// GET /api/waitlist-count — returns the real total count from D1 (cyclists + hosts)

interface Env {
  DB: D1Database
}

export const onRequestGet: PagesFunction<Env> = async ({ env }) => {
  const result = await env.DB.prepare(
    `SELECT
      (SELECT COUNT(*) FROM waitlist_cyclist) +
      (SELECT COUNT(*) FROM waitlist_host) AS total`
  ).first<{ total: number }>()

  const total = result?.total ?? 0
  return Response.json({ total }, {
    headers: { 'Cache-Control': 'public, max-age=60' },
  })
}

export const onRequest: PagesFunction = async () => {
  return Response.json({ ok: false, error: 'method_not_allowed' }, { status: 405 })
}
