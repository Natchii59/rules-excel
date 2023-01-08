export interface CardModel {
  id: string
  season: number
  slug: string
  scarcity: {
    name: string
  }
  artist: {
    displayName: string
  }
}

export interface Card {
  id: string
  serialNumber: number
  cardModel: {
    id: string
  }
}

export interface SortedCards {
  [key: string]: {
    cardModel: CardModel
    serials: number[]
  }[]
}

export enum ScarcityColor {
  Common = 'bg-violet-700',
  Platinium = 'bg-gray-500',
  Halloween = 'bg-orange-700'
}
