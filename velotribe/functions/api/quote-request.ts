// POST /api/quote-request — Cloudflare Pages Function
// Sends a custom weekend quote request to info@velotribe.cc

interface Env {
  RESEND_API_KEY?: string
  RESEND_FROM?: string
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  let body: Record<string, unknown>
  try {
    body = (await request.json()) as Record<string, unknown>
  } catch {
    return Response.json({ ok: false, error: 'invalid_json' }, { status: 400 })
  }

  const name         = typeof body.name         === 'string' ? body.name.trim()               : ''
  const email        = typeof body.email        === 'string' ? body.email.trim().toLowerCase() : ''
  const phone        = typeof body.phone        === 'string' ? body.phone.trim()               : ''
  const dateFrom     = typeof body.dateFrom     === 'string' ? body.dateFrom.trim()            : ''
  const dateTo       = typeof body.dateTo       === 'string' ? body.dateTo.trim()              : ''
  const dateFlexible = typeof body.dateFlexible === 'string' ? body.dateFlexible.trim()        : ''
  const people       = typeof body.people       === 'string' ? body.people.trim()              : ''
  const budget       = typeof body.budget       === 'string' ? body.budget.trim()              : ''
  const routeType    = typeof body.routeType    === 'string' ? body.routeType.trim()           : ''
  const difficulty   = typeof body.difficulty   === 'string' ? body.difficulty.trim()          : ''
  const days         = typeof body.days         === 'string' ? body.days.trim()                : ''
  const accommodation = typeof body.accommodation === 'string' ? body.accommodation.trim()    : ''
  const extras       = Array.isArray(body.extras) ? (body.extras as string[]).join(', ')      : ''
  const notes        = typeof body.notes        === 'string' ? body.notes.trim()              : ''
  const locale       = typeof body.locale       === 'string' ? body.locale                    : 'en'

  if (!name || !email || !people) {
    return Response.json({ ok: false, error: 'missing_fields' }, { status: 400 })
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ ok: false, error: 'invalid_email' }, { status: 400 })
  }

  function formatDate(iso: string): string {
    if (!iso) return '—'
    try {
      return new Date(iso + 'T12:00:00Z').toLocaleDateString('en-GB', {
        day: 'numeric', month: 'short', year: 'numeric',
      })
    } catch { return iso }
  }

  const rows: [string, string][] = [
    ['Nom',             name],
    ['Email',           `<a href="mailto:${email}" style="color:#A7B75D">${email}</a>`],
    ...(phone ? [['Telèfon', phone] as [string, string]] : []),
    ['Persones',        people],
    ['Data d\'inici',   dateFrom ? formatDate(dateFrom) : '—'],
    ['Data de fi',      dateTo   ? formatDate(dateTo)   : '—'],
    ['Flexibilitat',    dateFlexible || '—'],
    ['Pressupost/persona', budget || '—'],
    ['Tipus de ruta',   routeType   || '—'],
    ['Exigència',       difficulty  || '—'],
    ['Dies de ciclisme', days       || '—'],
    ['Allotjament',     accommodation || '—'],
    ['Extras',          extras        || '—'],
    ...(notes ? [['Notes', notes] as [string, string]] : []),
    ['Idioma',          locale.toUpperCase()],
  ]

  const tableRows = rows.map(([k, v], i) =>
    `<tr style="background:${i % 2 === 0 ? '#f9f6f0' : '#fff'}">
      <td style="padding:10px 14px;font-weight:600;color:#41372B;width:160px;white-space:nowrap;border-bottom:1px solid #ede8e0;vertical-align:top">${k}</td>
      <td style="padding:10px 14px;color:#2C2419;border-bottom:1px solid #ede8e0">${v}</td>
    </tr>`
  ).join('')

  const subject = `[Pressupost] ${name} — ${people} pers. · ${dateFrom ? formatDate(dateFrom) : '?'} → ${dateTo ? formatDate(dateTo) : '?'}`

  const html = `
    <div style="font-family:system-ui,sans-serif;max-width:600px;color:#2C2419">
      <div style="background:#2C2419;padding:28px 32px;border-radius:12px 12px 0 0">
        <p style="margin:0 0 4px;font-size:10px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:#A7B75D">VeloTribe · Cap de setmana a Girona</p>
        <h2 style="margin:0;color:#F8EEDA;font-size:24px;font-weight:900;text-transform:uppercase;letter-spacing:1px">Nova sol·licitud de pressupost</h2>
      </div>
      <table style="width:100%;border-collapse:collapse;border:1px solid #ede8e0;border-top:none;border-radius:0 0 12px 12px;overflow:hidden">
        ${tableRows}
      </table>
      <p style="margin-top:24px;color:#999;font-size:12px;border-top:1px solid #ede8e0;padding-top:16px">
        Respon a aquest correu per contactar <strong>${name}</strong> directament a ${email}.
      </p>
    </div>`

  if (!env.RESEND_API_KEY || !env.RESEND_FROM) {
    console.error('quote_request_missing_env')
    return Response.json({ ok: false, error: 'server_config_error' }, { status: 500 })
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      authorization: `Bearer ${env.RESEND_API_KEY}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      from: env.RESEND_FROM,
      to: ['info@velotribe.cc'],
      reply_to: email,
      subject,
      html,
      tags: [{ name: 'event', value: 'quote_request' }],
    }),
  })

  if (!res.ok) {
    const errText = await res.text()
    console.error('quote_request_email_failed', errText)
    return Response.json({ ok: false, error: 'email_failed' }, { status: 500 })
  }

  return Response.json({ ok: true })
}

export const onRequest: PagesFunction = async () =>
  Response.json({ ok: false, error: 'method_not_allowed' }, { status: 405 })
