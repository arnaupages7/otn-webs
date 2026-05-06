# OTN Webs — Monorepo

Repo que conté totes les webs informatives/funcionals OTN, una subcarpeta per client/lead.

**Repo GitHub:** [`old-to-new/otn-webs`](https://github.com/old-to-new/otn-webs) (privat)
**Stack:** Astro 6 + Tailwind 4
**Hosting:** Cloudflare Pages (compte OTN — `otnglobalconnect@gmail.com`)
**Patró desplegament:** 1 Cloudflare Pages project per subcarpeta, auto-deploy amb push a `main`.

---

## Estructura

```
otn-webs/
├── README.md              ← aquest fitxer
├── _TEMPLATE/             ← starter per nou client (copiar i renombrar)
├── cangarriga/            ← cangarriga.pages.dev
├── mariagifre-perruquera/ ← mariagifre-perruquera.pages.dev
└── <slug-client>/         ← un per client
```

### ⚠️ Regla d'or: `subcarpeta = project name = URL`

El nom de la subcarpeta **ha de ser exactament igual** al nom del Cloudflare Pages project, perquè el workflow auto-deploy passa `--project-name=<subcarpeta>` a wrangler. Si no coincideix → `Project not found` i deploy falla.

Tria un slug curt i parlable (sense espais ni accents) que representi el client. Exemples vàlids: `bar-pep`, `forn-rius`, `mariagifre-perruquera`, `cangarriga`.

---

## Workflow: nou client web

### 1. Crear subcarpeta des del template
```bash
cd serveis/otn-webs
cp -r _TEMPLATE <slug-client>
cd <slug-client>
npm install
```

> Substituir `<slug-client>` per slug curt sense espais ni accents (e.g., `bar-pep`, `forn-rius`). Aquest slug serà el nom del project a Cloudflare i la URL `*.pages.dev`.

### 2. Personalitzar contingut
- Editar `src/pages/index.astro` (hero, seccions)
- Substituir colors a `src/styles/global.css` si cal
- Afegir imatges a `public/`
- Actualitzar `astro.config.mjs` només si necessites integracions

### 3. Provar localment
```bash
npm run dev
# Obrir http://localhost:4321
```

### 4. Push a GitHub
```bash
cd ../..  # tornar a otn-webs/
git add <nou-client>/
git commit -m "feat(<nou-client>): web inicial"
git push origin main
```

### 5. Crear Cloudflare Pages project (1 cop per client) — via wrangler

```bash
wrangler pages project create <slug-client> --production-branch=main
```

> ⚠️ El `<slug-client>` ha de ser **exactament igual** al nom de la subcarpeta. El workflow auto-deploy ho dona per fet.

Si vols fer-ho via UI (menys recomanat — més clicks):
- dash.cloudflare.com (compte OTN) → Workers & Pages → Create application → Pages → Direct upload
- Project name: `<slug-client>`
- Crear sense fer cap upload (el primer deploy el farà el workflow)

### 6. Auto-deploy actiu

A partir d'ara, qualsevol push a `main` que toqui `<slug-client>/**` dispara un deploy automàtic via GitHub Actions (`.github/workflows/deploy.yml`). No cal fer res manual.

Verificar deploy:
```bash
gh run list --repo old-to-new/otn-webs --workflow="Deploy clients to Cloudflare Pages" --limit 3
wrangler pages deployment list --project-name=<slug-client>
```

### 7. (Opcional) Custom domain

Quan el client tingui domini propi:
- Workers & Pages → projecte → **Custom domains** → Add → introduir domini
- Configurar DNS al registrador (CNAME apuntant a `<slug-client>.pages.dev`)
- O via wrangler: `wrangler pages domain add <slug-client> <domini.com>`

---

## ⚠️ Notes importants

### Cada push triggers builds de TOTS els projectes Pages connectats
Limitació coneguda del monorepo + Pages: encara que toquis només `bar-pep/`, els altres es rebuilten també. Per ara és tolerable (builds Astro són ràpids, ~30s). Si esdevé problema:
- Configurar Pages → Settings → Builds → "Skip builds" amb pattern matching
- O migrar a repos individuals

### Slugs `*.pages.dev` són globals únics
Si vols un slug que ja està en ús a un altre compte, primer cal eliminar-lo allà. Vigila amb noms genèrics (`web`, `demo`, etc.).

### Variables d'entorn per client
Cada Pages project té les seves pròpies env vars al dashboard Cloudflare. NO es comparteixen entre projectes del mateix repo. Configurar-les a:
- dashboard CF → projecte → Settings → Environment variables
