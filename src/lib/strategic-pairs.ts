export interface StrategicPair {
  companyA: string
  companyB: string
  strategic_contrast: string
  niveau: number
  dimensie_nummer: number
  distinguishing_element: string
  dilemma_question: string
  strategies: {
    companyA: string
    companyB: string
  }
  generic_strategies: {
    companyA: string
    companyB: string
  }
  strategy_tags: {
    companyA: string
    companyB: string
  }
}

export interface StrategicPairsData {
  strategic_pairs: StrategicPair[]
}

export type Position = 'A' | 'B' | 'between'

export interface UserSelection {
  pairId: string
  position: Position
  timestamp: number
}

let cachedPairs: StrategicPair[] | null = null

export async function loadStrategicPairs(): Promise<StrategicPair[]> {
  if (cachedPairs) return cachedPairs

  const response = await fetch(import.meta.env.BASE_URL + 'data/strategic-pairs.json')
  const data: StrategicPairsData = await response.json()
  cachedPairs = data.strategic_pairs
  return cachedPairs
}

export function getPairId(pair: StrategicPair): string {
  return `${pair.companyA}-${pair.companyB}`.toLowerCase().replace(/\s+/g, '-')
}

export const niveauLabels: Record<number, string> = {
  1: 'Scope & Focus',
  2: 'Business Model',
  3: 'Value Chain & AI',
  4: 'Organization & Culture'
}
