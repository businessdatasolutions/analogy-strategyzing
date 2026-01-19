import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { loadStrategicPairs, type StrategicPair } from '../lib/strategic-pairs'
import { loadWorksheet, saveWorksheet, loadUserContext, saveUserContext, loadSelections, type Worksheet } from '../lib/storage'
import type { Position } from '../lib/strategic-pairs'

export default function Verdieping() {
  const { id } = useParams<{ id: string }>()
  const [pair, setPair] = useState<StrategicPair | null>(null)
  const [worksheet, setWorksheet] = useState<Worksheet>({
    pairId: id || '',
    targetDescription: '',
    positivePremises: [],
    negativePremises: [],
    causalTheory: '',
    evaluation: '',
  })
  const [newPositive, setNewPositive] = useState('')
  const [newNegative, setNewNegative] = useState<{ text: string; relevance: 'low' | 'medium' | 'high' }>({ text: '', relevance: 'medium' })
  const [userContext, setUserContext] = useState('')
  const [selectedPosition, setSelectedPosition] = useState<Position | null>(null)

  useEffect(() => {
    const loadData = async () => {
      const pairs = await loadStrategicPairs()
      const found = pairs.find(p => {
        const pairId = `${p.companyA}-${p.companyB}`.toLowerCase().replace(/\s+/g, '-')
        return pairId === id
      })
      setPair(found || null)

      // Load shared user context
      const savedContext = loadUserContext()
      setUserContext(savedContext)

      // Load user's selection for this pair
      if (id) {
        const selections = loadSelections()
        const selection = selections.find(s => s.pairId === id)
        if (selection) {
          setSelectedPosition(selection.position)
        }

        const saved = loadWorksheet(id)
        if (saved) {
          setWorksheet(saved)
        }
      }
    }
    loadData()
  }, [id])

  const handleSave = () => {
    saveWorksheet(worksheet)
  }

  const addPositivePremise = () => {
    if (newPositive.trim()) {
      const updated = {
        ...worksheet,
        positivePremises: [...worksheet.positivePremises, newPositive.trim()],
      }
      setWorksheet(updated)
      saveWorksheet(updated)
      setNewPositive('')
    }
  }

  const removePositivePremise = (index: number) => {
    const updated = {
      ...worksheet,
      positivePremises: worksheet.positivePremises.filter((_, i) => i !== index),
    }
    setWorksheet(updated)
    saveWorksheet(updated)
  }

  const addNegativePremise = () => {
    if (newNegative.text.trim()) {
      const updated = {
        ...worksheet,
        negativePremises: [
          ...worksheet.negativePremises,
          { text: newNegative.text.trim(), relevance: newNegative.relevance },
        ],
      }
      setWorksheet(updated)
      saveWorksheet(updated)
      setNewNegative({ text: '', relevance: 'medium' })
    }
  }

  const removeNegativePremise = (index: number) => {
    const updated = {
      ...worksheet,
      negativePremises: worksheet.negativePremises.filter((_, i) => i !== index),
    }
    setWorksheet(updated)
    saveWorksheet(updated)
  }

  const exportMarkdown = () => {
    if (!pair) return

    const getSourceCaseText = () => {
      if (!selectedPosition) return '(geen keuze gemaakt)'
      if (selectedPosition === 'between') return 'Tussenin - combinatie van beide strategieën'
      const company = selectedPosition === 'A' ? pair.companyA : pair.companyB
      const tag = selectedPosition === 'A' ? pair.strategy_tags.companyA : pair.strategy_tags.companyB
      const strategy = selectedPosition === 'A' ? pair.generic_strategies.companyA : pair.generic_strategies.companyB
      return `${company} (${tag})\n${strategy}`
    }

    const md = `# Analogie Analyse: ${pair.companyA} vs ${pair.companyB}

## Strategisch Contrast
${pair.strategic_contrast}

## Gekozen Bron-case
${getSourceCaseText()}

## Jouw Situatie
${userContext || '(niet ingevuld)'}

## Positieve Premissen (Overeenkomsten)
${worksheet.positivePremises.length > 0
  ? worksheet.positivePremises.map(p => `- ${p}`).join('\n')
  : '(geen toegevoegd)'}

## Negatieve Premissen (Verschillen)
${worksheet.negativePremises.length > 0
  ? worksheet.negativePremises.map(p => `- ${p.text} (Relevantie: ${p.relevance})`).join('\n')
  : '(geen toegevoegd)'}

## Causaal Mechanisme
${worksheet.causalTheory || '(niet ingevuld)'}

## Evaluatie
${worksheet.evaluation || '(niet ingevuld)'}

---
*Gegenereerd met Strategische Analogie Builder*
`

    const blob = new Blob([md], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `analogie-${id}.md`
    a.click()
    URL.revokeObjectURL(url)
  }

  if (!pair) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Laden...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-4 sm:p-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex gap-4 mb-4">
          <Link to="/" className="text-blue-600 hover:text-blue-800">
            ← Home
          </Link>
          <Link to="/profiel" className="text-blue-600 hover:text-blue-800">
            ← Profiel
          </Link>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Verdieping: {pair.companyA} vs {pair.companyB}
        </h1>
        <p className="text-gray-600 mb-4">{pair.strategic_contrast}</p>

        {/* Selected source case */}
        {selectedPosition && (
          <div className={`mb-8 p-4 rounded-lg border-2 ${
            selectedPosition === 'A'
              ? 'bg-green-50 border-green-300'
              : selectedPosition === 'B'
              ? 'bg-purple-50 border-purple-300'
              : 'bg-gray-50 border-gray-300'
          }`}>
            <p className="text-sm font-medium text-gray-500 mb-1">Jouw gekozen bron-case:</p>
            {selectedPosition === 'between' ? (
              <p className="text-gray-700 italic">Tussenin - je combineert elementen van beide strategieën</p>
            ) : (
              <>
                <p className={`text-lg font-semibold ${
                  selectedPosition === 'A' ? 'text-green-800' : 'text-purple-800'
                }`}>
                  {selectedPosition === 'A' ? pair.companyA : pair.companyB}
                  <span className="ml-2 text-sm font-normal">
                    ({selectedPosition === 'A' ? pair.strategy_tags.companyA : pair.strategy_tags.companyB})
                  </span>
                </p>
                <p className="text-gray-700 mt-2">
                  {selectedPosition === 'A' ? pair.generic_strategies.companyA : pair.generic_strategies.companyB}
                </p>
              </>
            )}
          </div>
        )}

        {/* Section 1: Target description (shared across all worksheets) */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">
            1. Jouw Situatie
          </h2>
          <p className="text-sm text-gray-600 mb-2">
            Beschrijf jouw bedrijf of situatie waarvoor je deze analogie wilt toepassen.
            <span className="text-blue-600 ml-1">(Wordt gedeeld met alle verdiepingen)</span>
          </p>
          <textarea
            value={userContext}
            onChange={(e) => {
              setUserContext(e.target.value)
              saveUserContext(e.target.value)
            }}
            className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Beschrijf hier je bedrijf, markt, en de strategische uitdaging..."
          />
        </section>

        {/* Section 2: Positive premises */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">
            2. Positieve Premissen (Overeenkomsten)
          </h2>
          <p className="text-sm text-gray-600 mb-2">
            Welke aspecten van de bron-case zijn vergelijkbaar met jouw situatie?
          </p>
          <div className="space-y-2 mb-3">
            {worksheet.positivePremises.map((premise, index) => (
              <div
                key={index}
                className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-lg p-3"
              >
                <span className="flex-1">{premise}</span>
                <button
                  onClick={() => removePositivePremise(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={newPositive}
              onChange={(e) => setNewPositive(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addPositivePremise()}
              className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Voeg een overeenkomst toe..."
            />
            <button
              onClick={addPositivePremise}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              +
            </button>
          </div>
        </section>

        {/* Section 3: Negative premises */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">
            3. Negatieve Premissen (Verschillen)
          </h2>
          <p className="text-sm text-gray-600 mb-2">
            Welke aspecten verschillen? Geef aan hoe relevant dit verschil is.
          </p>
          <div className="space-y-2 mb-3">
            {worksheet.negativePremises.map((premise, index) => (
              <div
                key={index}
                className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-lg p-3"
              >
                <span className="flex-1">{premise.text}</span>
                <span className={`px-2 py-1 text-xs rounded ${
                  premise.relevance === 'high'
                    ? 'bg-red-200 text-red-800'
                    : premise.relevance === 'medium'
                    ? 'bg-yellow-200 text-yellow-800'
                    : 'bg-gray-200 text-gray-800'
                }`}>
                  {premise.relevance === 'high' ? 'Hoog' : premise.relevance === 'medium' ? 'Midden' : 'Laag'}
                </span>
                <button
                  onClick={() => removeNegativePremise(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={newNegative.text}
              onChange={(e) => setNewNegative({ ...newNegative, text: e.target.value })}
              onKeyDown={(e) => e.key === 'Enter' && addNegativePremise()}
              className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Voeg een verschil toe..."
            />
            <select
              value={newNegative.relevance}
              onChange={(e) => setNewNegative({ ...newNegative, relevance: e.target.value as 'low' | 'medium' | 'high' })}
              className="p-2 border border-gray-300 rounded-lg"
            >
              <option value="low">Laag</option>
              <option value="medium">Midden</option>
              <option value="high">Hoog</option>
            </select>
            <button
              onClick={addNegativePremise}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              +
            </button>
          </div>
        </section>

        {/* Section 4: Causal theory */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">
            4. Causaal Mechanisme
          </h2>
          <p className="text-sm text-gray-600 mb-2">
            Waarom was de bron-strategie succesvol? Welk mechanisme lag eraan ten grondslag?
          </p>
          <textarea
            value={worksheet.causalTheory}
            onChange={(e) => {
              const updated = { ...worksheet, causalTheory: e.target.value }
              setWorksheet(updated)
              saveWorksheet(updated)
            }}
            className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Beschrijf het causale mechanisme dat de strategie succesvol maakte..."
          />
        </section>

        {/* Section 5: Evaluation */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">
            5. Evaluatie
          </h2>
          <p className="text-sm text-gray-600 mb-2">
            Hoe sterk is deze analogie voor jouw situatie? Wat is je conclusie?
          </p>
          <textarea
            value={worksheet.evaluation}
            onChange={(e) => {
              const updated = { ...worksheet, evaluation: e.target.value }
              setWorksheet(updated)
              saveWorksheet(updated)
            }}
            className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Evalueer de sterkte van de analogie en trek je conclusie..."
          />
        </section>

        {/* Actions */}
        <div className="flex gap-4">
          <button
            onClick={handleSave}
            className="flex-1 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Opslaan
          </button>
          <button
            onClick={exportMarkdown}
            className="flex-1 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            Exporteer als Markdown
          </button>
        </div>
      </div>
    </div>
  )
}
