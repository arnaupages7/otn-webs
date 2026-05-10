// POST /api/waitlist-step2 — actualitza el lead amb les dades qualificadores opcionals

interface Env {
  DB: D1Database
}

const VALID_EXPERIENCE = ['first', 'few', 'regular', 'local']
const VALID_DURATION = ['weekend', 'week', 'fortnight', 'long', 'local']
const VALID_DREAMS = ['cols', 'gravel', 'coast', 'food', 'group', 'pro', 'culture']

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  let body: Record<string, unknown>
  try {
    body = (await request.json()) as Record<string, unknown>
  } catch {
    return Response.json({ ok: false, error: 'invalid_json' }, { status: 400 })
  }

  const audience = body.audience
  if (audience !== 'cyclist' && audience !== 'host') {
    return Response.json({ ok: false, error: 'invalid_audience' }, { status: 400 })
  }

  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : ''
  if (!email) {
    return Response.json({ ok: false, error: 'invalid_email' }, { status: 400 })
  }

  const country = typeof body.country === 'string' ? body.country.slice(0, 80).trim() || null : null
  const experience =
    typeof body.experience === 'string' && VALID_EXPERIENCE.includes(body.experience) ? body.experience : null
  const duration =
    typeof body.duration === 'string' && VALID_DURATION.includes(body.duration) ? body.duration : null

  let dreams: string[] = []
  if (Array.isArray(body.dream)) {
    dreams = (body.dream as unknown[])
      .filter((v): v is string => typeof v === 'string' && VALID_DREAMS.includes(v))
      .slice(0, 7)
  }

  const dreamText =
    typeof body.dream_text === 'string' ? body.dream_text.slice(0, 500).trim() || null : null

  const ts = new Date().toISOString()
  const dreamJson = dreams.length ? JSON.stringify(dreams) : null
  const table = audience === 'cyclist' ? 'waitlist_cyclist' : 'waitlist_host'

  try {
    const result = await env.DB.prepare(
      `UPDATE ${table}
        SET country = ?, experience = ?, dream = ?, duration = ?, dream_text = ?,
            step2_completed_at = ?, status = 'qualified', updated_at = ?
        WHERE email = ?`,
    )
      .bind(country, experience, dreamJson, duration, dreamText, ts, ts, email)
      .run()

    if (result.meta.changes === 0) {
      return Response.json({ ok: false, error: 'not_found' }, { status: 404 })
    }
  } catch (err) {
    console.error('step2_update_failed', err)
    return Response.json({ ok: false, error: 'server_error' }, { status: 500 })
  }

  return Response.json({ ok: true })
}

export const onRequest: PagesFunction = async () => {
  return Response.json({ ok: false, error: 'method_not_allowed' }, { status: 405 })
}
