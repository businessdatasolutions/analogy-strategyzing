import { loadStrategicPairs, type StrategicPair } from './strategic-pairs'

// Select 4 random pairs (1 per niveau) for masterclass
// Each session gets a random selection from all available pairs per niveau

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export async function getCuratedPairs(): Promise<StrategicPair[]> {
  const allPairs = await loadStrategicPairs()

  // Group pairs by niveau
  const pairsByNiveau: Record<number, StrategicPair[]> = {}
  for (const pair of allPairs) {
    if (!pairsByNiveau[pair.niveau]) {
      pairsByNiveau[pair.niveau] = []
    }
    pairsByNiveau[pair.niveau].push(pair)
  }

  // Select 1 random pair from each niveau (1-4)
  const curatedPairs: StrategicPair[] = []
  for (let niveau = 1; niveau <= 4; niveau++) {
    const pairsAtNiveau = pairsByNiveau[niveau] || []
    if (pairsAtNiveau.length > 0) {
      const shuffled = shuffleArray(pairsAtNiveau)
      curatedPairs.push(shuffled[0])
    }
  }

  return curatedPairs
}

