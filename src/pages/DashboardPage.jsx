import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { getStats, syncCalendar } from '../api/meetings'

const statCards = (stats) => [
  { label:'Total Meetings',   value: stats.totalMeetings ?? 0,                     icon:'📅', color:'blue',   bg:'bg-blue-50',   text:'text-blue-700',   border:'border-blue-200' },
  { label:'Total Cost',       value:`$${(stats.totalCostUsd ?? 0).toFixed(2)}`,    icon:'💰', color:'green',  bg:'bg-green-50',  text:'text-green-700',  border:'border-green-200' },
  { label:'Avg Duration',     value:`${stats.avgDurationMinutes ?? 0} min`,        icon:'⏱️', color:'amber',  bg:'bg-amber-50',  text:'text-amber-700',  border:'border-amber-200' },
  { label:'Meetings This Wk', value: stats.meetingsThisWeek ?? 0,                  icon:'📊', color:'purple', bg:'bg-purple-50', text:'text-purple-700', border:'border-purple-200' },
]

export default function DashboardPage() {
  const [stats, setStats]     = useState(null)
  const [syncing, setSyncing] = useState(false)
  const [msg, setMsg]         = useState('')
  const navigate = useNavigate()

  useEffect(() => { getStats().then(r => setStats(r.data)).catch(() => {}) }, [])

  async function handleSync() {
    setSyncing(true); setMsg('')
    try {
      const r = await syncCalendar()
      setMsg(`✅ Synced ${r.data.syncedMeetings ?? ''} meetings`)
      const u = await getStats(); setStats(u.data)
    } catch { setMsg('❌ Sync failed — sign in with Google first') }
    finally { setSyncing(false) }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-8">

        {/* Page header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-500 text-sm mt-1">Track the real cost of your meetings</p>
          </div>
          <div className="flex items-center gap-3">
            {msg && <span className="text-sm text-gray-600 bg-white px-3 py-2 rounded-lg border">{msg}</span>}
            <button onClick={handleSync} disabled={syncing}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white text-sm font-semibold rounded-xl transition-colors shadow-sm">
              {syncing ? '⟳ Syncing…' : '🔄 Sync Calendar'}
            </button>
            <button onClick={() => navigate('/ticker')}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-xl transition-colors shadow-sm">
              ▶ Live Ticker
            </button>
          </div>
        </div>

        {/* Stat cards */}
        {stats === null
          ? <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {[1,2,3,4].map(i => <div key={i} className="bg-white rounded-2xl p-6 animate-pulse h-28 border border-gray-100"/>)}
            </div>
          : <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {statCards(stats).map(c => (
                <div key={c.label} className={`bg-white rounded-2xl p-6 border ${c.border} shadow-sm hover:shadow-md transition-shadow`}>
                  <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl ${c.bg} text-xl mb-3`}>{c.icon}</div>
                  <div className={`text-2xl font-bold ${c.text}`}>{c.value}</div>
                  <div className="text-gray-500 text-sm mt-1">{c.label}</div>
                </div>
              ))}
            </div>
        }

        {/* Quick actions */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="font-semibold text-gray-700 mb-4">Quick Actions</h2>
          <div className="flex gap-3">
            <button onClick={() => navigate('/meetings')}
              className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
              📅 View Meetings
            </button>
            <button onClick={() => navigate('/ticker')}
              className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
              💰 Start Live Ticker
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}