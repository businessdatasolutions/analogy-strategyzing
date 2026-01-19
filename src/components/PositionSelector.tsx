import type { StrategicPair, Position } from '../lib/strategic-pairs'

interface PositionSelectorProps {
  pair: StrategicPair
  selectedPosition?: Position
  onSelect: (position: Position) => void
}

export default function PositionSelector({
  pair,
  selectedPosition,
  onSelect,
}: PositionSelectorProps) {
  return (
    <div className="space-y-3">
      {/* Option A */}
      <button
        onClick={() => onSelect('A')}
        className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
          selectedPosition === 'A'
            ? 'border-green-500 bg-green-50'
            : 'border-gray-200 hover:border-green-300 hover:bg-green-50/50'
        }`}
      >
        <div className="flex items-start gap-3">
          <div
            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
              selectedPosition === 'A'
                ? 'border-green-500 bg-green-500'
                : 'border-gray-300'
            }`}
          >
            {selectedPosition === 'A' && (
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </div>
          <div className="flex-1">
            <p className="font-semibold text-green-700">{pair.strategy_tags.companyA}</p>
            <p className="text-sm text-gray-600 mt-1">{pair.generic_strategies.companyA}</p>
            <div className="mt-3 p-2 bg-green-50 rounded border border-green-100">
              <p className="text-sm font-medium text-green-800">{pair.companyA}</p>
              <p className="text-xs text-green-700 mt-0.5">{pair.strategies.companyA}</p>
            </div>
          </div>
        </div>
      </button>

      {/* Option B */}
      <button
        onClick={() => onSelect('B')}
        className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
          selectedPosition === 'B'
            ? 'border-purple-500 bg-purple-50'
            : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50/50'
        }`}
      >
        <div className="flex items-start gap-3">
          <div
            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
              selectedPosition === 'B'
                ? 'border-purple-500 bg-purple-500'
                : 'border-gray-300'
            }`}
          >
            {selectedPosition === 'B' && (
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </div>
          <div className="flex-1">
            <p className="font-semibold text-purple-700">{pair.strategy_tags.companyB}</p>
            <p className="text-sm text-gray-600 mt-1">{pair.generic_strategies.companyB}</p>
            <div className="mt-3 p-2 bg-purple-50 rounded border border-purple-100">
              <p className="text-sm font-medium text-purple-800">{pair.companyB}</p>
              <p className="text-xs text-purple-700 mt-0.5">{pair.strategies.companyB}</p>
            </div>
          </div>
        </div>
      </button>

      {/* Between option */}
      <button
        onClick={() => onSelect('between')}
        className={`w-full p-4 rounded-lg border-2 text-center transition-all ${
          selectedPosition === 'between'
            ? 'border-amber-500 bg-amber-50'
            : 'border-amber-200 bg-amber-50/30 hover:border-amber-400 hover:bg-amber-50'
        }`}
      >
        <div className="flex items-center justify-center gap-2">
          <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
          </svg>
          <span className="font-medium text-amber-700">Ik sta hier tussenin</span>
        </div>
        <p className="text-sm text-amber-600 mt-1">De juiste balans hangt af van de context</p>
      </button>
    </div>
  )
}
