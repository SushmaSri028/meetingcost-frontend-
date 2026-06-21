import { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Client } from '@stomp/stompjs'
import SockJS from 'sockjs-client'
import Navbar from '../components/Navbar'

export default function TickerPage() {
  const [searchParams]          = useSearchParams()
  const [meetingId, setMeetingId] = useState(searchParams.get('id') || '')
  const [connected, setConnected] = useState(false)
  const [tracking, setTracking]  = useState(false)
  const [data, setData]          = useState(null)
  const clientRef = useRef(null)
  const subRef    = useRef(null)

  useEffect(() => {
    const client = new Client({
      webSocketFactory: () => new SockJS('/ws'),
      onConnect:    () => setConnected(true),
      onDisconnect: () => { setConnected(false); setTracking(false) },
      reconnectDelay: 3000,
    })
    client.activate()
    clientRef.current = client
    return () => client.deactivate()
  }, [])

  function startTracking() {
    if (!clientRef.current?.connected || !meetingId.trim()) return
    subRef.current?.unsubscribe()
    subRef.current = clientRef.current.subscribe(
      `/topic/cost/${meetingId.trim()}`,
      msg => setData(JSON.parse(msg.body))
    )
    clientRef.current.publish({ destination: '/app/meeting/start', body: JSON.stringify(meetingId.trim()) })
    setTracking(true); setData(null)
  }

  function stopTracking() {
    clientRef.current?.publish({ destination: '/app/meeting/stop', body: JSON.stringify(meetingId.trim()) })
    subRef.current?.unsubscribe()
    setTracking(false)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-2xl mx-auto px-4 py-12">

        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">💰 Live Cost Ticker</h1>
          <p className="text-gray-500 mt-1 text-sm">Watch the cost of your meeting tick up in real time</p>
        </div>

        {/* Status */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <span className={`w-2.5 h-2.5 rounded-full ${connected ? 'bg-emerald-400 shadow-lg shadow-emerald-200' : 'bg-red-400'}`}/>
          <span className="text-sm text-gray-500">{connected ? 'WebSocket Connected' : 'Connecting…'}</span>
        </div>

        {/* Input row */}
        <div className="flex gap-3 mb-6">
          <input
            value={meetingId} onChange={e => setMeetingId(e.target.value)}
            disabled={tracking}
            placeholder="Paste Meeting UUID here"
            className="flex-1 px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white disabled:bg-gray-50 disabled:text-gray-400"
          />
          {!tracking
            ? <button onClick={startTracking} disabled={!connected || !meetingId.trim()}
                className="px-5 py-3 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-sm font-bold rounded-xl transition-colors shadow-sm shadow-emerald-200">
                ▶ Start
              </button>
            : <button onClick={stopTracking}
                className="px-5 py-3 bg-red-500 hover:bg-red-600 text-white text-sm font-bold rounded-xl transition-colors">
                ⏹ Stop
              </button>
          }
        </div>

        {/* Ticker display */}
        <div className="bg-gray-950 rounded-3xl p-10 text-center shadow-2xl">
          <div className={`font-mono font-black tracking-tight transition-all
            ${data ? 'text-7xl text-emerald-400' : 'text-7xl text-gray-700'}`}>
            {data?.formattedCost ?? '$0.00'}
          </div>
          <div className="font-mono text-3xl text-gray-500 mt-3">
            {data?.formattedElapsed ?? '00:00:00'}
          </div>
          {data && (
            <div className="mt-4 inline-flex items-center gap-2 bg-gray-800 px-4 py-2 rounded-full">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"/>
              <span className="text-gray-300 text-sm">{data.participantCount} participants · {data.meetingTitle}</span>
            </div>
          )}
          {!data && tracking && (
            <p className="text-gray-600 mt-4 text-sm">Waiting for first update…</p>
          )}
        </div>

        <p className="text-center text-xs text-gray-400 mt-4">
          Click <strong>▶ Ticker</strong> from the Meetings page to auto-fill the UUID
        </p>
      </div>
    </div>
  )
}