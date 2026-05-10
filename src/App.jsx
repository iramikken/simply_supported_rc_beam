import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Beam from './pages/Beam'

function App() {

  return (
    <>
      <BrowserRouter>
        <nav className="p-4 bg-gray-100 flex">
          <Link to="/" className="mx-4 hover:underline">Home</Link>
          <Link to="/simply-supported-beam" className="mx-4 hover:underline" >Simply supported beam analysis</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/simply-supported-beam" element={<Beam />} />
        </Routes>

      </BrowserRouter>
    </>
  )
}

export default App
