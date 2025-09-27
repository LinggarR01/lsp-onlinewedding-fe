import { Routes, Route } from 'react-router-dom'
import Dashboard from './pages/dashboard' // Import langsung dari folder pages/dashboard
import Login from './pages/login'
import Home from './pages/home'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  )
}

export default App