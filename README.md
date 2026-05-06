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
├── can-garriga/           ← cangarriga.pages.dev
├── mariagifra/            ← mariagifre-perruquera.pages.dev
└── <nou-client>/          ← un per client
```

---

## Workflow: nou client web

### 1. Crear subcarpeta des del template
```bash
cd serveis/otn-webs
cp -r _TEMPLATE <nou-client>
cd <nou-client>
npm install
```

> Substituir `<nou-client>` per slug curt sense espais (e.g., `bar-pep`, `forn-rius`).

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

### 5. Crear Cloudflare Pages project (1 cop per client)

**Login:** dash.cloudflare.com amb compte OTN (`otnglobalconnect@gmail.com`)

1. Workers & Pages → **Create application** → **Pages** → **Connect to Git**
2. Autoritzar GitHub org `old-to-new` (només la primera vegada)
3. Seleccionar repo: `old-to-new/otn-webs`
4. **Set up builds and deployments:**
   - Project name: `<nou-client>` (serà el subdomini `<nou-client>.pages.dev`)
   - Production branch: `main`
   - Framework preset: **Astro**
   - Build command: `npm run build`
   - Build output directory: `dist`
   - **Root directory (advanced):** `<nou-client>` ⚠️ molt important
5. Save and Deploy → ~2 min build
6. Verificar URL `<nou-client>.pages.dev`

### 6. (Opcional) Custom domain
- Workers & Pages → projecte → **Custom domains** → Add → introduir domini
- Configurar DNS al registrador (CNAME apuntant a `<nou-client>.pages.dev`)

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
