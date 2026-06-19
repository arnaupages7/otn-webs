// POST /api/weekend-inquiry — Cloudflare Pages Function
// Sends a VeloTribe Weekend quote request to info@velotribe.cc

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

  const name         = typeof body.name         === 'string' ? body.name.trim()                  : ''
  const email        = typeof body.email        === 'string' ? body.email.trim().toLowerCase()    : ''
  const participants = typeof body.participants  === 'string' ? body.participants.trim()           : ''
  const notes        = typeof body.notes        === 'string' ? body.notes.trim()                  : ''
  const locale       = typeof body.locale       === 'string' ? body.locale                        : 'en'

  if (!name || !email || !participants) {
    return Response.json({ ok: false, error: 'missing_fields' }, { status: 400 })
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ ok: false, error: 'invalid_email' }, { status: 400 })
  }

  const subject = `[Weekend] Sol·licitud de pressupost — ${name} (${participants} pers.)`

  const rows: [string, string][] = [
    ['Nom',           name],
    ['Email',         `<a href="mailto:${email}" style="color:#A7B75D">${email}</a>`],
    ['Participants',  participants],
    ['Idioma',        locale.toUpperCase()],
    ...(notes ? [['Notes', notes] as [string, string]] : []),
  ]

  const tableRows = rows.map(([k, v], i) =>
    `<tr style="background:${i % 2 === 0 ? '#f9f6f0' : '#fff'}">
      <td style="padding:10px 14px;font-weight:600;color:#41372B;width:130px;white-space:nowrap;border-bottom:1px solid #ede8e0">${k}</td>
      <td style="padding:10px 14px;color:#2C2419;border-bottom:1px solid #ede8e0">${v}</td>
    </tr>`
  ).join('')

  const html = `
    <div style="font-family:system-ui,sans-serif;max-width:580px;color:#2C2419">
      <div style="background:#2C2419;padding:24px;border-radius:8px 8px 0 0">
        <p style="margin:0;font-size:10px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:#A7B75D">VeloTribe Weekend</p>
        <h2 style="margin:6px 0 0;color:#F8EEDA;font-size:22px;font-weight:900;text-transform:uppercase;letter-spacing:1px">Nova sol·licitud de pressupost</h2>
      </div>
      <table style="width:100%;border-collapse:collapse;border:1px solid #ede8e0;border-top:none;border-radius:0 0 8px 8px">
        ${tableRows}
      </table>
      <p style="margin-top:20px;color:#999;font-size:12px;border-top:1px solid #ede8e0;padding-top:16px">
        Respon a aquest correu per contactar <strong>${name}</strong> directament a ${email}.
      </p>
    </div>`

  if (!env.RESEND_API_KEY || !env.RESEND_FROM) {
    console.error('weekend_inquiry_missing_env')
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
      tags: [{ name: 'event', value: 'weekend_inquiry' }],
    }),
  })

  if (!res.ok) {
    const errText = await res.text()
    console.error('weekend_inquiry_email_failed', errText)
    return Response.json({ ok: false, error: 'email_failed' }, { status: 500 })
  }

  return Response.json({ ok: true })
}

export const onRequest: PagesFunction = async () =>
  Response.json({ ok: false, error: 'method_not_allowed' }, { status: 405 })
