// Casa Maui — Founding host data
// Shared across EN / ES / CA / FR pages

import type { AmenityItem } from '../../components/HostDetail.astro'

export const mauiCasaBase = {
  slug: 'maui-casa',
  name: 'Casa Maui',
  location: 'Banyoles · Pla de l\'Estany, Girona',
  badge: 'founding-host' as const,
  seal: true,
  image: '/hosts/maui-casa/1.jpg',
  images: Array.from({ length: 6 }, (_, i) => `/hosts/maui-casa/${i + 1}.jpg`),
  website: 'https://www.mauicasa.com',

  title: {
    en: 'Cyclist House in the Heart of Banyoles',
    es: 'Casa para Ciclistas en el Centro de Banyoles',
    ca: 'Casa per a Ciclistes al Centre de Banyoles',
    fr: 'Maison Cycliste au Cœur de Banyoles',
  },

  subtitle: {
    en: 'Renovated family house, 1 min from Lake Banyoles',
    es: 'Casa familiar reformada, a 1 min del lago de Banyoles',
    ca: 'Casa familiar reformada, a 1 min del llac de Banyoles',
    fr: 'Maison familiale rénovée, à 1 min du lac de Banyoles',
  },

  description: {
    en: 'Casa Maui is a fully renovated family house in the centre of Banyoles, one minute on foot from the iconic Olympic lake. The house combines original architectural character — stone base, timber ceilings, parquet floors — with modern, well-equipped rooms designed with the cyclist in mind. A saltwater pool and garden provide the ideal recovery space after a long day in the saddle, and the generous cyclist breakfast, made with local produce, sets you up perfectly for whatever the road throws at you.',
    es: 'Casa Maui es una casa familiar totalmente reformada en el centro de Banyoles, a un minuto a pie del icónico lago Olímpico. La casa combina carácter arquitectónico original — base de piedra, techos de madera, suelos de parqué — con habitaciones modernas y bien equipadas pensadas para el ciclista. Una piscina de agua salada y jardín ofrecen el espacio de recuperación ideal tras una larga jornada en la bici, y el generoso desayuno ciclista, elaborado con productos locales, te prepara a la perfección para lo que la carretera te depare.',
    ca: 'Casa Maui és una casa familiar totalment reformada al centre de Banyoles, a un minut a peu de l\'icònic llac Olímpic. La casa combina caràcter arquitectònic original — base de pedra, sostres de fusta, terres de parquet — amb habitacions modernes i ben equipades pensades per al ciclista. Una piscina d\'aigua salada i jardí ofereixen l\'espai de recuperació ideal després d\'una llarga jornada a la bicicleta, i el generós esmorzar ciclista, elaborat amb productes locals, et prepara a la perfecció per al que la carretera et depari.',
    fr: 'Casa Maui est une maison familiale entièrement rénovée au cœur de Banyoles, à une minute à pied de l\'emblématique lac Olympique. La maison allie caractère architectural original — base en pierre, plafonds en bois, parquets — à des chambres modernes et bien équipées pensées pour le cycliste. Une piscine d\'eau salée et un jardin offrent l\'espace de récupération idéal après une longue journée en selle, et le généreux petit-déjeuner cycliste, préparé avec des produits locaux, vous prépare parfaitement à ce que la route vous réserve.',
  },

  spaceDetails: {
    en: 'The house accommodates up to 8 guests across several private rooms, each with its own character and en-suite or private bathroom. The large dining room with its parquet floor and original artwork seats the whole group — ideal for group meals and pre-ride route planning. The covered terrace with wicker furniture is perfect for morning coffee before heading out. Full cyclist breakfast included. Booking managed directly via the website.',
    es: 'La casa tiene capacidad para 8 huéspedes en varias habitaciones privadas, cada una con su propio carácter y baño privado o en suite. El amplio comedor con suelo de parqué y arte original da cabida a todo el grupo — ideal para comidas grupales y planificar rutas antes de salir. La terraza cubierta con muebles de mimbre es perfecta para el café de la mañana antes de arrancar. Desayuno ciclista completo incluido. Reservas gestionadas directamente a través de la web.',
    ca: 'La casa té capacitat per a 8 hostes en diverses habitacions privades, cadascuna amb el seu propi caràcter i bany privat o en suite. El gran menjador amb terra de parquet i obra original acull tot el grup — ideal per a àpats grupals i planificar rutes abans de sortir. La terrassa coberta amb mobles de vímet és perfecta per al cafè del matí abans d\'arrencar. Esmorzar ciclista complet inclòs. Reserves gestionades directament a través de la web.',
    fr: 'La maison accueille jusqu\'à 8 hôtes dans plusieurs chambres privées, chacune avec son propre caractère et salle de bain privative ou en suite. La grande salle à manger avec son parquet et ses œuvres d\'art originales accueille tout le groupe — idéale pour les repas collectifs et la planification des itinéraires avant le départ. La terrasse couverte avec mobilier en rotin est parfaite pour le café du matin avant de partir. Petit-déjeuner cycliste complet inclus. Réservations gérées directement via le site web.',
  },

  areaSection: {
    en: "Banyoles is one of Girona's best-kept cycling secrets. The town sits in the Pla de l'Estany, a flat, low-traffic plateau surrounded by countryside with the Pyrenees rising to the north. The Olympic lake — venue for the 1992 Barcelona Games rowing events — is one minute from the house: the perfect warm-up lap before rolling out. Roads from Banyoles connect directly to Girona city (25 min), the Garrotxa volcanic zone (30 min), and the first Pyrenean cols (60 min). The iconic Rocacorba climb starts just 15 minutes away. A world-class training base that most visiting cyclists haven't discovered yet.",
    es: "Banyoles es uno de los secretos ciclistas mejor guardados de Girona. La ciudad se asienta en el Pla de l'Estany, una meseta llana y de poco tráfico rodeada de campos con los Pirineos al norte. El lago Olímpico — sede de las pruebas de remo de los Juegos de Barcelona 1992 — está a un minuto de la casa: la vuelta perfecta de calentamiento antes de salir a rodar. Las carreteras desde Banyoles conectan directamente con la ciudad de Girona (25 min), la zona volcánica de la Garrotxa (30 min) y los primeros puertos pirenaicos (60 min). La icónica subida a Rocacorba empieza a solo 15 minutos. Una base de entrenamiento de primer nivel que la mayoría de ciclistas visitantes aún no ha descubierto.",
    ca: "Banyoles és un dels secrets ciclistes millor guardats de Girona. La ciutat s'assenta al Pla de l'Estany, una plana de poc trànsit envoltada de camps amb els Pirineus al nord. El llac Olímpic — seu de les proves de rem dels Jocs de Barcelona 1992 — és a un minut de la casa: la volta perfecta d'escalfament abans de sortir a rodar. Les carreteres des de Banyoles connecten directament amb la ciutat de Girona (25 min), la zona volcànica de la Garrotxa (30 min) i els primers ports pirinencs (60 min). L'icònica pujada a Rocacorba comença a tan sols 15 minuts. Una base d'entrenament de primer nivell que la majoria de ciclistes visitants encara no ha descobert.",
    fr: "Banyoles est l'un des secrets cyclistes les mieux gardés de Gérone. La ville est située dans le Pla de l'Estany, un plateau plat et peu fréquenté entouré de campagne avec les Pyrénées au nord. Le lac Olympique — site des épreuves d'aviron des Jeux de Barcelone 1992 — est à une minute de la maison : le tour d'échauffement parfait avant de partir rouler. Les routes depuis Banyoles rejoignent directement la ville de Gérone (25 min), la zone volcanique de la Garrotxa (30 min) et les premiers cols pyrénéens (60 min). La mythique ascension de Rocacorba commence à seulement 15 minutes. Une base d'entraînement de premier ordre que la plupart des cyclistes visiteurs n'ont pas encore découverte.",
  },

  amenities: [
    {
      available: true,
      labelKey: 'bike-storage' as const,
      note: {
        en: 'Secure indoor storage for all bikes',
        es: 'Almacenaje interior seguro para todas las bicis',
        ca: 'Emmagatzematge interior segur per a totes les bicis',
        fr: 'Stockage intérieur sécurisé pour tous les vélos',
      },
    },
    {
      available: true,
      labelKey: 'breakfast' as const,
      note: {
        en: 'Generous cyclist breakfast with local produce',
        es: 'Generoso desayuno ciclista con productos locales',
        ca: 'Generós esmorzar ciclista amb productes locals',
        fr: 'Copieux petit-déjeuner cycliste avec produits locaux',
      },
    },
    {
      available: true,
      label: {
        en: 'Saltwater pool',
        es: 'Piscina de agua salada',
        ca: 'Piscina d\'aigua salada',
        fr: 'Piscine d\'eau salée',
      },
      note: {
        en: 'Available all season',
        es: 'Disponible toda la temporada',
        ca: 'Disponible tota la temporada',
        fr: 'Disponible toute la saison',
      },
    },
    {
      available: true,
      labelKey: 'laundry' as const,
      note: {
        en: 'Washing machine on site',
        es: 'Lavadora disponible en la casa',
        ca: 'Rentadora disponible a la casa',
        fr: 'Machine à laver sur place',
      },
    },
    {
      available: true,
      labelKey: 'bike-wash' as const,
      note: {
        en: 'Garden area with hose',
        es: 'Zona de jardín con manguera',
        ca: 'Zona de jardí amb manguera',
        fr: 'Zone jardin avec tuyau d\'arrosage',
      },
    },
    {
      available: true,
      label: {
        en: 'E-bike charging',
        es: 'Carga de e-bike',
        ca: 'Càrrega d\'e-bike',
        fr: 'Recharge vélo électrique',
      },
      note: {
        en: 'Available on request',
        es: 'Disponible bajo petición',
        ca: 'Disponible sota petició',
        fr: 'Disponible sur demande',
      },
    },
    {
      available: false,
      labelKey: 'tools' as const,
      note: {
        en: 'Nearest bike shop: Banyoles centre, 5 min',
        es: 'Tienda de bici más cercana: centro de Banyoles, 5 min',
        ca: 'Botiga de bici més propera: centre de Banyoles, 5 min',
        fr: 'Boutique vélo la plus proche : centre de Banyoles, 5 min',
      },
    },
  ] satisfies AmenityItem[],

  seoTitle: {
    en: 'Casa Maui — Cyclist Stay in Banyoles, Girona | VeloTribe',
    es: 'Casa Maui — Alojamiento Ciclista en Banyoles, Girona | VeloTribe',
    ca: 'Casa Maui — Allotjament Ciclista a Banyoles, Girona | VeloTribe',
    fr: 'Casa Maui — Hébergement Cycliste à Banyoles, Gérone | VeloTribe',
  },

  seoDesc: {
    en: 'Renovated family house in Banyoles, 1 min from the Olympic lake. Cyclist breakfast, saltwater pool, secure bike storage. Ideal base for cycling Pla de l\'Estany, Rocacorba and Girona.',
    es: 'Casa familiar reformada en Banyoles, a 1 min del lago Olímpico. Desayuno ciclista, piscina de agua salada, almacenaje seguro para bicis. Base ideal para pedalear por el Pla de l\'Estany, Rocacorba y Girona.',
    ca: 'Casa familiar reformada a Banyoles, a 1 min del llac Olímpic. Esmorzar ciclista, piscina d\'aigua salada, emmagatzematge segur per a bicis. Base ideal per pedalar pel Pla de l\'Estany, Rocacorba i Girona.',
    fr: 'Maison familiale rénovée à Banyoles, à 1 min du lac Olympique. Petit-déjeuner cycliste, piscine d\'eau salée, stockage vélos sécurisé. Base idéale pour rouler dans le Pla de l\'Estany, Rocacorba et Gérone.',
  },
}
