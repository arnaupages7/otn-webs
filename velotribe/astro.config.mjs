// @ts-check
import { defineConfig } from 'astro/config'
import tailwindcss from '@tailwindcss/vite'

// https://astro.build/config
// Site URL configurable via env. Default = pages.dev (preview)
// Quan el domini final estigui apuntat, definir PUBLIC_SITE_URL=https://velotribe.com al build.
const SITE = process.env.PUBLIC_SITE_URL || 'https://velotribe.pages.dev'

export default defineConfig({
  site: SITE,
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es', 'ca'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
})
