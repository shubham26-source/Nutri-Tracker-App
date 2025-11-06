import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import FoodSearch from './components/FoodSearch'
import Login from './components/Login'
import Register from './components/Register'
import FoodLog from './components/FoodLog'
import Navbar from './components/Navbar'

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user') || 'null'))

  const handleLogin = (token, user) => {
    setToken(token)
    setUser(user)
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(user))
  }

  const handleLogout = () => {
    setToken(null)
    setUser(null)
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-pink-100">
        <Navbar user={user} onLogout={handleLogout} />
        <Routes>
          <Route
            path="/"
            element={token ? <FoodSearch token={token} /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={!token ? <Login onLogin={handleLogin} /> : <Navigate to="/" />}
          />
          <Route
            path="/register"
            element={!token ? <Register onLogin={handleLogin} /> : <Navigate to="/" />}
          />
          <Route
            path="/log"
            element={token ? <FoodLog token={token} /> : <Navigate to="/" />}
          />
        </Routes>
      </div>
    </Router>
  )
}

export default App
