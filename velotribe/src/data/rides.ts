// VeloTribe — Sortides socials
// Per afegir una nova sortida: copia un bloc existent i omple els camps.

export type Difficulty = 'easy' | 'medium' | 'hard'

export interface Ride {
  id: string
  date: string           // ISO: "2026-06-14"
  time: string           // "08:00"
  title: { en: string; es: string; ca: string; fr: string }
  route: string          // ex: "Girona · Rocacorba · Girona"
  distance: number       // km
  elevation: number      // m
  difficulty: Difficulty
  spotsTotal: number
  spotsLeft: number
  meetPoint: string      // lloc de trobada
}

export const rides: Ride[] = [
  {
    id: 'rocacorba-june',
    date: '2026-06-14',
    time: '08:00',
    title: {
      en: 'Rocacorba Classic',
      es: 'Clásica del Rocacorba',
      ca: 'Clàssica del Rocacorba',
      fr: 'Classique du Rocacorba',
    },
    route: 'Girona · Rocacorba · Girona',
    distance: 85,
    elevation: 1400,
    difficulty: 'hard',
    spotsTotal: 12,
    spotsLeft: 4,
    meetPoint: 'Plaça del Vi, Girona',
  },
  {
    id: 'banyoles-gravel',
    date: '2026-06-21',
    time: '07:30',
    title: {
      en: 'Banyoles Lake Gravel',
      es: 'Gravel Lago de Banyoles',
      ca: 'Gravel Llac de Banyoles',
      fr: 'Gravel Lac de Banyoles',
    },
    route: 'Banyoles · Serinyà · Besalú · Banyoles',
    distance: 60,
    elevation: 650,
    difficulty: 'medium',
    spotsTotal: 10,
    spotsLeft: 6,
    meetPoint: 'Espai 8, Banyoles',
  },
  {
    id: 'costa-brava-july',
    date: '2026-07-05',
    time: '07:00',
    title: {
      en: 'Costa Brava Dawn Ride',
      es: 'Amanecer en la Costa Brava',
      ca: 'Sortida a l\'alba Costa Brava',
      fr: 'Aube sur la Costa Brava',
    },
    route: 'Girona · Begur · Palafrugell · Girona',
    distance: 110,
    elevation: 1200,
    difficulty: 'hard',
    spotsTotal: 10,
    spotsLeft: 2,
    meetPoint: 'Plaça del Vi, Girona',
  },
]
