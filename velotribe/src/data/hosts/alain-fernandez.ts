// Alain Fernandez — Cycling guide data
// Shared across EN / ES / CA pages

import type { AmenityItem } from '../../components/HostDetail.astro'

export const alainFernandezBase = {
  slug: 'alain-fernandez',
  name: 'Alain Fernandez',
  location: 'Girona & Mallorca',
  badge: 'founding-host' as const,
  image: '/providers/alain-fernandez.jpg',
  // No external website — bookings handled via VeloTribe form

  title: {
    en: 'Local Cycling Guide in Girona & Mallorca',
    es: 'Guía de Ciclismo Local en Girona y Mallorca',
    ca: 'Guia de Ciclisme Local a Girona i Mallorca',
  },

  subtitle: {
    en: 'Personalised rides with someone who knows every road',
    es: 'Salidas personalizadas con quien conoce cada carretera',
    ca: 'Sortides personalitzades amb qui coneix cada carretera',
  },

  // Override section titles for a guide profile
  amenitiesTitle: {
    en: "What's included",
    es: 'Qué incluye',
    ca: 'Què inclou',
  },
  amenitiesSub: {
    en: 'Everything you get when you ride with Alain.',
    es: 'Todo lo que incluye salir a rodar con Alain.',
    ca: "Tot el que inclou sortir a rodar amb l'Alain.",
  },
  bookFormTitle: {
    en: 'Book a ride',
    es: 'Reserva una salida',
    ca: 'Reserva una sortida',
  },

  description: {
    en: "Alain has been riding the roads of Girona for over a decade — the same roads that attract pro teams and cycling pilgrims from across Europe. Whether you want to tick off Rocacorba, explore the quiet lanes of the Empordà, or find the best climbs around Banyoles, he knows exactly where to take you. In spring he heads south to Mallorca, where he guides rides through the Tramuntana mountains — Sa Calobra, Puig Major, Cap des Pinar — with the same local knowledge that makes all the difference between a good day and an unforgettable one.",
    es: "Alain lleva más de una década rodando por las carreteras de Girona, las mismas rutas que atraen a equipos profesionales y peregrinos del ciclismo de toda Europa. Tanto si quieres subir Rocacorba, explorar los tranquilos caminos del Empordà o encontrar las mejores subidas alrededor de Banyoles, sabe exactamente adónde llevarte. En primavera se traslada a Mallorca, donde guía rutas por la sierra de Tramontana — Sa Calobra, Puig Major, Cap des Pinar — con el mismo conocimiento local que marca la diferencia entre un buen día y uno inolvidable.",
    ca: "L'Alain porta més d'una dècada rodant per les carreteres de Girona, les mateixes rutes que atreuen equips professionals i pelegrins del ciclisme de tota Europa. Tant si vols pujar Rocacorba, explorar els tranquils camins de l'Empordà o trobar les millors pujades pels voltants de Banyoles, sap exactament on portar-te. A la primavera es trasllada a Mallorca, on guia rutes per la serra de Tramuntana — Sa Calobra, Puig Major, Cap des Pinar — amb el mateix coneixement local que marca la diferència entre un bon dia i un d'inoblidable.",
  },

  spaceDetails: {
    en: 'Rides run in small groups — 2 to 8 cyclists — to keep the pace flexible and the experience personal. Alain speaks English, Spanish, and Catalan, and tailors each ride to the group\'s level, from confident beginners to experienced club riders. Half-day and full-day formats available. Book via this page and he\'ll get back to you to discuss the details.',
    es: 'Las salidas se organizan en grupos pequeños — de 2 a 8 ciclistas — para mantener el ritmo flexible y la experiencia personal. Alain habla inglés, español y catalán, y adapta cada salida al nivel del grupo, desde principiantes seguros hasta ciclistas de club experimentados. Disponibles en formato de medio día y día completo. Reserva a través de esta página y te contactará para ultimar los detalles.',
    ca: "Les sortides s'organitzen en grups petits — de 2 a 8 ciclistes — per mantenir el ritme flexible i l'experiència personal. L'Alain parla anglès, castellà i català, i adapta cada sortida al nivell del grup, des de principiants segurs fins a ciclistes de club experimentats. Disponibles en format de mig dia i dia complet. Reserva a través d'aquesta pàgina i es posarà en contacte per tancar els detalls.",
  },

  areaSection: {
    en: "Girona is one of Europe's great cycling cities. The roads fanning out from its medieval centre — Rocacorba (1,154 m), the volcanic landscapes of the Garrotxa, the rolling hills of the Empordà — cover every terrain a cyclist could want. In Mallorca, the Serra de Tramuntana offers some of the most dramatic road riding on the continent: the legendary Sa Calobra canyon descent, the long climb to Puig Major, and quiet mountain roads the tour groups never reach.",
    es: "Girona es una de las grandes ciudades ciclistas de Europa. Las carreteras que irradian desde su centro medieval — Rocacorba (1.154 m), los paisajes volcánicos de la Garrotxa, las colinas del Empordà — cubren cada terreno que un ciclista pueda desear. En Mallorca, la Serra de Tramuntana ofrece algunos de los trayectos en carretera más espectaculares del continente: el legendario descenso por el cañón de Sa Calobra, la larga subida al Puig Major y las tranquilas carreteras de montaña que los grupos turísticos nunca alcanzan.",
    ca: "Girona és una de les grans ciutats ciclistes d'Europa. Les carreteres que irradien des del seu centre medieval — Rocacorba (1.154 m), els paisatges volcànics de la Garrotxa, les turons de l'Empordà — cobreixen cada terreny que un ciclista pugui desitjar. A Mallorca, la Serra de Tramuntana ofereix alguns dels trajectes en carretera més espectaculars del continent: el llegendari descens pel barranc de Sa Calobra, la llarga pujada al Puig Major i les tranquil·les carreteres de muntanya que els grups turístics mai arriben.",
  },

  amenities: [
    {
      available: true,
      labelKey: 'group-rides' as const,
      note: {
        en: 'Small groups — 2 to 8 cyclists',
        es: 'Grupos pequeños — de 2 a 8 ciclistas',
        ca: 'Grups petits — de 2 a 8 ciclistes',
      },
    },
    {
      available: true,
      labelKey: 'route-tips' as const,
      note: {
        en: 'GPX tracks included for every ride',
        es: 'Tracks GPX incluidos en cada salida',
        ca: 'Tracks GPX inclosos en cada sortida',
      },
    },
    {
      available: true,
      label: {
        en: 'Half-day & full-day formats',
        es: 'Formato medio día y día completo',
        ca: 'Format mig dia i dia complet',
      },
      note: {
        en: 'Tailored to your schedule',
        es: 'Adaptado a tu agenda',
        ca: "Adaptat al teu horari",
      },
    },
    {
      available: true,
      label: {
        en: 'Girona & Mallorca destinations',
        es: 'Destinos Girona y Mallorca',
        ca: 'Destins Girona i Mallorca',
      },
      note: {
        en: 'Rocacorba, Garrotxa, Tramuntana',
        es: 'Rocacorba, Garrotxa, Tramontana',
        ca: 'Rocacorba, Garrotxa, Tramuntana',
      },
    },
    {
      available: false,
      labelKey: 'bike-rental' as const,
      note: {
        en: 'Bring your own bike',
        es: 'Trae tu propia bici',
        ca: 'Porta la teva pròpia bici',
      },
    },
    {
      available: false,
      labelKey: 'transfer' as const,
      note: {
        en: 'Not included — ask for recommendations',
        es: 'No incluido — pide recomendaciones',
        ca: 'No inclòs — demana recomanacions',
      },
    },
  ] satisfies AmenityItem[],

  seoTitle: {
    en: 'Alain Fernandez — Cycling Guide Girona & Mallorca | VeloTribe',
    es: 'Alain Fernandez — Guía Ciclismo Girona y Mallorca | VeloTribe',
    ca: 'Alain Fernandez — Guia Ciclisme Girona i Mallorca | VeloTribe',
  },

  seoDesc: {
    en: "Local cycling guide in Girona and Mallorca. Small groups, custom routes, all levels. Rocacorba, Tramuntana, Garrotxa — ride with someone who knows every road.",
    es: "Guía ciclista local en Girona y Mallorca. Grupos reducidos, rutas personalizadas, todos los niveles. Rocacorba, Tramontana, Garrotxa — pedalea con quien conoce cada carretera.",
    ca: "Guia ciclista local a Girona i Mallorca. Grups reduïts, rutes personalitzades, tots els nivells. Rocacorba, Tramuntana, Garrotxa — pedala amb qui coneix cada carretera.",
  },
}
