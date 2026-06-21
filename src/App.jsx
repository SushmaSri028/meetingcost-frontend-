// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import LoginPage     from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import MeetingsPage  from './pages/MeetingsPage'
import TickerPage    from './pages/TickerPage'
import PrivateRoute  from './components/PrivateRoute'

function OAuthCallback() {
  const navigate = useNavigate()
  const location = useLocation()
  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const token  = params.get('token')
    const name   = params.get('name') || ''
    const email  = params.get('email') || ''
    if (token) {
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify({ token, name, email }))
      navigate('/dashboard', { replace: true })
    } else {
      navigate('/login', { replace: true })
    }
  }, [])
  return <p style={{ padding:40, textAlign:'center', color:'#64748B' }}>Signing you in…</p>
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login"           element={<LoginPage />} />
        <Route path="/oauth2/callback" element={<OAuthCallback />} />
        <Route path="/dashboard"       element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
        <Route path="/meetings"        element={<PrivateRoute><MeetingsPage /></PrivateRoute>} />
        <Route path="/ticker"          element={<PrivateRoute><TickerPage /></PrivateRoute>} />
        <Route path="*"               element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  )
}