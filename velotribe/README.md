# VeloTribe — Landing Waitlist

> Pre-llançament. Captura de waitlist amb dos passos (email + qualificació opcional). Target principal: ciclistes turistes que visiten Girona.

**URL:** `velotribe.pages.dev` (Cloudflare Pages, compte OTN) → `velotribe.com` un cop el domini estigui apuntat
**Stack:** Astro 6 + Tailwind 4 + Cloudflare D1 + KV + Resend
**Llengües:** EN (default) · ES · CA

---

## Estructura

```
velotribe/
├── src/
│   ├── pages/
│   │   ├── index.astro           # /  (EN)
│   │   ├── thanks.astro          # /thanks
│   │   ├── privacy.astro
│   │   ├── legal-notice.astro
│   │   ├── cookies.astro
│   │   ├── es/  ca/              # versions traduïdes
│   ├── components/
│   │   ├── Nav · Hero · Stats · TwoPaths · HowItWorks
│   │   ├── Problem · Waitlist · Providers · Footer
│   │   ├── Step2Form · LegalLayout
│   ├── i18n/ui.ts                # diccionari EN+ES+CA
│   ├── lib/consent.ts            # versió GDPR consent
│   └── layouts/Layout.astro
├── functions/api/
│   ├── waitlist.ts               # POST Step 1 (Pages Function)
│   └── waitlist-step2.ts         # POST Step 2 (UPDATE)
├── migrations/0001_init.sql      # schema D1
└── wrangler.toml                 # bindings DB + COUNTER
```

---

## Setup local

```bash
npm install
npm run dev   # http://localhost:4321
```

---

## Setup Cloudflare (1 cop)

Compte OTN (`otnglobalconnect@gmail.com`):

```bash
# 1. Crear D1 a regió EU
wrangler d1 create velotribe --location=weur
#    → copiar database_id a wrangler.toml

# 2. Crear KV namespace
wrangler kv namespace create COUNTER --remote
#    → copiar id a wrangler.toml

# 3. Aplicar migració
wrangler d1 execute velotribe --file=./migrations/0001_init.sql --remote

# 4. Configurar secrets (després del primer deploy)
wrangler pages secret put RESEND_API_KEY --project-name=velotribe

# 5. Crear Pages project
wrangler pages project create velotribe --production-branch=main
```

L'auto-deploy del monorepo fa la resta a cada push a `main`.

---

## Endpoints API

### `POST /api/waitlist` (Step 1)

Cyclist:
```json
{
  "audience": "cyclist",
  "email": "rider@example.com",
  "cycling_type": "gravel",
  "consent": true,
  "locale": "en",
  "utm_source": "instagram"
}
```

Host:
```json
{
  "audience": "host",
  "email": "host@example.com",
  "business_name": "Hotel Pedals",
  "business_type": "accommodation",
  "location": "Olot",
  "consent": true,
  "locale": "en"
}
```

Response: `{ ok: true, position: 42 }` o error JSON amb status 4xx/5xx.

Errors: `invalid_email`, `consent_required`, `invalid_audience`, `invalid_cycling_type`, `invalid_business`, `duplicate` (409), `rate_limited` (429).

### `POST /api/waitlist-step2`

Actualitza el lead amb les dades opcionals de qualificació:
```json
{
  "email": "rider@example.com",
  "audience": "cyclist",
  "country": "United Kingdom",
  "experience": "regular",
  "dream": ["cols", "gravel", "food"],
  "duration": "week",
  "dream_text": "Looking for a 7-day cycling trip with food and wine experience"
}
```

---

## GDPR / Privacitat

- Consent versionat (`v1.0.0`) loggat a D1 amb timestamp + IP hash
- D1 region = WEUR (dades a la UE)
- Cloudflare Web Analytics: privacy-first, sense cookies
- Drets ARCO via `privacy@velotribe.com`
- Política de Privacitat, Avís Legal, Cookies en EN + ES + CA

Pàgines legals en estat **draft** durant validació pre-llançament. Es finalitzaran un cop es decideixin les dades del responsable formal (entitat o persona física).

---

## Status decisions

Vegeu `clients/07_velotribe/docs/decisions.md` al workspace OTN per a l'estat actualitzat.

| # | Decisió | Estat |
|---|---------|-------|
| Logo SVG | PENDENT — Nona Studio el passarà |
| Domini `velotribe.com` | PENDENT — Xinu el connecta a Cloudflare |
| Email `privacy@velotribe.com` | PENDENT — Xinu té els correus |
| Forma jurídica | DEFERIT — fase de validació, persona física |
| DPA OTN ↔ VeloTribe | DEFERIT — quan es formalitzi |

---

## KPIs a monitoritzar post-deploy

1. Visitants únics / 30 dies
2. Conversion rate visit → email Step 1 (target 4-7%)
3. Conversion Step 1 → Step 2 (target >40%)
4. Ratio cyclist : host
5. Distribució per país de residència
6. Top "dream trip" categories
7. Open-text feedback (mining qualitatiu)
