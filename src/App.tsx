import { HashRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Verkenning from './pages/Verkenning'
import Profiel from './pages/Profiel'
import Verdieping from './pages/Verdieping'

function App() {
  return (
    <HashRouter>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/verkenning" element={<Verkenning />} />
          <Route path="/profiel" element={<Profiel />} />
          <Route path="/verdieping/:id" element={<Verdieping />} />
        </Routes>
      </div>
    </HashRouter>
  )
}

export default App
