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
    <div className="min-h-screen p-8">
      <div className="max-w-3xl mx-auto">
        {/* Hero section */}
        <div className="text-center mb-12">
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
        </div>

        {/* Why, How, What section */}
        <div className="bg-gray-50 rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Waarom Analogieën?</h2>

          <div className="space-y-6">
            {/* WHY */}
            <div>
              <h3 className="text-lg font-semibold text-blue-700 mb-2">Waarom</h3>
              <p className="text-gray-700">
                Executives gebruiken vaak analogieën bij strategische beslissingen—"wij zijn de Uber van X"—maar
                doen dit meestal ongestructureerd. Globale analogieën zonder decompositie leiden tot zwakke
                argumenten en gemiste inzichten. De kracht van analogisch redeneren ligt in het expliciet maken
                van de onderliggende causale mechanismen: <em>waarom</em> werkte de strategie bij het bronbedrijf,
                en gelden dezelfde voorwaarden voor jouw organisatie?
              </p>
            </div>

            {/* HOW */}
            <div>
              <h3 className="text-lg font-semibold text-blue-700 mb-2">Hoe</h3>
              <p className="text-gray-700">
                Deze tool begeleidt je door een gestructureerd proces van analogisch redeneren:
              </p>
              <ol className="list-decimal list-inside mt-2 space-y-1 text-gray-700 ml-4">
                <li><strong>Verken strategische dilemma's</strong> via contrasterende bedrijfsparen</li>
                <li><strong>Kies je positie</strong>—welke strategie past bij jouw situatie?</li>
                <li><strong>Identificeer positieve premissen</strong>—waar lijkt jouw organisatie op de bron?</li>
                <li><strong>Benoem negatieve premissen</strong>—waar verschilt jouw situatie kritisch?</li>
                <li><strong>Articuleer het causale mechanisme</strong>—waarom werkte de bronstrategie?</li>
                <li><strong>Evalueer de sterkte</strong> van je analogie voor strategische besluitvorming</li>
              </ol>
            </div>

            {/* WHAT */}
            <div>
              <h3 className="text-lg font-semibold text-blue-700 mb-2">Wat</h3>
              <p className="text-gray-700">
                Je werkt met 26 zorgvuldig samengestelde strategische paren—van Figma vs. Adobe tot Tesla vs. Toyota—die
                elk een fundamenteel strategisch dilemma representeren. Door je positie te kiezen en de analogie
                systematisch te ontleden, ontwikkel je een onderbouwde, bedrijfsspecifieke theorie voor jouw strategie.
              </p>
            </div>
          </div>

          {/* Reference */}
          <div className="mt-6 pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              Gebaseerd op: Carroll, G. R., & Sørensen, J. B. (2024). Strategy theory using analogy: Rationale, tools and examples.{' '}
              <em>Strategy Science, 9</em>(4), 483–498.{' '}
              <a
                href="https://doi.org/10.1287/stsc.2024.0174"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                https://doi.org/10.1287/stsc.2024.0174
              </a>
            </p>
          </div>
        </div>

        {/* Reset button */}
        <div className="text-center">
          <button
            onClick={handleReset}
            className="text-sm text-gray-400 hover:text-red-500 transition-colors"
          >
            Reset alle gegevens
          </button>
        </div>
      </div>
    </div>
  )
}
