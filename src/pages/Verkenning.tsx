import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { getCuratedPairs, getRandomPairByNiveau } from '../lib/curated-subset'
import { getPairId, niveauLabels } from '../lib/strategic-pairs'
import { loadSelections, saveSelection, removeSelection } from '../lib/storage'
import type { StrategicPair, Position } from '../lib/strategic-pairs'
import PairCard from '../components/PairCard'
import PositionSelector from '../components/PositionSelector'

export default function Verkenning() {
  const navigate = useNavigate()
  const [pairs, setPairs] = useState<StrategicPair[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selections, setSelections] = useState<Record<string, Position>>({})

  useEffect(() => {
    const loadData = async () => {
      const curatedPairs = await getCuratedPairs()
      setPairs(curatedPairs)

      const savedSelections = loadSelections()
      const selectionMap: Record<string, Position> = {}
      savedSelections.forEach(s => {
        selectionMap[s.pairId] = s.position
      })
      setSelections(selectionMap)
    }
    loadData()
  }, [])

  const currentPair = pairs[currentIndex]
  const progress = pairs.length > 0 ? ((currentIndex + 1) / pairs.length) * 100 : 0

  const handleSelect = (position: Position) => {
    if (!currentPair) return

    const pairId = `${currentPair.companyA}-${currentPair.companyB}`.toLowerCase().replace(/\s+/g, '-')

    setSelections(prev => ({ ...prev, [pairId]: position }))
    saveSelection(pairId, position)

    if (currentIndex < pairs.length - 1) {
      setCurrentIndex(prev => prev + 1)
    } else {
      navigate('/profiel')
    }
  }

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1)
    }
  }

  const handleSkip = () => {
    if (currentIndex < pairs.length - 1) {
      setCurrentIndex(prev => prev + 1)
    } else {
      navigate('/profiel')
    }
  }

  const handleShuffle = async () => {
    if (!currentPair) return

    const oldPairId = getPairId(currentPair)

    // Get IDs of all currently shown pairs to exclude them
    const excludeIds = pairs.map(p => getPairId(p))

    const newPair = await getRandomPairByNiveau(currentPair.niveau, excludeIds)
    if (newPair) {
      // Remove the old selection from storage and state
      removeSelection(oldPairId)
      setSelections(prev => {
        const updated = { ...prev }
        delete updated[oldPairId]
        return updated
      })

      setPairs(prev => {
        const updated = [...prev]
        updated[currentIndex] = newPair
        return updated
      })
    }
  }

  if (pairs.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Laden...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-4 sm:p-8">
      <div className="max-w-2xl mx-auto">
        <Link to="/" className="text-blue-600 hover:text-blue-800 mb-4 inline-block">
          ← Home
        </Link>

        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Vraag {currentIndex + 1} van {pairs.length}</span>
            <span>{Math.round(progress)}% voltooid</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Current pair card */}
        {currentPair && (
          <>
            <PairCard pair={currentPair} />
            <PositionSelector
              pair={currentPair}
              selectedPosition={selections[getPairId(currentPair)]}
              onSelect={handleSelect}
            />

            {/* Shuffle button */}
            <div className="mt-4 text-center">
              <button
                onClick={handleShuffle}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Ander paar ({niveauLabels[currentPair.niveau]})
              </button>
            </div>
          </>
        )}

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className="px-4 py-2 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ← Vorige
          </button>
          <button
            onClick={handleSkip}
            className="px-4 py-2 text-gray-500 hover:text-gray-700"
          >
            Overslaan →
          </button>
        </div>
      </div>
    </div>
  )
}
