// POST /api/booking-request — Cloudflare Pages Function
// Sends a booking request email to info@velotribe.cc (handled manually)

interface Env {
  RESEND_API_KEY?: string
  RESEND_FROM?: string
}

function formatDate(iso: string): string {
  try {
    return new Date(iso + 'T12:00:00Z').toLocaleDateString('en-GB', {
      day: 'numeric', month: 'short', year: 'numeric',
    })
  } catch {
    return iso
  }
}

function nightsBetween(a: string, b: string): number {
  try {
    const d1 = new Date(a).getTime()
    const d2 = new Date(b).getTime()
    return Math.round((d2 - d1) / (1000 * 60 * 60 * 24))
  } catch {
    return 0
  }
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  let body: Record<string, unknown>
  try {
    body = (await request.json()) as Record<string, unknown>
  } catch {
    return Response.json({ ok: false, error: 'invalid_json' }, { status: 400 })
  }

  const checkIn  = typeof body.checkIn  === 'string' ? body.checkIn.trim()                  : ''
  const checkOut = typeof body.checkOut === 'string' ? body.checkOut.trim()                 : ''
  const guests   = typeof body.guests   === 'string' ? body.guests.trim()                   : ''
  const name     = typeof body.name     === 'string' ? body.name.trim()                     : ''
  const email    = typeof body.email    === 'string' ? body.email.trim().toLowerCase()       : ''
  const phone    = typeof body.phone    === 'string' ? body.phone.trim()                     : ''
  const message  = typeof body.message  === 'string' ? body.message.trim()                   : ''
  const hostName = typeof body.hostName === 'string' ? body.hostName.trim() : 'Unknown host'
  const hostUrl  = typeof body.hostUrl  === 'string' ? body.hostUrl.trim()                   : ''

  if (!checkIn || !checkOut || !guests || !name) {
    return Response.json({ ok: false, error: 'missing_fields' }, { status: 400 })
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ ok: false, error: 'invalid_email' }, { status: 400 })
  }

  const nights = nightsBetween(checkIn, checkOut)
  if (nights <= 0) {
    return Response.json({ ok: false, error: 'invalid_dates' }, { status: 400 })
  }

  const guestsLabel = guests === '1' ? '1 guest' : `${guests} guests`
  const subject = `Booking request — ${hostName} · ${formatDate(checkIn)} → ${formatDate(checkOut)} · ${guestsLabel}`

  const rows: [string, string][] = [
    ['Host',     hostName],
    ['Check-in', formatDate(checkIn)],
    ['Check-out', formatDate(checkOut)],
    ['Nights',   String(nights)],
    ['Guests',   guests],
    ['Name',     name],
    ['Email',    `<a href="mailto:${email}" style="color:#A7B75D">${email}</a>`],
    ...(phone   ? [['Phone',   phone]   as [string, string]] : []),
    ...(message ? [['Notes',  message] as [string, string]] : []),
  ]

  const tableRows = rows.map(([k, v], i) =>
    `<tr style="background:${i % 2 === 0 ? '#f9f6f0' : '#fff'}">
      <td style="padding:10px 14px;font-weight:600;color:#41372B;width:110px;white-space:nowrap;border-bottom:1px solid #ede8e0">${k}</td>
      <td style="padding:10px 14px;color:#2C2419;border-bottom:1px solid #ede8e0">${v}</td>
    </tr>`
  ).join('')

  const html = `
    <div style="font-family:system-ui,sans-serif;max-width:580px;color:#2C2419">
      <div style="background:#A7B75D;padding:18px 24px;border-radius:8px 8px 0 0">
        <p style="margin:0;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#2C2419">VeloTribe</p>
        <h2 style="margin:6px 0 0;color:#2C2419;font-size:20px;font-weight:800">New booking request</h2>
      </div>
      <table style="width:100%;border-collapse:collapse;border:1px solid #ede8e0;border-top:none;border-radius:0 0 8px 8px">
        ${tableRows}
      </table>
      ${hostUrl ? `<p style="margin-top:24px">
        <a href="${hostUrl}" style="display:inline-block;background:#A7B75D;color:#2C2419;padding:11px 22px;text-decoration:none;font-weight:700;font-size:13px;border-radius:6px">
          Check availability →
        </a>
      </p>` : ''}
      <p style="margin-top:20px;color:#999;font-size:12px;border-top:1px solid #ede8e0;padding-top:16px">
        Reply to this email to contact <strong>${name}</strong> directly at ${email}.
      </p>
    </div>`

  if (!env.RESEND_API_KEY || !env.RESEND_FROM) {
    console.error('booking_email_missing_env')
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
      tags: [{ name: 'event', value: 'booking_request' }],
    }),
  })

  if (!res.ok) {
    const errText = await res.text()
    console.error('booking_email_failed', errText)
    return Response.json({ ok: false, error: 'email_failed' }, { status: 500 })
  }

  return Response.json({ ok: true })
}

export const onRequestGet: PagesFunction = async () =>
  Response.json({ ok: false, error: 'method_not_allowed' }, { status: 405 })

export const onRequestPut: PagesFunction = async () =>
  Response.json({ ok: false, error: 'method_not_allowed' }, { status: 405 })

export const onRequestDelete: PagesFunction = async () =>
  Response.json({ ok: false, error: 'method_not_allowed' }, { status: 405 })
