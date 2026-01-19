import { Link } from 'react-router-dom'
import { clearAll } from '../lib/storage'

export default function Home() {
  const handleReset = () => {
    if (window.confirm('Weet je zeker dat je alle opgeslagen gegevens wilt wissen?')) {
      clearAll()
      window.location.reload()
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="max-w-2xl text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Strategische Analogie Builder
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Ontdek jouw strategische voorkeuren door bedrijfsparen te vergelijken
          en bouw een onderbouwde analogie voor jouw organisatie.
        </p>
        <div className="space-y-4">
          <Link
            to="/verkenning"
            className="inline-block w-full sm:w-auto px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            Start Verkenning
          </Link>
          <p className="text-sm text-gray-500">
            Beantwoord 4 vragen om je strategisch profiel te ontdekken
          </p>
        </div>
        <button
          onClick={handleReset}
          className="mt-8 text-sm text-gray-400 hover:text-red-500 transition-colors"
        >
          Reset alle gegevens
        </button>
      </div>
    </div>
  )
}
