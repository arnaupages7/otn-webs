// Espai 8 — Cycling training centre data
// Shared across EN / ES / CA pages

import type { AmenityItem } from '../../components/HostDetail.astro'

export const espai8Base = {
  slug: 'espai-8',
  name: 'Espai 8',
  location: 'Banyoles, Pla de l\'Estany',
  badge: 'founding-host' as const,
  seal: true,
  image: '/hosts/espai-8/1.jpg',
  images: Array.from({ length: 6 }, (_, i) => `/hosts/espai-8/${i + 1}.jpg`),
  galleryPositions: ['center', 'center', 'center', 'center', 'center', 'center top'],
  website: 'https://www.espai8.net/',

  title: {
    en: 'Where Good Cyclists Become Great',
    es: 'Donde los Buenos Ciclistas se Convierten en Grandes',
    ca: 'On els Bons Ciclistes es Converteixen en Grans',
  },

  subtitle: {
    en: 'Functional training centre for cyclists · Banyoles',
    es: 'Centro de entrenamiento funcional para ciclistas · Banyoles',
    ca: "Centre d'entrenament funcional per a ciclistes · Banyoles",
  },

  // Override section titles for a training centre profile
  amenitiesTitle: {
    en: 'Training offer',
    es: 'Oferta de entrenamiento',
    ca: "Oferta d'entrenament",
  },
  amenitiesSub: {
    en: 'What you get when you train with Espai 8.',
    es: 'Lo que consigues cuando entrenas con Espai 8.',
    ca: 'El que aconsegueixes quan entrenes amb Espai 8.',
  },
  bookFormTitle: {
    en: 'Book a session',
    es: 'Reserva una sesión',
    ca: 'Reserva una sessió',
  },

  description: {
    en: "Espai 8 is a boutique training centre in Banyoles built around one idea: that most cyclists have more potential than they're using. With a sports science approach, small groups capped at 8, and coaches who understand the specific demands of cycling — from road racing to long-distance gravel — they design programmes that actually move the needle. Semi-professional riders come here to gain the extra edge. Amateur cyclists come to find out what they're really capable of.",
    es: "Espai 8 es un centro de entrenamiento boutique en Banyoles construido alrededor de una idea: que la mayoría de los ciclistas tienen más potencial del que están usando. Con un enfoque basado en ciencias del deporte, grupos reducidos de hasta 8 personas y entrenadores que entienden las demandas específicas del ciclismo — desde la carretera hasta el gravel de larga distancia — diseñan programas que de verdad marcan la diferencia. Los ciclistas semiprofesionales vienen aquí a ganar ese margen extra. Los amateurs vienen a descubrir de qué son realmente capaces.",
    ca: "Espai 8 és un centre d'entrenament boutique a Banyoles construït al voltant d'una idea: que la majoria dels ciclistes tenen més potencial del que estan fent servir. Amb un enfocament basat en ciències de l'esport, grups reduïts de fins a 8 persones i entrenadors que entenen les demandes específiques del ciclisme — des de la carretera fins al gravel de llarga distància — dissenyen programes que de veritat marquen la diferència. Els ciclistes semiprofessionals vénen aquí a guanyar aquell marge extra. Els amateurs vénen a descobrir de què són realment capaços.",
  },

  spaceDetails: {
    en: "Located on Avenida Països Catalans in Banyoles, the facility is purpose-built for functional training: open training floor, conditioning equipment, and a recovery area. Sessions are kept small by design — never more than 8 athletes — so every session gets real coaching attention. They work with Spanish semi-pro cycling teams and individual riders at all competitive levels. Languages: Catalan, Spanish, and English on request.",
    es: "Situado en la Avenida Països Catalans de Banyoles, el centro está diseñado específicamente para el entrenamiento funcional: suelo de entrenamiento abierto, equipamiento de acondicionamiento y zona de recuperación. Las sesiones son reducidas por diseño — nunca más de 8 atletas — para que cada sesión reciba una atención real del entrenador. Trabajan con equipos ciclistas semiprofesionales españoles y con ciclistas individuales de todos los niveles competitivos. Idiomas: catalán, castellano e inglés bajo petición.",
    ca: "Situat a l'Avinguda Països Catalans de Banyoles, el centre està dissenyat específicament per a l'entrenament funcional: espai d'entrenament obert, equipament de condicionament i zona de recuperació. Les sessions són reduïdes per disseny — mai més de 8 atletes — perquè cada sessió rebi una atenció real de l'entrenador. Treballen amb equips ciclistes semiprofessionals espanyols i amb ciclistes individuals de tots els nivells competitius. Idiomes: català, castellà i anglès sota petició.",
  },

  areaSection: {
    en: "Banyoles is the cycling hub of the Pla de l'Estany region — a lake town that hosted the 1992 Barcelona Olympics rowing events and has been a training base for elite athletes ever since. More than 300 km of mapped routes start at the lake's edge: flat loops for recovery days, punchy hills toward the Garrotxa, and the first Pyrenean passes an hour north. Training at Espai 8 and riding the Banyoles roads is the complete cycling experience.",
    es: "Banyoles es el centro ciclista de la comarca del Pla de l'Estany — una ciudad lacustre que acogió los eventos de remo de los Juegos Olímpicos de Barcelona 1992 y ha sido base de entrenamiento para deportistas de élite desde entonces. Más de 300 km de rutas trazadas parten desde la orilla del lago: vueltas llanas para días de recuperación, repechos hacia la Garrotxa y los primeros puertos pirenaicos a una hora al norte. Entrenar en Espai 8 y rodar por las carreteras de Banyoles es la experiencia ciclista completa.",
    ca: "Banyoles és el centre ciclista de la comarca del Pla de l'Estany — una ciutat lacustre que va acollir els esdeveniments de rem dels Jocs Olímpics de Barcelona 1992 i ha estat base d'entrenament per a esportistes d'elit des de llavors. Més de 300 km de rutes traçades surten des de la vora del llac: voltes planes per als dies de recuperació, repisos cap a la Garrotxa i els primers ports pirinencs a una hora al nord. Entrenar a Espai 8 i rodar per les carreteres de Banyoles és l'experiència ciclista completa.",
  },

  amenities: [
    {
      available: true,
      label: {
        en: 'Functional training',
        es: 'Entrenamiento funcional',
        ca: 'Entrenament funcional',
      },
      note: {
        en: 'Cycling-specific strength & conditioning',
        es: 'Fuerza y acondicionamiento específico para ciclismo',
        ca: 'Força i condicionament específic per al ciclisme',
      },
    },
    {
      available: true,
      label: {
        en: 'Small groups — max 8',
        es: 'Grupos reducidos — máx. 8',
        ca: 'Grups reduïts — màx. 8',
      },
      note: {
        en: 'Real coaching attention every session',
        es: 'Atención real del entrenador en cada sesión',
        ca: "Atenció real de l'entrenador a cada sessió",
      },
    },
    {
      available: true,
      label: {
        en: 'Readaptation & recovery',
        es: 'Readaptación y recuperación',
        ca: 'Readaptació i recuperació',
      },
      note: {
        en: 'Sports physiotherapy approach',
        es: 'Enfoque de fisioterapia deportiva',
        ca: "Enfocament de fisioteràpia esportiva",
      },
    },
    {
      available: true,
      label: {
        en: 'Performance assessment',
        es: 'Evaluación de rendimiento',
        ca: 'Avaluació de rendiment',
      },
      note: {
        en: 'Data-driven training plans',
        es: 'Planes de entrenamiento basados en datos',
        ca: "Plans d'entrenament basats en dades",
      },
    },
    {
      available: true,
      label: {
        en: 'Semi-pro cyclist programme',
        es: 'Programa para ciclistas semiprofesionales',
        ca: 'Programa per a ciclistes semiprofessionals',
      },
      note: {
        en: 'Works with Spanish semi-pro teams',
        es: 'Trabaja con equipos semipro españoles',
        ca: 'Treballa amb equips semipro espanyols',
      },
    },
    {
      available: false,
      label: {
        en: 'Bike fitting',
        es: 'Bike fitting',
        ca: 'Bike fitting',
      },
      note: {
        en: 'Partner referrals available on request',
        es: 'Derivaciones a partners disponibles bajo petición',
        ca: "Derivacions a partners disponibles sota petició",
      },
    },
  ] satisfies AmenityItem[],

  seoTitle: {
    en: 'Espai 8 — Cycling Training Centre Banyoles | VeloTribe',
    es: 'Espai 8 — Centro Entrenamiento Ciclismo Banyoles | VeloTribe',
    ca: 'Espai 8 — Centre Entrenament Ciclisme Banyoles | VeloTribe',
  },

  seoDesc: {
    en: 'Boutique cycling training centre in Banyoles. Functional training, readaptation, sports performance. Small groups, expert coaches, semi-pro teams. VeloTribe certified.',
    es: 'Centro de entrenamiento ciclista boutique en Banyoles. Entrenamiento funcional, readaptación, rendimiento deportivo. Grupos reducidos, entrenadores expertos, equipos semipro. Certificado VeloTribe.',
    ca: "Centre d'entrenament ciclista boutique a Banyoles. Entrenament funcional, readaptació, rendiment esportiu. Grups reduïts, entrenadors experts, equips semipro. Certificat VeloTribe.",
  },
}
