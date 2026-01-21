import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { loadSelections } from '../lib/storage'
import { loadStrategicPairs, niveauLabels, type StrategicPair, type UserSelection } from '../lib/strategic-pairs'

export default function Profiel() {
  const [selections, setSelections] = useState<UserSelection[]>([])
  const [pairs, setPairs] = useState<StrategicPair[]>([])
  const [showAllPairs, setShowAllPairs] = useState(false)

  useEffect(() => {
    const loadData = async () => {
      const allPairs = await loadStrategicPairs()
      setPairs(allPairs)
      setSelections(loadSelections())
    }
    loadData()
  }, [])

  const getPairById = (pairId: string): StrategicPair | undefined => {
    return pairs.find(p => {
      const id = `${p.companyA}-${p.companyB}`.toLowerCase().replace(/\s+/g, '-')
      return id === pairId
    })
  }

  const selectionsByNiveau = selections.reduce((acc, sel) => {
    const pair = getPairById(sel.pairId)
    if (pair) {
      const niveau = pair.niveau
      if (!acc[niveau]) acc[niveau] = []
      acc[niveau].push({ selection: sel, pair })
    }
    return acc
  }, {} as Record<number, { selection: UserSelection; pair: StrategicPair }[]>)

  const getPositionLabel = (selection: UserSelection, pair: StrategicPair): string => {
    if (selection.position === 'A') return pair.strategy_tags.companyA
    if (selection.position === 'B') return pair.strategy_tags.companyB
    return 'Tussenin'
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
      <div className="max-w-3xl mx-auto">
        <Link to="/" className="text-blue-600 hover:text-blue-800 mb-4 inline-block">
          ← Home
        </Link>

        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Jouw Strategisch Profiel
        </h1>

        {selections.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">
              Je hebt nog geen keuzes gemaakt.
            </p>
            <Link
              to="/verkenning"
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Start Verkenning
            </Link>
          </div>
        ) : (
          <>
            {/* Selections by niveau */}
            {Object.entries(selectionsByNiveau)
              .sort(([a], [b]) => Number(a) - Number(b))
              .map(([niveau, items]) => (
                <div key={niveau} className="mb-8">
                  <h2 className="text-lg font-semibold text-gray-700 mb-3">
                    Niveau {niveau}: {niveauLabels[Number(niveau)]}
                  </h2>
                  <div className="space-y-3">
                    {items.map(({ selection, pair }) => (
                      <div
                        key={selection.pairId}
                        className="bg-white border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium text-gray-900">
                              {pair.companyA} vs {pair.companyB}
                            </p>
                            <p className="text-sm text-gray-600">
                              {pair.strategic_contrast}
                            </p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            selection.position === 'A'
                              ? 'bg-green-100 text-green-800'
                              : selection.position === 'B'
                              ? 'bg-purple-100 text-purple-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {getPositionLabel(selection, pair)}
                          </span>
                        </div>
                        <Link
                          to={`/verdieping/${selection.pairId}`}
                          className="inline-block mt-3 text-sm text-blue-600 hover:text-blue-800"
                        >
                          Verdieping starten →
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

            {/* Explore more button */}
            {!showAllPairs && (
              <button
                onClick={() => setShowAllPairs(true)}
                className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-400 hover:text-blue-600 transition-colors"
              >
                Ontdek meer paren ({pairs.length - selections.length} beschikbaar)
              </button>
            )}

            {/* Actions */}
            <div className="flex gap-4 mt-8">
              <Link
                to="/verkenning"
                className="flex-1 py-3 text-center border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Terug naar Verkenning
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
