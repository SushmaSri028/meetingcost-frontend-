import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { getMeetings, syncCalendar } from '../api/meetings'

export default function MeetingsPage() {
  const [meetings, setMeetings] = useState([])
  const [loading, setLoading]   = useState(true)
  const [syncing, setSyncing]   = useState(false)
  const navigate = useNavigate()

  useEffect(() => { load() }, [])

  async function load() {
    try { const r = await getMeetings(); setMeetings(r.data) }
    catch { setMeetings([]) }
    finally { setLoading(false) }
  }

  async function handleSync() {
    setSyncing(true)
    try { await syncCalendar(); await load() } catch {}
    finally { setSyncing(false) }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Meetings</h1>
            <p className="text-gray-500 text-sm mt-1">{meetings.length} meetings synced</p>
          </div>
          <button onClick={handleSync} disabled={syncing}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white text-sm font-semibold rounded-xl transition-colors">
            {syncing ? '⟳ Syncing…' : '🔄 Sync Calendar'}
          </button>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          {loading
            ? <div className="p-12 text-center text-gray-400">Loading meetings…</div>
            : meetings.length === 0
              ? <div className="p-12 text-center">
                  <div className="text-4xl mb-3">📭</div>
                  <p className="text-gray-500 mb-4">No meetings yet</p>
                  <button onClick={handleSync}
                    className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition-colors">
                    Sync from Google Calendar
                  </button>
                </div>
              : <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-100 bg-gray-50">
                      {['Title','Date','Duration','Participants','Estimated Cost',''].map(h => (
                        <th key={h} className="px-5 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {meetings.map(m => (
                      <tr key={m.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-5 py-4 font-medium text-gray-900">{m.title}</td>
                        <td className="px-5 py-4 text-gray-500 text-sm">
                          {m.startTime ? new Date(m.startTime).toLocaleDateString() : '—'}
                        </td>
                        <td className="px-5 py-4 text-gray-500 text-sm">
                          {m.durationMinutes ? `${m.durationMinutes} min` : '—'}
                        </td>
                        <td className="px-5 py-4">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                            {m.participantCount ?? '—'} people
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          {m.estimatedCostUsd
                            ? <span className="font-bold text-emerald-600">${Number(m.estimatedCostUsd).toFixed(2)}</span>
                            : <span className="text-gray-300">—</span>}
                        </td>
                        <td className="px-5 py-4">
                          <button
                            onClick={() => navigate(`/ticker?id=${m.id}`)}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg transition-colors">
                            ▶ Ticker
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
          }
        </div>
      </div>
    </div>
  )
}