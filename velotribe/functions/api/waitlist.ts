// POST /api/waitlist — Cloudflare Pages Function
// Step 1 del waitlist: captura mínima (email + modalitat + consent)

interface Env {
  DB: D1Database
  COUNTER: KVNamespace
  RESEND_API_KEY?: string
  RESEND_FROM?: string
}

const CURRENT_CONSENT_VERSION = 'v1.0.0'

async function sha256Hex(input: string): Promise<string> {
  const buf = new TextEncoder().encode(input)
  const hash = await crypto.subtle.digest('SHA-256', buf)
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

async function sendWelcome(opts: {
  to: string
  audience: 'cyclist' | 'host'
  locale: string
  position: number
  apiKey: string
  from: string
}): Promise<void> {
  const { to, audience, locale, position, apiKey, from } = opts
  const subject =
    locale === 'es' ? `Bienvenido a la tribu — eres el #${position}` :
    locale === 'ca' ? `Benvingut a la tribu — ets el #${position}` :
    `Welcome to the tribe — you're #${position}`

  const html =
    locale === 'es'
      ? `<p>Eres el <strong>#${position}</strong> de la tribu VeloTribe. Te avisamos antes que a nadie del lanzamiento.</p><p>— el equipo VeloTribe</p>`
      : locale === 'ca'
      ? `<p>Ets el <strong>#${position}</strong> de la tribu VeloTribe. T'avisem abans que a ningú del llançament.</p><p>— l'equip VeloTribe</p>`
      : `<p>You're <strong>#${position}</strong> in the VeloTribe tribe. We'll let you know before anyone else when we launch.</p><p>— the VeloTribe team</p>`

  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { authorization: `Bearer ${apiKey}`, 'content-type': 'application/json' },
    body: JSON.stringify({
      from,
      to,
      subject,
      html,
      tags: [{ name: 'audience', value: audience }, { name: 'event', value: 'welcome' }],
    }),
  })
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env, waitUntil }) => {
  const ip = request.headers.get('cf-connecting-ip') ?? 'unknown'
  const cfCountry = request.headers.get('cf-ipcountry') ?? null
  const ua = request.headers.get('user-agent') ?? ''

  // Rate limiting: 5 req / 60s per IP
  const rlKey = `rl:${ip}`
  const rlCount = parseInt((await env.COUNTER.get(rlKey)) ?? '0', 10)
  if (rlCount >= 5) {
    return Response.json({ ok: false, error: 'rate_limited' }, { status: 429 })
  }
  await env.COUNTER.put(rlKey, String(rlCount + 1), { expirationTtl: 60 })

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
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ ok: false, error: 'invalid_email' }, { status: 400 })
  }

  if (body.consent !== true) {
    return Response.json({ ok: false, error: 'consent_required' }, { status: 400 })
  }

  const locale = ['en', 'es', 'ca'].includes(body.locale as string) ? (body.locale as string) : 'en'
  const ipHash = await sha256Hex(ip + ':velotribe-salt')
  const ts = new Date().toISOString()
  const utm_source = (body.utm_source as string) || null
  const utm_medium = (body.utm_medium as string) || null
  const utm_campaign = (body.utm_campaign as string) || null

  try {
    if (audience === 'cyclist') {
      const cycling_type = body.cycling_type
      if (!['road', 'gravel', 'mtb', 'all'].includes(cycling_type as string)) {
        return Response.json({ ok: false, error: 'invalid_cycling_type' }, { status: 400 })
      }

      await env.DB.prepare(
        `INSERT INTO waitlist_cyclist
        (email, cycling_type, utm_source, utm_medium, utm_campaign, cf_country, user_agent, locale,
         consent_text_version, consent_timestamp, consent_ip_hash)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      )
        .bind(email, cycling_type, utm_source, utm_medium, utm_campaign, cfCountry, ua, locale,
              CURRENT_CONSENT_VERSION, ts, ipHash)
        .run()
    } else {
      const business_name = typeof body.business_name === 'string' ? body.business_name.trim() : ''
      const business_type = body.business_type
      const location = typeof body.location === 'string' ? body.location.trim() : ''
      const validTypes = ['accommodation', 'guide', 'tour', 'event', 'other']
      if (!business_name || !validTypes.includes(business_type as string) || !location) {
        return Response.json({ ok: false, error: 'invalid_business' }, { status: 400 })
      }

      await env.DB.prepare(
        `INSERT INTO waitlist_host
        (email, business_name, business_type, location, utm_source, utm_medium, utm_campaign, cf_country, user_agent, locale,
         consent_text_version, consent_timestamp, consent_ip_hash)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      )
        .bind(email, business_name, business_type, location, utm_source, utm_medium, utm_campaign,
              cfCountry, ua, locale, CURRENT_CONSENT_VERSION, ts, ipHash)
        .run()
    }
  } catch (err: any) {
    if (String(err?.message ?? '').includes('UNIQUE')) {
      return Response.json({ ok: false, error: 'duplicate' }, { status: 409 })
    }
    console.error('waitlist_insert_failed', err)
    return Response.json({ ok: false, error: 'server_error' }, { status: 500 })
  }

  // Comptador #N total (suma cyclist + host)
  const current = parseInt((await env.COUNTER.get('total')) ?? '0', 10)
  const next = current + 1
  await env.COUNTER.put('total', String(next))

  // Welcome email (best-effort, no bloca la resposta)
  if (env.RESEND_API_KEY && env.RESEND_FROM) {
    waitUntil(
      sendWelcome({
        to: email,
        audience: audience as 'cyclist' | 'host',
        locale,
        position: next,
        apiKey: env.RESEND_API_KEY,
        from: env.RESEND_FROM,
      }).catch((e) => console.error('welcome_email_failed', e)),
    )
  }

  return Response.json({ ok: true, position: next })
}

export const onRequest: PagesFunction = async () => {
  return Response.json({ ok: false, error: 'method_not_allowed' }, { status: 405 })
}
