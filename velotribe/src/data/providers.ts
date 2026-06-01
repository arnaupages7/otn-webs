// VeloTribe — Proveïdors curats manualment
// Per afegir un nou proveïdor: copia un bloc existent i omple els camps.
// active: false → mostra com "joining soon" (targeta borrosa)

export type ProviderType = 'accommodation' | 'guide' | 'tour' | 'cafe' | 'shop'

export type ProviderTag =
  | 'bike-storage'
  | 'secure-storage'
  | 'breakfast'
  | 'tools'
  | 'laundry'
  | 'outdoor-shower'
  | 'bike-wash'
  | 'bike-rental'
  | 'group-rides'
  | 'route-tips'
  | 'transfer'
  | 'pool'
  | 'garden'

export interface Provider {
  id: string
  name: string
  location: string            // "Banyoles, Pla de l'Estany"
  type: ProviderType
  tags: ProviderTag[]
  description: {
    en: string
    es: string
    ca: string
  }
  image?: string              // ruta relativa a /public o URL externa
  website?: string
  slug?: string               // si existeix, la targeta enllaça a /hosts/{slug}
  badge?: 'founding-host' | 'verified'
  active: boolean             // false = coming soon
}

// ─── TAG LABELS (multilingüe) ───────────────────────────────────────────────
export const tagLabels: Record<ProviderTag, { en: string; es: string; ca: string }> = {
  'bike-storage':    { en: 'Bike storage',     es: 'Guardabici',        ca: 'Guarda-bici'       },
  'secure-storage':  { en: 'Secure storage',   es: 'Almacén seguro',    ca: 'Emmagatzematge segur' },
  'breakfast':       { en: 'Cyclist breakfast', es: 'Desayuno ciclista', ca: 'Esmorzar ciclista' },
  'tools':           { en: 'Workshop & tools',  es: 'Taller y herram.',  ca: 'Taller i eines'    },
  'laundry':         { en: 'Laundry',           es: 'Lavandería',        ca: 'Bugaderia'         },
  'outdoor-shower':  { en: 'Outdoor shower',    es: 'Ducha exterior',    ca: 'Dutxa exterior'    },
  'bike-wash':       { en: 'Bike wash',         es: 'Limpieza bici',     ca: 'Neteja bici'       },
  'bike-rental':     { en: 'Bike rental',       es: 'Alquiler bici',     ca: 'Lloguer bici'      },
  'group-rides':     { en: 'Group rides',       es: 'Salidas en grupo',  ca: 'Sortides en grup'  },
  'route-tips':      { en: 'Local route tips',  es: 'Rutas locales',     ca: 'Rutes locals'      },
  'transfer':        { en: 'Transfer service',  es: 'Transfer',          ca: 'Transfer'          },
  'pool':            { en: 'Pool',              es: 'Piscina',           ca: 'Piscina'           },
  'garden':          { en: 'Garden',            es: 'Jardín',            ca: 'Jardí'             },
}

// ─── BADGE LABELS ────────────────────────────────────────────────────────────
export const badgeLabels = {
  'founding-host': { en: 'Founding Host', es: 'Anfitrión Fundador', ca: 'Amfitrió Fundador' },
  'verified':      { en: 'Verified',      es: 'Verificado',         ca: 'Verificat'          },
}

// ─── LLISTA DE PROVEÏDORS ────────────────────────────────────────────────────
export const providers: Provider[] = [
  {
    id: 'casa-gessami',
    name: 'Casa Gessamí',
    location: "Camós · Pla de l'Estany, Girona",
    type: 'accommodation',
    tags: ['bike-storage', 'bike-wash', 'garden', 'route-tips'],
    slug: 'casa-gessami',
    description: {
      en: 'Renovated holiday home in Camós, 7 min from Lake Banyoles. Rural setting with covered terrace, barbecue and countryside views. Perfect base for cycling the Pla de l\'Estany and the roads to Girona, 25 min away.',
      es: 'Casa de vacaciones renovada en Camós, a 7 min del lago de Banyoles. Entorno rural con terraza cubierta, barbacoa y vistas al campo. Base ideal para pedalear por el Pla de l\'Estany y las carreteras de Girona, a 25 min.',
      ca: 'Casa de vacances renovada a Camós, a 7 min del llac de Banyoles. Entorn rural amb terrassa coberta, barbacoa i vistes al camp. Base ideal per pedalar pel Pla de l\'Estany i les carreteres de Girona, a 25 min.',
    },
    image: '/providers/casa-gessami.jpg',
    website: 'https://moreholiday.es/properties/casa-gessami-allotjament-acollidor-al-pla-de-lestany/',
    badge: 'founding-host',
    active: true,
  },

  // ── Placeholders "joining soon" ───────────────────────────────────────────
  { id: 'soon-1', name: '', location: '', type: 'accommodation', tags: [], description: { en: '', es: '', ca: '' }, active: false },
  { id: 'soon-2', name: '', location: '', type: 'guide',         tags: [], description: { en: '', es: '', ca: '' }, active: false },
]
