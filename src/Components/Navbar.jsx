import { Link, useNavigate, useLocation } from 'react-router-dom'
import { logout, getUser } from '../api/auth'

export default function Navbar() {
  const navigate  = useNavigate()
  const location  = useLocation()
  const user      = getUser()

  function handleLogout() { logout(); navigate('/login') }

  const navLink = (to, label) => (
    <Link
      to={to}
      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
        ${location.pathname === to
          ? 'bg-white/20 text-white'
          : 'text-blue-100 hover:bg-white/10 hover:text-white'}`}
    >
      {label}
    </Link>
  )

  return (
    <nav className="bg-gradient-to-r from-blue-900 to-blue-700 shadow-lg">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <span className="text-white font-bold text-xl tracking-tight">
            💸 MeetingCost.io
          </span>
          <div className="flex items-center gap-1">
            {navLink('/dashboard', 'Dashboard')}
            {navLink('/meetings',  'Meetings')}
            {navLink('/ticker',    'Live Ticker')}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-blue-200 text-sm hidden sm:block">
            {user?.email || user?.name}
          </span>
          <button
            onClick={handleLogout}
            className="px-3 py-1.5 text-sm text-blue-100 border border-blue-400 rounded-lg hover:bg-white/10 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  )
}