import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getStats, syncCalendar, syncOutlookCalendar } from "../api/meetings"

export default function DashboardPage() {
  const [stats, setStats] = useState(null)
  const [syncing, setSyncing] = useState(false)
  const [syncMsg, setSyncMsg] = useState("")
  const [syncingOutlook, setSyncingOutlook] = useState(false)
  const [outlookMsg, setOutlookMsg] = useState("")
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem("user") || "{}")

  useEffect(() => {
    getStats()
      .then(setStats)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const handleSync = async () => {
    setSyncing(true)
    setSyncMsg("")
    try {
      const res = await syncCalendar()
      setSyncMsg(res.message || "Calendar synced successfully!")
      const updated = await getStats()
      setStats(updated)
    } catch {
      setSyncMsg("Sync failed. Please try again.")
    } finally {
      setSyncing(false)
    }
  }

  const handleOutlookSync = async () => {
    setSyncingOutlook(true)
    setOutlookMsg("")
    try {
      const res = await syncOutlookCalendar()
      setOutlookMsg(res.message || "Outlook calendar synced!")
      const updated = await getStats()
      setStats(updated)
    } catch (err) {
      const msg = err?.response?.data?.message || "Outlook sync failed."
      if (msg.includes("No Microsoft account")) {
        setOutlookMsg("No Microsoft account connected. Please sign in with Microsoft first.")
      } else if (msg.includes("expired")) {
        setOutlookMsg("Microsoft session expired. Please sign out and sign in with Microsoft again.")
      } else {
        setOutlookMsg(msg)
      }
    } finally {
      setSyncingOutlook(false)
    }
  }

  const statCards = [
    {
      label: "Total Meetings",
      value: stats?.totalMeetings ?? "—",
      sub: "synced from Google Calendar",
      icon: (
        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
        </svg>
      ),
      bg: "bg-blue-50",
    },
    {
      label: "Total Cost",
      value: stats ? `$${Number(stats.totalCost ?? 0).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : "—",
      sub: "estimated across all meetings",
      icon: (
        <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
      ),
      bg: "bg-emerald-50",
    },
    {
      label: "Avg Duration",
      value: stats ? `${Math.round(stats.avgDurationMinutes ?? 0)} min` : "—",
      sub: "average meeting length",
      icon: (
        <svg className="w-5 h-5 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
      ),
      bg: "bg-violet-50",
    },
    {
      label: "This Week",
      value: stats?.meetingsThisWeek ?? "—",
      sub: "meetings in the last 7 days",
      icon: (
        <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
        </svg>
      ),
      bg: "bg-orange-50",
    },
  ]

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-2xl font-bold text-slate-900">
            Good {getGreeting()}, {user.name?.split(" ")[0] || "there"} 👋
          </h1>
          <p className="text-slate-500 mt-1 text-sm">
            Here's an overview of your meeting activity and costs.
          </p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {statCards.map((card) => (
            <div key={card.label} className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-medium text-slate-500">{card.label}</p>
                <div className={`w-9 h-9 ${card.bg} rounded-lg flex items-center justify-center`}>
                  {card.icon}
                </div>
              </div>
              <p className="text-2xl font-bold text-slate-900">
                {loading ? (
                  <span className="inline-block w-20 h-7 bg-slate-100 rounded animate-pulse" />
                ) : card.value}
              </p>
              <p className="text-xs text-slate-400 mt-1">{card.sub}</p>
            </div>
          ))}
        </div>

        {/* Action cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">

          {/* Sync card */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-slate-900 text-sm mb-1">Sync Google Calendar</h3>
                <p className="text-xs text-slate-500 leading-relaxed mb-4">
                  Pull your latest meetings from Google Calendar and calculate the real cost of each one.
                </p>
                <button
                  onClick={handleSync}
                  disabled={syncing}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white text-xs font-medium rounded-lg transition-colors duration-150"
                >
                  {syncing ? (
                    <>
                      <svg className="animate-spin h-3.5 w-3.5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                      </svg>
                      Syncing...
                    </>
                  ) : "Sync Now"}
                </button>
                {syncMsg && (
                  <p className={`text-xs mt-3 ${syncMsg.includes("failed") ? "text-red-500" : "text-emerald-600"}`}>
                    {syncMsg}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Outlook sync card */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center shrink-0">
                {/* Microsoft Windows logo */}
                <svg width="20" height="20" viewBox="0 0 21 21" xmlns="http://www.w3.org/2000/svg">
                  <rect x="1"  y="1"  width="9" height="9" fill="#F25022"/>
                  <rect x="11" y="1"  width="9" height="9" fill="#7FBA00"/>
                  <rect x="1"  y="11" width="9" height="9" fill="#00A4EF"/>
                  <rect x="11" y="11" width="9" height="9" fill="#FFB900"/>
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-slate-900 text-sm mb-1">Sync Outlook Calendar</h3>
                <p className="text-xs text-slate-500 leading-relaxed mb-4">
                  Pull meetings from Microsoft Outlook / Microsoft 365 via your connected Microsoft account.
                </p>
                <button
                  onClick={handleOutlookSync}
                  disabled={syncingOutlook}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-800 disabled:bg-slate-400 text-white text-xs font-medium rounded-lg transition-colors duration-150"
                >
                  {syncingOutlook ? (
                    <>
                      <svg className="animate-spin h-3.5 w-3.5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                      </svg>
                      Syncing Outlook...
                    </>
                  ) : "Sync Outlook"}
                </button>
                {outlookMsg && (
                  <p className={`text-xs mt-3 leading-relaxed ${
                    outlookMsg.includes("failed") || outlookMsg.includes("expired") || outlookMsg.includes("No Microsoft")
                      ? "text-amber-600"
                      : "text-emerald-600"
                  }`}>
                    {outlookMsg}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Live ticker card */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-slate-900 text-sm mb-1">Live Cost Ticker</h3>
                <p className="text-xs text-slate-500 leading-relaxed mb-4">
                  Watch the cost of your current meeting tick up in real time — updated every second via WebSocket.
                </p>
                <button
                  onClick={() => navigate("/ticker")}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-medium rounded-lg transition-colors duration-150"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  Open Ticker
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Quick link to meetings */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-900">View all meetings</p>
            <p className="text-xs text-slate-500 mt-0.5">See every meeting with its estimated cost and participant count</p>
          </div>
          <button
            onClick={() => navigate("/meetings")}
            className="flex items-center gap-1.5 text-sm text-blue-600 font-medium hover:underline"
          >
            View meetings
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
            </svg>
          </button>
        </div>

      </div>
    </div>
  )
}

function getGreeting() {
  const h = new Date().getHours()
  if (h < 12) return "morning"
  if (h < 17) return "afternoon"
  return "evening"
}
s