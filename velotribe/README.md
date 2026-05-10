# Template OTN — nova web client

Starter Astro 6 + Tailwind 4 per crear webs informatives ràpides per negocis locals.

**No editar aquesta carpeta directament.** Copiar-la per cada nou client:

```bash
cd serveis/otn-webs
cp -r _TEMPLATE <slug-client>
cd <slug-client>
npm install
npm run dev
```

Veure workflow complet a `serveis/otn-webs/README.md`.

---

## Personalització mínima per nou client

1. **`src/pages/index.astro`** — actualitzar constant `NEGOCI` (nom, tagline, contacte, adreça)
2. **`src/layouts/Layout.astro`** — afegir Schema.org JSON-LD del tipus de negoci (LocalBusiness, Restaurant, HairSalon...)
3. **`src/styles/global.css`** — sobreescriure `--color-accent` i `--color-cream` si la marca del client té paleta pròpia
4. **`public/`** — afegir favicon, og-image, fotos del negoci
5. **`package.json`** — actualitzar camp `name` al slug del client

## Brand tokens OTN per defecte

| Token | Valor | Ús |
|-------|-------|-----|
| `--color-ink` | `#111111` | Fons fosc |
| `--color-cream` | `#f5f1e8` | Text sobre fosc |
| `--color-accent` | `#c84630` | CTAs, hovers |
| `--font-sans` | Inter | Text general |
| `--font-display` | Cormorant Garamond | Títols |
| `--font-mono` | JetBrains Mono | Codi/dades |

Si el client vol paleta pròpia, sobreescriure a `global.css` mantenint els noms de tokens.
