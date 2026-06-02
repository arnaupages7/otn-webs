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
  apiKey: string
  from: string
}): Promise<void> {
  const { to, audience, locale, apiKey, from } = opts

  const subject =
    locale === 'es' ? 'Bienvenido a la tribu — VeloTribe' :
    locale === 'ca' ? 'Benvingut a la tribu — VeloTribe' :
    'Welcome to the tribe — VeloTribe'

  const headline =
    locale === 'es' ? '¡Ya formas parte de la tribu!' :
    locale === 'ca' ? 'Ja formes part de la tribu!' :
    "You're in the tribe!"

  const body1 =
    locale === 'es' ? 'Gracias por unirte a la lista de espera de VeloTribe. Serás el primero en saber cuándo lanzamos la plataforma.' :
    locale === 'ca' ? "Gràcies per unir-te a la llista d'espera de VeloTribe. Seràs el primer a saber quan llencem la plataforma." :
    "Thanks for joining the VeloTribe waitlist. You'll be the first to know when we launch the platform."

  const body2 =
    locale === 'es' ? 'Mientras tanto, descubre los primeros anfitriones que ya forman parte de la comunidad.' :
    locale === 'ca' ? 'Mentrestant, descobreix els primers amfitrions que ja formen part de la comunitat.' :
    'In the meantime, discover the first hosts who have already joined the community.'

  const cta =
    locale === 'es' ? 'Descubrir anfitriones →' :
    locale === 'ca' ? 'Descobrir amfitrions →' :
    'Discover hosts →'

  const footer =
    locale === 'es' ? 'El equipo VeloTribe · velotribe.cc' :
    locale === 'ca' ? "L'equip VeloTribe · velotribe.cc" :
    'The VeloTribe team · velotribe.cc'

  const html = `<!DOCTYPE html>
<html lang="${locale}">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f0e8d8;font-family:system-ui,-apple-system,Helvetica,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0e8d8;padding:40px 16px">
    <tr><td>
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;margin:0 auto;border-radius:16px;overflow:hidden">

        <!-- Header -->
        <tr>
          <td style="background:#2C2419;padding:40px 40px 32px;text-align:center">
            <p style="margin:0 0 10px;color:#A7B75D;font-size:10px;font-weight:700;letter-spacing:4px;text-transform:uppercase">Connect · Ride · Belong</p>
            <p style="margin:0;color:#F8EEDA;font-size:32px;font-weight:900;text-transform:uppercase;letter-spacing:2px">VELOTRIBE</p>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="background:#F8EEDA;padding:40px">
            <p style="margin:0 0 12px;color:#2C2419;font-size:22px;font-weight:800">${headline}</p>
            <p style="margin:0 0 16px;color:#6b5d50;font-size:15px;line-height:1.65">${body1}</p>
            <p style="margin:0 0 32px;color:#6b5d50;font-size:15px;line-height:1.65">${body2}</p>
            <table cellpadding="0" cellspacing="0">
              <tr>
                <td style="background:#A7B75D;border-radius:8px">
                  <a href="https://velotribe.cc/#providers"
                     style="display:inline-block;padding:13px 26px;color:#2C2419;font-weight:700;font-size:13px;text-decoration:none;text-transform:uppercase;letter-spacing:1.5px">${cta}</a>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#41372B;padding:20px 40px;text-align:center">
            <p style="margin:0;color:#ffffff60;font-size:12px">${footer}</p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`

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
