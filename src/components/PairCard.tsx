import type { StrategicPair } from '../lib/strategic-pairs'

interface PairCardProps {
  pair: StrategicPair
}

export default function PairCard({ pair }: PairCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
      {/* Company names */}
      <div className="flex justify-between items-center mb-4">
        <span className="text-lg font-bold text-green-700">{pair.companyA}</span>
        <span className="text-gray-400">vs</span>
        <span className="text-lg font-bold text-purple-700">{pair.companyB}</span>
      </div>

      {/* Strategic contrast subtitle */}
      <p className="text-sm text-gray-500 mb-4 text-center">
        {pair.strategic_contrast}
      </p>

      {/* Dilemma question */}
      <p className="text-lg text-gray-800 text-center leading-relaxed">
        {pair.dilemma_question}
      </p>

      {/* Niveau badge */}
      <div className="mt-4 flex justify-center">
        <span className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full">
          Niveau {pair.niveau}
        </span>
      </div>
    </div>
  )
}
