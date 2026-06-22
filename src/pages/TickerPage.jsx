import { useEffect, useRef, useState } from "react"
import { useSearchParams, useNavigate } from "react-router-dom"
import { getMeetings } from "../api/meetings"
import SockJS from "sockjs-client"
import { Client } from "@stomp/stompjs"

export default function TickerPage() {
  const [meetings, setMeetings] = useState([])
  const [selectedId, setSelectedId] = useState("")
  const [tickerData, setTickerData] = useState(null)
  const [connected, setConnected] = useState(false)
  const [running, setRunning] = useState(false)
  const [loadingMeetings, setLoadingMeetings] = useState(true)
  const clientRef = useRef(null)
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const apiBase = (import.meta.env.VITE_API_URL || "http://localhost:8080/api").replace("/api", "")
  const token = localStorage.getItem("token")

  useEffect(() => {
    getMeetings()
      .then((list) => {
        setMeetings(list)
        const urlId = searchParams.get("meetingId")
        if (urlId) setSelectedId(urlId)
        else if (list.length > 0) setSelectedId(list[0].id)
      })
      .catch(console.error)
      .finally(() => setLoadingMeetings(false))
  }, [])

  useEffect(() => {
    const client = new Client({
      webSocketFactory: () => new SockJS(`${apiBase}/ws`),
      connectHeaders: { Authorization: `Bearer ${token}` },
      onConnect: () => setConnected(true),
      onDisconnect: () => { setConnected(false); setRunning(false) },
      reconnectDelay: 3000,
    })
    client.activate()
    clientRef.current = client
    return () => { client.deactivate() }
  }, [])

  const startTicker = () => {
    if (!clientRef.current?.connected || !selectedId) return
    clientRef.current.subscribe(`/topic/cost/${selectedId}`, (msg) => {
      setTickerData(JSON.parse(msg.body))
    })
    clientRef.current.publish({ destination: "/app/meeting/start", body: selectedId })
    setRunning(true)
    setTickerData(null)
  }

  const stopTicker = () => {
    if (!clientRef.current?.connected || !selectedId) return
    clientRef.current.publish({ destination: "/app/meeting/stop", body: selectedId })
    setRunning(false)
  }

  const selectedMeeting = meetings.find((m) => m.id === selectedId)

  const formatCost = (val) =>
    val != null
      ? `$${Number(val).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
      : "$0.00"

  const formatTime = (secs) => {
    if (!secs) return "0:00"
    const m = Math.floor(secs / 60)
    const s = secs % 60
    return `${m}:${String(s).padStart(2, "0")}`
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900">Live Cost Ticker</h1>
          <p className="text-slate-500 text-sm mt-1">
            Real-time meeting cost — updated every second via WebSocket
          </p>
        </div>

        {/* Connection status */}
        <div className="flex items-center gap-2 mb-6">
          <span className={`w-2 h-2 rounded-full ${connected ? "bg-emerald-500" : "bg-slate-300"} ${connected ? "animate-pulse" : ""}`} />
          <span className="text-xs text-slate-500">
            {connected ? "WebSocket connected" : "Connecting..."}
          </span>
        </div>

        {/* Meeting selector */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 mb-5">
          <label className="block text-sm font-medium text-slate-700 mb-2">Select Meeting</label>
          {loadingMeetings ? (
            <div className="h-10 bg-slate-100 rounded-lg animate-pulse" />
          ) : meetings.length === 0 ? (
            <div className="flex items-center justify-between p-3 bg-amber-50 border border-amber-100 rounded-lg">
              <p className="text-sm text-amber-700">No meetings found. Sync your calendar first.</p>
              <button onClick={() => navigate("/dashboard")} className="text-xs text-blue-600 font-medium hover:underline">Go to Dashboard</button>
            </div>
          ) : (
            <select
              value={selectedId}
              onChange={(e) => { setSelectedId(e.target.value); setRunning(false); setTickerData(null) }}
              className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {meetings.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.title || "Untitled Meeting"} — {m.participantCount} people
                </option>
              ))}
            </select>
          )}
        </div>

        {/* Main ticker display */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden mb-5">

          {/* Top bar */}
          {selectedMeeting && (
            <div className="border-b border-slate-100 px-6 py-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-900 line-clamp-1">{selectedMeeting.title || "Untitled Meeting"}</p>
                <p className="text-xs text-slate-500 mt-0.5">{selectedMeeting.participantCount} participants · {selectedMeeting.durationMinutes} min scheduled</p>
              </div>
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                running ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-500"
              }`}>
                <span className={`w-1.5 h-1.5 rounded-full ${running ? "bg-emerald-500 animate-pulse" : "bg-slate-400"}`} />
                {running ? "Live" : "Paused"}
              </span>
            </div>
          )}

          {/* Cost display */}
          <div className="px-6 py-12 text-center">
            <p className="text-xs font-medium text-slate-400 uppercase tracking-widest mb-3">Current Meeting Cost</p>
            <p className={`text-6xl font-bold tabular-nums transition-all duration-300 ${
              running ? "text-slate-900" : "text-slate-300"
            }`}>
              {formatCost(tickerData?.currentCost)}
            </p>

            {tickerData && (
              <div className="flex items-center justify-center gap-8 mt-6">
                <div className="text-center">
                  <p className="text-xs text-slate-400 mb-1">Elapsed</p>
                  <p className="text-lg font-semibold text-slate-700 tabular-nums">{formatTime(tickerData.elapsedSeconds)}</p>
                </div>
                <div className="w-px h-8 bg-slate-200" />
                <div className="text-center">
                  <p className="text-xs text-slate-400 mb-1">Per Second</p>
                  <p className="text-lg font-semibold text-slate-700 tabular-nums">
                    {tickerData.costPerSecond != null
                      ? `$${Number(tickerData.costPerSecond).toFixed(4)}`
                      : "—"}
                  </p>
                </div>
                <div className="w-px h-8 bg-slate-200" />
                <div className="text-center">
                  <p className="text-xs text-slate-400 mb-1">Per Minute</p>
                  <p className="text-lg font-semibold text-slate-700 tabular-nums">
                    {tickerData.costPerSecond != null
                      ? `$${(tickerData.costPerSecond * 60).toFixed(2)}`
                      : "—"}
                  </p>
                </div>
              </div>
            )}

            {!running && !tickerData && (
              <p className="text-sm text-slate-400 mt-4">Start the ticker to see costs update in real time</p>
            )}
          </div>

          {/* Controls */}
          <div className="border-t border-slate-100 px-6 py-4 flex items-center justify-center gap-3">
            {!running ? (
              <button
                onClick={startTicker}
                disabled={!connected || !selectedId || loadingMeetings}
                className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 disabled:text-slate-400 text-white text-sm font-medium rounded-lg transition-colors duration-150"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
                Start Ticker
              </button>
            ) : (
              <button
                onClick={stopTicker}
                className="flex items-center gap-2 px-6 py-2.5 bg-red-50 hover:bg-red-100 text-red-600 text-sm font-medium rounded-lg border border-red-100 transition-colors duration-150"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                </svg>
                Stop Ticker
              </button>
            )}
          </div>
        </div>

        {/* Info card */}
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex items-start gap-3">
          <svg className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
          </svg>
          <p className="text-xs text-blue-700 leading-relaxed">
            Cost is calculated based on estimated participant salaries and meeting duration. Updates are pushed via WebSocket every second — no page refresh needed.
          </p>
        </div>

      </div>
    </div>
  )
}
