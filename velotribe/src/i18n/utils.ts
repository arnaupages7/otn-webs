import { ui, type Lang, type UiKey } from './ui'

export function getLangFromUrl(url: URL): Lang {
  const [, segment] = url.pathname.split('/')
  if (segment === 'es') return 'es'
  if (segment === 'ca') return 'ca'
  if (segment === 'fr') return 'fr'
  return 'en'
}

export function useTranslations(lang: Lang) {
  return function t(key: UiKey): string {
    return ui[lang][key] ?? ui.en[key] ?? key
  }
}

export function langPrefix(lang: Lang): string {
  return lang === 'en' ? '' : `/${lang}`
}

export function pathFor(lang: Lang, path: string = '/'): string {
  const clean = path.startsWith('/') ? path : `/${path}`
  return `${langPrefix(lang)}${clean}`.replace(/\/+/g, '/') || '/'
}
