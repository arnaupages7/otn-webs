// VeloTribe — Proveïdors curats manualment
// Per afegir un nou proveïdor: copia un bloc existent i omple els camps.
// active: false → mostra com "joining soon" (targeta borrosa)

export type ProviderType = 'accommodation' | 'guide' | 'tour' | 'cafe' | 'shop' | 'training'

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
  | 'functional-training'
  | 'small-groups'
  | 'readaptation'
  | 'performance'

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
    fr?: string
  }
  image?: string              // ruta relativa a /public o URL externa (portada)
  images?: string[]           // galeria completa (pàgina de detall)
  cardImages?: string[]       // fotos seleccionades per al slideshow de la targeta
  website?: string
  hidden?: boolean            // true = no es mostra a la landing
  slug?: string               // si existeix, la targeta enllaça a /hosts/{slug}
  badge?: 'founding-host' | 'verified'
  seal?: boolean              // Sello VeloTribe — revisat personalment per VeloTribe
  active: boolean             // false = coming soon
}

// ─── TAG LABELS (multilingüe) ───────────────────────────────────────────────
export const tagLabels: Record<ProviderTag, { en: string; es: string; ca: string; fr: string }> = {
  'bike-storage':    { en: 'Bike storage',     es: 'Guardabici',        ca: 'Guarda-bici',          fr: 'Stockage vélo'        },
  'secure-storage':  { en: 'Secure storage',   es: 'Almacén seguro',    ca: 'Emmagatzematge segur', fr: 'Stockage sécurisé'    },
  'breakfast':       { en: 'Cyclist breakfast', es: 'Desayuno ciclista', ca: 'Esmorzar ciclista',    fr: 'Petit-déj. cycliste'  },
  'tools':           { en: 'Workshop & tools',  es: 'Taller y herram.',  ca: 'Taller i eines',       fr: 'Atelier & outils'     },
  'laundry':         { en: 'Laundry',           es: 'Lavandería',        ca: 'Bugaderia',            fr: 'Laverie'              },
  'outdoor-shower':  { en: 'Outdoor shower',    es: 'Ducha exterior',    ca: 'Dutxa exterior',       fr: 'Douche extérieure'    },
  'bike-wash':       { en: 'Bike wash',         es: 'Limpieza bici',     ca: 'Neteja bici',          fr: 'Lavage vélo'          },
  'bike-rental':     { en: 'Bike rental',       es: 'Alquiler bici',     ca: 'Lloguer bici',         fr: 'Location vélo'        },
  'group-rides':     { en: 'Group rides',       es: 'Salidas en grupo',  ca: 'Sortides en grup',     fr: 'Sorties en groupe'    },
  'route-tips':      { en: 'Local route tips',  es: 'Rutas locales',     ca: 'Rutes locals',         fr: 'Conseils locaux'      },
  'transfer':        { en: 'Transfer service',  es: 'Transfer',          ca: 'Transfer',             fr: 'Transfert'            },
  'pool':                { en: 'Pool',                  es: 'Piscina',                 ca: 'Piscina',               fr: 'Piscine'                  },
  'garden':              { en: 'Garden',                es: 'Jardín',                  ca: 'Jardí',                 fr: 'Jardin'                   },
  'functional-training': { en: 'Functional training',   es: 'Entrenamiento funcional', ca: 'Entrenament funcional', fr: 'Entraînement fonctionnel' },
  'small-groups':        { en: 'Small groups',          es: 'Grupos reducidos',        ca: 'Grups reduïts',         fr: 'Petits groupes'           },
  'readaptation':        { en: 'Readaptation',          es: 'Readaptación',            ca: 'Readaptació',           fr: 'Réadaptation'             },
  'performance':         { en: 'Performance training',  es: 'Entren. de rendiment',    ca: 'Entren. de rendiment',  fr: 'Entraîn. performance'     },
}

// ─── BADGE LABELS ────────────────────────────────────────────────────────────
export const badgeLabels = {
  'founding-host': { en: 'Founding Host', es: 'Anfitrión Fundador', ca: 'Amfitrió Fundador', fr: 'Hôte Fondateur' },
  'verified':      { en: 'Verified',      es: 'Verificado',         ca: 'Verificat',          fr: 'Vérifié'        },
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
    image: '/hosts/casa-gessami/1.jpg',
    images: Array.from({ length: 20 }, (_, i) => `/hosts/casa-gessami/${i + 1}.jpg`),
    cardImages: [1, 2, 4, 7, 14].map(n => `/hosts/casa-gessami/${n}.jpg`),
    website: undefined,
    badge: 'founding-host',
    seal: true,
    active: true,
  },

  {
    id: 'alain-fernandez',
    name: 'Alain Fernandez',
    location: 'Girona & Mallorca',
    type: 'guide',
    tags: ['group-rides', 'route-tips'],
    slug: 'alain-fernandez',
    description: {
      en: 'Local cycling guide with over a decade of experience on the roads of Girona and the mountains of Mallorca. Small groups, custom routes, all levels welcome.',
      es: 'Guía ciclista local con más de una década de experiencia en las carreteras de Girona y las montañas de Mallorca. Grupos pequeños, rutas personalizadas, todos los niveles.',
      ca: 'Guia ciclista local amb més d\'una dècada d\'experiència a les carreteres de Girona i les muntanyes de Mallorca. Grups petits, rutes personalitzades, tots els nivells.',
    },
    image: '/providers/alain-fernandez.jpg',
    badge: 'founding-host',
    seal: true,
    active: true,
  },

  {
    id: 'espai-8',
    name: 'Espai 8',
    location: 'Banyoles, Pla de l\'Estany',
    type: 'training',
    tags: ['functional-training', 'small-groups', 'readaptation', 'performance'],
    slug: 'espai-8',
    description: {
      en: 'Boutique training centre in Banyoles for cyclists who want to level up. Small groups, functional training, readaptation and sports performance — the place where semi-pros train.',
      es: 'Centro de entrenamiento boutique en Banyoles para ciclistas que quieren subir de nivel. Grupos reducidos, entrenamiento funcional, readaptación y rendimiento deportivo — donde entrenan los semiprofesionales.',
      ca: 'Centre d\'entrenament boutique a Banyoles per a ciclistes que volen pujar de nivell. Grups reduïts, entrenament funcional, readaptació i rendiment esportiu — on entrenen els semiprofessionals.',
    },
    image: '/hosts/espai-8/1.jpg',
    images: Array.from({ length: 6 }, (_, i) => `/hosts/espai-8/${i + 1}.jpg`),
    website: 'https://www.espai8.net/',
    badge: 'founding-host',
    seal: true,
    active: true,
  },

  {
    id: 'casa-romani',
    name: 'Casa Romaní',
    location: "Camós · Pla de l'Estany, Girona",
    type: 'accommodation',
    tags: ['bike-storage', 'bike-wash', 'garden', 'route-tips'],
    slug: 'casa-romani',
    description: {
      en: "Renovated holiday home in Camós, 7 min from Lake Banyoles. Covered terrace, barbecue and Pyrenees views. Ideal base for cycling Pla de l'Estany and Girona, 25 km away. Up to 8 guests.",
      es: "Casa de vacaciones renovada en Camós, a 7 min del lago de Banyoles. Terraza cubierta, barbacoa y vistas a los Pirineos. Base ideal para pedalear por el Pla de l'Estany y Girona, a 25 km. Hasta 8 huéspedes.",
      ca: "Casa de vacances renovada a Camós, a 7 min del llac de Banyoles. Terrassa coberta, barbacoa i vistes als Pirineus. Base ideal per pedalar pel Pla de l'Estany i Girona, a 25 km. Fins a 8 hostes.",
    },
    image: '/hosts/casa-romani/1.jpg',
    images: Array.from({ length: 30 }, (_, i) => `/hosts/casa-romani/${i + 1}.jpg`),
    cardImages: [1, 3, 20, 22, 25].map(n => `/hosts/casa-romani/${n}.jpg`),
    website: undefined,
    badge: 'founding-host',
    seal: true,
    active: true,
  },

  // ── Placeholder "joining soon" ────────────────────────────────────────────
  { id: 'soon-1', name: '', location: '', type: 'accommodation', tags: [], description: { en: '', es: '', ca: '' }, active: false },
]
