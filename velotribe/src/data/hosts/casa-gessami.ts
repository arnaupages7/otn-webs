// Casa Gessamí — Founding host data
// Shared across EN / ES / CA pages

import type { AmenityItem } from '../../components/HostDetail.astro'

export const casaGessamiBase = {
  slug: 'casa-gessami',
  name: 'Casa Gessamí',
  location: "Camós · Pla de l'Estany, Girona",
  badge: 'founding-host' as const,
  seal: true,
  image: '/providers/casa-gessami.jpg',
  images: ['/providers/casa-gessami.jpg'],
  website: undefined,

  title: {
    en: "Holiday Home for Cyclists in Pla de l'Estany",
    es: "Casa Rural para Ciclistas en Pla de l'Estany",
    ca: "Casa Rural per a Ciclistes al Pla de l'Estany",
  },

  subtitle: {
    en: 'Renovated rural home, 7 min from Lake Banyoles',
    es: 'Casa rural renovada, a 7 min del lago de Banyoles',
    ca: 'Casa rural renovada, a 7 min del llac de Banyoles',
  },

  description: {
    en: "Casa Gessamí is a fully renovated holiday home in the quiet village of Camós, nestled among fields with views towards the Pyrenees. The house has a covered terrace, barbecue area, and a private garden — ideal for unwinding after a long day in the saddle. The interior is comfortable and practical, with a fully equipped self-catering kitchen, spacious living room, and multiple bedrooms to sleep your whole group.",
    es: "Casa Gessamí es una casa de vacaciones totalmente renovada en el tranquilo pueblo de Camós, rodeada de campos con vistas a los Pirineos. La casa dispone de terraza cubierta, zona de barbacoa y jardín privado — ideal para descansar tras una larga jornada sobre la bicicleta. El interior es cómodo y práctico, con cocina equipada de autoservicio, amplio salón y varias habitaciones para alojar a todo el grupo.",
    ca: "Casa Gessamí és una casa de vacances totalment renovada al tranquil poble de Camós, envoltada de camps amb vistes als Pirineus. La casa disposa de terrassa coberta, zona de barbacoa i jardí privat — ideal per descansar després d'una llarga jornada sobre la bicicleta. L'interior és còmode i pràctic, amb cuina equipada d'autoservei, sala d'estar àmplia i diverses habitacions per allotjar tot el grup.",
  },

  spaceDetails: {
    en: "The house accommodates up to 8 guests and is available for short and longer stays. Fully equipped kitchen — no breakfast provided, but you have everything you need to cook. Private parking on site. Booking managed externally.",
    es: "La casa tiene capacidad para 8 huéspedes y está disponible para estancias cortas y largas. Cocina totalmente equipada — sin desayuno incluido, pero con todo lo necesario para cocinar. Aparcamiento privado en la finca. Reservas gestionadas externamente.",
    ca: "La casa té capacitat per a 8 hostes i està disponible per a estades curtes i llargues. Cuina totalment equipada — sense esmorzar inclòs, però amb tot el necessari per cuinar. Aparcament privat a la finca. Reserves gestionades externament.",
  },

  areaSection: {
    en: "Camós sits in the heart of Pla de l'Estany — flat roads, low traffic, and countryside to the horizon framed by the Pyrenees. Lake Banyoles is just 7 minutes away, with its iconic rowing circuit and lakeside cafés. From the house you can roll out directly on quiet roads connecting Banyoles, Porqueres, and the surrounding villages. Girona city is 25 km away — cathedral climbs, cobbled streets — all within reach. For bigger days, the Pyrenees start about an hour north.",
    es: "Camós está en el corazón del Pla de l'Estany — carreteras llanas, poco tráfico y paisaje hasta el horizonte enmarcado por los Pirineos. El lago de Banyoles está a solo 7 minutos, con su icónico circuito de remo y los cafés del lago. Desde la casa puedes salir directamente por tranquilas carreteras que conectan Banyoles, Porqueres y los pueblos cercanos. La ciudad de Girona está a 25 km — subidas a la catedral, calles empedradas — todo al alcance. Para días más exigentes, los Pirineos empiezan a unos 60 minutos al norte.",
    ca: "Camós és al cor del Pla de l'Estany — carreteres planes, poc trànsit i paisatge fins a l'horitzó emmarcat pels Pirineus. El llac de Banyoles és a només 7 minuts, amb el seu icònic circuit de rem i les cafeteries del llac. Des de la casa pots sortir directament per tranquils camins que connecten Banyoles, Porqueres i els pobles de l'entorn. La ciutat de Girona és a 25 km — pujades a la catedral, carrers empedrats — tot a tocar. Per a dies més exigents, els Pirineus comencen a uns 60 minuts cap al nord.",
  },

  amenities: [
    {
      available: true,
      labelKey: 'bike-storage' as const,
      note: {
        en: 'Secure garage for bikes',
        es: 'Garaje seguro para bicis',
        ca: 'Garatge segur per a bicis',
      },
    },
    {
      available: true,
      labelKey: 'bike-wash' as const,
      note: {
        en: 'Garden hose available',
        es: 'Manguera de jardín disponible',
        ca: 'Manguera de jardí disponible',
      },
    },
    {
      available: true,
      label: {
        en: 'Bike pump',
        es: 'Bomba de bici',
        ca: 'Bomba de bici',
      },
      note: {
        en: 'Available on request',
        es: 'Disponible bajo petición',
        ca: 'Disponible sota petició',
      },
    },
    {
      available: false,
      labelKey: 'breakfast' as const,
      note: {
        en: 'Self-catering kitchen available',
        es: 'Cocina de autoservicio disponible',
        ca: "Cuina d'autoservei disponible",
      },
    },
    {
      available: false,
      labelKey: 'outdoor-shower' as const,
    },
    {
      available: false,
      labelKey: 'tools' as const,
      note: {
        en: 'Nearest bike shop: Banyoles, 7 min',
        es: 'Tienda de bici más cercana: Banyoles, 7 min',
        ca: 'Botiga de bici més propera: Banyoles, 7 min',
      },
    },
  ] satisfies AmenityItem[],

  seoTitle: {
    en: 'Casa Gessamí — Cyclist stay near Lake Banyoles | VeloTribe',
    es: 'Casa Gessamí — Alojamiento ciclista cerca del lago de Banyoles | VeloTribe',
    ca: 'Casa Gessamí — Allotjament ciclista prop del llac de Banyoles | VeloTribe',
  },

  seoDesc: {
    en: "Renovated holiday home in Camós, Girona. 7 min from Lake Banyoles. Bike garage, garden hose, self-catering kitchen. Ideal base for cycling Pla de l'Estany and Girona.",
    es: 'Casa de vacaciones renovada en Camós, Girona. A 7 min del lago de Banyoles. Garaje bici, manguera, cocina equipada. Base ideal para pedalear por el Pla de l\'Estany y Girona.',
    ca: 'Casa de vacances renovada a Camós, Girona. A 7 min del llac de Banyoles. Garatge bici, manguera, cuina equipada. Base ideal per pedalar pel Pla de l\'Estany i Girona.',
  },
}
