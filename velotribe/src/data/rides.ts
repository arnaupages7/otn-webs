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
  comingSoon?: boolean
}

export const rides: Ride[] = [
  {
    id: 'july-4-ride',
    date: '2026-07-04',
    time: '08:00',
    title: {
      en: 'Coming Soon',
      es: 'Coming Soon',
      ca: 'Coming Soon',
      fr: 'Coming Soon',
    },
    route: '',
    distance: 0,
    elevation: 0,
    difficulty: 'medium',
    spotsTotal: 12,
    spotsLeft: 12,
    comingSoon: true,
    meetPoint: 'Girona',
  },
]
