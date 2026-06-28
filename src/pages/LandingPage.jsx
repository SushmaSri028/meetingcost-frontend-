import { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"

const API_BASE = import.meta.env.VITE_API_URL?.replace("/api", "") || "http://localhost:8080"

export default function LandingPage() {
  const navigate = useNavigate()

  return (
    <div style={{ fontFamily: "Inter, -apple-system, sans-serif", color: "#0f172a", background: "#fff" }}>

      {/* Nav */}
      <nav style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1.25rem 2rem", borderBottom: "1px solid #f1f5f9", position: "sticky", top: 0, background: "#fff", zIndex: 50 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ width: 32, height: 32, background: "#2563eb", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: "#fff", fontWeight: 700, fontSize: 16 }}>M</span>
          </div>
          <span style={{ fontWeight: 700, fontSize: 17, color: "#0f172a" }}>MeetingCost.io</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
          <a href="#features" style={{ fontSize: 14, color: "#64748b", textDecoration: "none" }}>Features</a>
          <a href="#how" style={{ fontSize: 14, color: "#64748b", textDecoration: "none" }}>How it works</a>
          <a href="#pricing" style={{ fontSize: 14, color: "#64748b", textDecoration: "none" }}>Pricing</a>
          <button onClick={() => navigate("/login")} style={{ fontSize: 14, fontWeight: 500, color: "#fff", background: "#2563eb", border: "none", borderRadius: 8, padding: "8px 18px", cursor: "pointer" }}>
            Get started free
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ maxWidth: 760, margin: "0 auto", padding: "6rem 2rem 4rem", textAlign: "center" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: 999, padding: "6px 14px", marginBottom: "1.5rem" }}>
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#22c55e", display: "inline-block" }}></span>
          <span style={{ fontSize: 13, color: "#1d4ed8", fontWeight: 500 }}>Free · No credit card required</span>
        </div>
        <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.25rem)", fontWeight: 700, lineHeight: 1.15, margin: "0 0 1.25rem", color: "#0f172a" }}>
          Find out what your<br />
          <span style={{ color: "#2563eb" }}>meetings actually cost</span>
        </h1>
        <p style={{ fontSize: "1.125rem", color: "#475569", lineHeight: 1.7, margin: "0 auto 2.5rem", maxWidth: 560 }}>
          MeetingCost.io connects to Google Calendar and Outlook to calculate the real dollar cost of every meeting — and shows it ticking up live while you're in one.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <a href={`${API_BASE}/oauth2/authorization/google`} style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "12px 24px", background: "#fff", border: "1.5px solid #e2e8f0", borderRadius: 10, fontSize: 15, fontWeight: 500, color: "#0f172a", textDecoration: "none", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
            <svg width="18" height="18" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
            Continue with Google
          </a>
          <a href={`${API_BASE}/oauth2/authorization/microsoft`} style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "12px 24px", background: "#fff", border: "1.5px solid #e2e8f0", borderRadius: 10, fontSize: 15, fontWeight: 500, color: "#0f172a", textDecoration: "none", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
            <svg width="18" height="18" viewBox="0 0 21 21"><rect x="1" y="1" width="9" height="9" fill="#F25022"/><rect x="11" y="1" width="9" height="9" fill="#7FBA00"/><rect x="1" y="11" width="9" height="9" fill="#00A4EF"/><rect x="11" y="11" width="9" height="9" fill="#FFB900"/></svg>
            Continue with Microsoft
          </a>
        </div>
        <p style={{ fontSize: 13, color: "#94a3b8", marginTop: "1.25rem" }}>
          Works with Google Calendar and Microsoft Outlook · Setup in 60 seconds
        </p>
      </section>

      {/* Stats bar */}
      <div style={{ background: "#f8fafc", borderTop: "1px solid #f1f5f9", borderBottom: "1px solid #f1f5f9", padding: "1.5rem 2rem" }}>
        <div style={{ maxWidth: 760, margin: "0 auto", display: "flex", justifyContent: "space-around", flexWrap: "wrap", gap: "1rem" }}>
          {[
            { value: "$25K+", label: "avg annual meeting cost per employee" },
            { value: "31 hrs", label: "avg hours/week spent in meetings" },
            { value: "67%", label: "of meetings considered unnecessary" },
          ].map(s => (
            <div key={s.label} style={{ textAlign: "center" }}>
              <p style={{ fontSize: "1.75rem", fontWeight: 700, color: "#2563eb", margin: 0 }}>{s.value}</p>
              <p style={{ fontSize: 13, color: "#64748b", margin: "4px 0 0", maxWidth: 160 }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <section id="features" style={{ maxWidth: 960, margin: "0 auto", padding: "5rem 2rem" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <h2 style={{ fontSize: "2rem", fontWeight: 700, margin: "0 0 0.75rem" }}>Everything you need to cut meeting waste</h2>
          <p style={{ fontSize: "1.0625rem", color: "#64748b", margin: 0 }}>Built for individuals and teams who want to make every meeting count.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.5rem" }}>
          {[
            { icon: "📅", title: "Google + Outlook sync", desc: "Connect both calendars and see costs across all your meetings in one place. No Chrome extension required." },
            { icon: "⚡", title: "Live cost ticker", desc: "Watch the dollar cost tick up in real time during your meeting via WebSocket. The most powerful nudge to stay on topic." },
            { icon: "📊", title: "Meeting analytics", desc: "See your most expensive meetings, total weekly cost, and average duration — all calculated automatically." },
            { icon: "🔒", title: "Privacy first", desc: "Your salary and calendar data never leaves your account. We store tokens securely and never sell your data." },
            { icon: "🚀", title: "No setup friction", desc: "Sign in with Google or Microsoft, connect your calendar, and your meetings appear within seconds." },
            { icon: "🆓", title: "Completely free", desc: "No credit card, no trial period, no hidden fees. Free while we're in beta — use it as long as you like." },
          ].map(f => (
            <div key={f.title} style={{ background: "#f8fafc", border: "1px solid #f1f5f9", borderRadius: 12, padding: "1.5rem" }}>
              <div style={{ fontSize: 28, marginBottom: "0.75rem" }}>{f.icon}</div>
              <h3 style={{ fontSize: 15, fontWeight: 600, margin: "0 0 0.5rem" }}>{f.title}</h3>
              <p style={{ fontSize: 14, color: "#64748b", margin: 0, lineHeight: 1.6 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How to use — interactive walkthrough */}
      <section id="how" style={{ background: "#f8fafc", borderTop: "1px solid #f1f5f9", borderBottom: "1px solid #f1f5f9", padding: "5rem 2rem" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <p style={{ fontSize: 12, fontWeight: 600, color: "#2563eb", textTransform: "uppercase", letterSpacing: "0.06em", margin: "0 0 8px" }}>How it works</p>
            <h2 style={{ fontSize: "2rem", fontWeight: 700, margin: "0 0 0.75rem" }}>From sign-up to insights in 60 seconds</h2>
            <p style={{ fontSize: "1.0625rem", color: "#64748b", margin: 0 }}>No extension. No setup. Just connect and go.</p>
          </div>
          <HowToUse apiBase={API_BASE} />
        </div>
      </section>

      {/* Vs competitors */}
      <section style={{ maxWidth: 800, margin: "0 auto", padding: "5rem 2rem" }}>
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <h2 style={{ fontSize: "2rem", fontWeight: 700, margin: "0 0 0.75rem" }}>How we compare</h2>
          <p style={{ fontSize: "1.0625rem", color: "#64748b", margin: 0 }}>The only free, standalone meeting cost app with a live ticker.</p>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
            <thead>
              <tr style={{ background: "#f8fafc" }}>
                <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, color: "#475569", borderBottom: "1px solid #e2e8f0" }}>Feature</th>
                <th style={{ padding: "12px 16px", textAlign: "center", fontWeight: 700, color: "#2563eb", borderBottom: "1px solid #e2e8f0" }}>MeetingCost.io</th>
                <th style={{ padding: "12px 16px", textAlign: "center", fontWeight: 500, color: "#64748b", borderBottom: "1px solid #e2e8f0" }}>Fellow</th>
                <th style={{ padding: "12px 16px", textAlign: "center", fontWeight: 500, color: "#64748b", borderBottom: "1px solid #e2e8f0" }}>Flowtrace</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Free", "✅", "❌ Paid", "❌ Paid"],
                ["No Chrome extension", "✅", "❌ Required", "❌ Required"],
                ["Google + Outlook", "✅", "❌ Google only", "✅"],
                ["Live real-time ticker", "✅", "❌", "❌"],
                ["Works on any browser", "✅", "❌ Chrome only", "✅"],
                ["Mobile friendly", "✅", "❌", "Partial"],
              ].map(([feature, ...vals]) => (
                <tr key={feature} style={{ borderBottom: "1px solid #f1f5f9" }}>
                  <td style={{ padding: "12px 16px", color: "#475569" }}>{feature}</td>
                  {vals.map((v, i) => (
                    <td key={i} style={{ padding: "12px 16px", textAlign: "center", color: v.startsWith("✅") ? "#16a34a" : v.startsWith("❌") ? "#dc2626" : "#64748b", fontWeight: i === 0 ? 600 : 400 }}>{v}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" style={{ background: "#f8fafc", borderTop: "1px solid #f1f5f9", padding: "5rem 2rem" }}>
        <div style={{ maxWidth: 480, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: "2rem", fontWeight: 700, margin: "0 0 0.75rem" }}>Simple pricing</h2>
          <p style={{ fontSize: "1.0625rem", color: "#64748b", margin: "0 0 2.5rem" }}>Free during beta. No credit card ever.</p>
          <div style={{ background: "#fff", border: "1.5px solid #bfdbfe", borderRadius: 16, padding: "2rem" }}>
            <p style={{ fontSize: 13, fontWeight: 600, color: "#2563eb", textTransform: "uppercase", letterSpacing: "0.05em", margin: "0 0 0.5rem" }}>Beta</p>
            <p style={{ fontSize: "3rem", fontWeight: 700, color: "#0f172a", margin: "0 0 0.25rem" }}>$0</p>
            <p style={{ fontSize: 14, color: "#64748b", margin: "0 0 1.5rem" }}>Forever free while in beta</p>
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 2rem", textAlign: "left" }}>
              {[
                "Google Calendar sync",
                "Microsoft Outlook sync",
                "Live cost ticker",
                "Meeting analytics dashboard",
                "Unlimited meeting history",
                "No Chrome extension needed",
              ].map(f => (
                <li key={f} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", fontSize: 14, color: "#374151", borderBottom: "1px solid #f1f5f9" }}>
                  <span style={{ color: "#16a34a", fontWeight: 700 }}>✓</span> {f}
                </li>
              ))}
            </ul>
            <button onClick={() => navigate("/login")} style={{ width: "100%", padding: "13px", background: "#2563eb", color: "#fff", border: "none", borderRadius: 10, fontSize: 15, fontWeight: 600, cursor: "pointer" }}>
              Get started free →
            </button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ maxWidth: 680, margin: "0 auto", padding: "5rem 2rem", textAlign: "center" }}>
        <h2 style={{ fontSize: "2rem", fontWeight: 700, margin: "0 0 1rem" }}>Ready to see what meetings are costing you?</h2>
        <p style={{ fontSize: "1.0625rem", color: "#64748b", margin: "0 0 2rem" }}>Sign in with Google or Microsoft — no setup, no credit card, no extension.</p>
        <button onClick={() => navigate("/login")} style={{ padding: "14px 32px", background: "#2563eb", color: "#fff", border: "none", borderRadius: 10, fontSize: 16, fontWeight: 600, cursor: "pointer" }}>
          Get started free →
        </button>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: "1px solid #f1f5f9", padding: "2rem", textAlign: "center" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: "0.75rem" }}>
          <div style={{ width: 24, height: 24, background: "#2563eb", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: "#fff", fontWeight: 700, fontSize: 12 }}>M</span>
          </div>
          <span style={{ fontWeight: 600, fontSize: 14 }}>MeetingCost.io</span>
        </div>
        <p style={{ fontSize: 13, color: "#94a3b8", margin: 0 }}>
          © {new Date().getFullYear()} MeetingCost.io · Built to make every meeting count
        </p>
      </footer>

    </div>
  )
}

// ─── How To Use walkthrough ───────────────────────────────────────────────────

const STEPS = [
  {
    num: 1,
    title: "Sign in with Google or Microsoft",
    desc: "Go to MeetingCost.io and click 'Continue with Google' or 'Continue with Microsoft'. No form, no email verification, no password to create.",
    tip: "Works with any Google Workspace or Microsoft 365 account.",
    mockup: ({ apiBase }) => (
      <div style={{ padding: "2rem", display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
        <div style={{ width: 48, height: 48, background: "#2563eb", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ color: "#fff", fontWeight: 700, fontSize: 22 }}>M</span>
        </div>
        <p style={{ fontSize: 16, fontWeight: 600, color: "#0f172a", margin: 0 }}>Welcome to MeetingCost.io</p>
        <p style={{ fontSize: 13, color: "#64748b", margin: 0, textAlign: "center" }}>Sign in to start tracking your meeting costs</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, width: "100%", maxWidth: 260 }}>
          <a href={`${apiBase}/oauth2/authorization/google`} style={{ display: "flex", alignItems: "center", gap: 10, padding: "11px 16px", border: "1px solid #e2e8f0", borderRadius: 8, background: "#fff", fontSize: 14, fontWeight: 500, color: "#0f172a", textDecoration: "none" }}>
            <GoogleIcon /> Continue with Google
          </a>
          <a href={`${apiBase}/oauth2/authorization/microsoft`} style={{ display: "flex", alignItems: "center", gap: 10, padding: "11px 16px", border: "1px solid #e2e8f0", borderRadius: 8, background: "#fff", fontSize: 14, fontWeight: 500, color: "#0f172a", textDecoration: "none" }}>
            <MsIcon /> Continue with Microsoft
          </a>
        </div>
      </div>
    ),
  },
  {
    num: 2,
    title: "Connect your calendar",
    desc: "After signing in, click 'Connect Google' or 'Connect Microsoft' on the dashboard. A permission screen appears — click Allow. That's it.",
    tip: "We only request read access. We can never create, edit, or delete your meetings.",
    mockup: () => (
      <div style={{ padding: "1.5rem" }}>
        <p style={{ fontSize: 13, fontWeight: 600, color: "#0f172a", margin: "0 0 12px" }}>Calendar connections</p>
        {[
          { label: "Google Calendar", connected: false, icon: <GoogleIcon /> },
          { label: "Outlook Calendar", connected: true, icon: <MsIcon /> },
        ].map(c => (
          <div key={c.label} style={{ background: "#fff", border: "1px solid #f1f5f9", borderRadius: 10, padding: "14px", marginBottom: 10, display: "flex", alignItems: "center", gap: 12 }}>
            {c.icon}
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 13, fontWeight: 500, margin: 0, color: "#0f172a" }}>{c.label}</p>
              <p style={{ fontSize: 11, margin: 0, color: c.connected ? "#16a34a" : "#94a3b8", fontWeight: c.connected ? 500 : 400 }}>
                {c.connected ? "● Connected" : "Not connected"}
              </p>
            </div>
            <button style={{ fontSize: 12, padding: "6px 12px", background: c.connected ? "#f1f5f9" : "#2563eb", color: c.connected ? "#64748b" : "#fff", border: "none", borderRadius: 6, cursor: "pointer", fontWeight: 500 }}>
              {c.connected ? "Sync now" : "Connect"}
            </button>
          </div>
        ))}
      </div>
    ),
  },
  {
    num: 3,
    title: "Sync your meetings",
    desc: "Click 'Sync Now' on any connected calendar. MeetingCost.io pulls your last 30 days of meetings and calculates the cost of each one based on duration and attendee count.",
    tip: "Sync takes a few seconds. Your meetings appear on the dashboard instantly after.",
    mockup: () => (
      <div style={{ padding: "1.5rem", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: 220, gap: 16 }}>
        <div style={{ width: 48, height: 48, borderRadius: "50%", border: "3px solid #2563eb", borderTopColor: "transparent", animation: "spin 1s linear infinite" }} />
        <div style={{ textAlign: "center" }}>
          <p style={{ fontSize: 14, fontWeight: 600, color: "#0f172a", margin: "0 0 4px" }}>Syncing your calendar...</p>
          <p style={{ fontSize: 12, color: "#94a3b8", margin: 0 }}>Fetching meetings from the last 30 days</p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, width: "100%" }}>
          {[1, 2, 3].map(i => (
            <div key={i} style={{ height: 36, background: "#f1f5f9", borderRadius: 6, animation: "pulse 1.5s ease-in-out infinite", animationDelay: `${i * 0.2}s` }} />
          ))}
        </div>
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}`}</style>
      </div>
    ),
  },
  {
    num: 4,
    title: "See your meeting costs",
    desc: "Your dashboard shows total meetings, total cost, average duration, and this week's activity. Click 'View meetings' to see every meeting with its individual cost breakdown.",
    tip: "Cost = meeting duration × number of attendees × blended hourly rate ($75/hr default).",
    mockup: () => (
      <div style={{ padding: "1.25rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 12 }}>
          {[{ label: "Total meetings", val: "24" }, { label: "Total cost", val: "$3,840" }, { label: "Avg duration", val: "47 min" }, { label: "This week", val: "6" }].map(c => (
            <div key={c.label} style={{ background: "#fff", border: "1px solid #f1f5f9", borderRadius: 8, padding: 10 }}>
              <p style={{ fontSize: 11, color: "#94a3b8", margin: "0 0 4px" }}>{c.label}</p>
              <p style={{ fontSize: 18, fontWeight: 700, margin: 0, color: "#0f172a" }}>{c.val}</p>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {[{ title: "Q3 Planning", cost: "$675", dur: "60min", att: 9 }, { title: "Daily standup", cost: "$120", dur: "15min", att: 8 }, { title: "Design review", cost: "$300", dur: "45min", att: 4 }].map(m => (
            <div key={m.title} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "#fff", border: "1px solid #f1f5f9", borderRadius: 8, padding: "8px 10px" }}>
              <div>
                <p style={{ fontSize: 12, fontWeight: 500, margin: 0, color: "#0f172a" }}>{m.title}</p>
                <p style={{ fontSize: 11, color: "#94a3b8", margin: 0 }}>{m.dur} · {m.att} attendees</p>
              </div>
              <span style={{ fontSize: 13, fontWeight: 600, color: "#dc2626" }}>{m.cost}</span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    num: 5,
    title: "Open the live ticker during meetings",
    desc: "Before or during any meeting, click 'Open Ticker' on the dashboard. A live counter ticks up every second showing the real-time cost. Share your screen to keep everyone focused.",
    tip: "The ticker uses WebSocket — updates every second with no page refresh needed.",
    mockup: () => <LiveTickerMockup />,
  },
]

function LiveTickerMockup() {
  const [elapsed, setElapsed] = useState(0)
  const ref = useRef(null)
  useEffect(() => {
    ref.current = setInterval(() => setElapsed(e => e + 1), 1000)
    return () => clearInterval(ref.current)
  }, [])
  const cost = ((elapsed * 6 * 75) / 3600).toFixed(2)
  const mins = Math.floor(elapsed / 60)
  const secs = String(elapsed % 60).padStart(2, "0")
  return (
    <div style={{ padding: "2rem", display: "flex", flexDirection: "column", alignItems: "center", gap: 12, textAlign: "center" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#22c55e", display: "inline-block" }} />
        <span style={{ fontSize: 12, color: "#64748b" }}>Live · 6 attendees</span>
      </div>
      <p style={{ fontSize: "3rem", fontWeight: 700, fontVariantNumeric: "tabular-nums", margin: 0, color: "#0f172a" }}>${cost}</p>
      <p style={{ fontSize: 13, color: "#94a3b8", margin: 0 }}>{mins}:{secs} elapsed</p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, width: "100%" }}>
        {[{ label: "Attendees", val: "6" }, { label: "Rate/hr", val: "$75" }].map(s => (
          <div key={s.label} style={{ background: "#fff", border: "1px solid #f1f5f9", borderRadius: 8, padding: 10 }}>
            <p style={{ fontSize: 11, color: "#94a3b8", margin: "0 0 2px" }}>{s.label}</p>
            <p style={{ fontSize: 16, fontWeight: 600, margin: 0, color: "#0f172a" }}>{s.val}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  )
}

function MsIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 21 21">
      <rect x="1" y="1" width="9" height="9" fill="#F25022"/>
      <rect x="11" y="1" width="9" height="9" fill="#7FBA00"/>
      <rect x="1" y="11" width="9" height="9" fill="#00A4EF"/>
      <rect x="11" y="11" width="9" height="9" fill="#FFB900"/>
    </svg>
  )
}

function HowToUse({ apiBase }) {
  const [current, setCurrent] = useState(0)
  const step = STEPS[current]
  const Mockup = step.mockup
  return (
    <div>
      {/* Tab bar */}
      <div style={{ display: "flex", border: "1px solid #e2e8f0", borderRadius: 10, overflow: "hidden", marginBottom: "2rem" }}>
        {STEPS.map((s, i) => (
          <button key={s.num} onClick={() => setCurrent(i)} style={{
            flex: 1, padding: "10px 6px", fontSize: 13, fontWeight: 500,
            border: "none", borderRight: i < STEPS.length - 1 ? "1px solid #e2e8f0" : "none",
            background: current === i ? "#2563eb" : "#fff",
            color: current === i ? "#fff" : "#64748b",
            cursor: "pointer",
          }}>
            {s.num}. {s.title.split(" ").slice(0, 2).join(" ")}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", alignItems: "center" }}>
        <div>
          <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#eff6ff", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }}>
            <span style={{ fontSize: 17, fontWeight: 700, color: "#2563eb" }}>{step.num}</span>
          </div>
          <h3 style={{ fontSize: "1.2rem", fontWeight: 700, margin: "0 0 0.75rem", color: "#0f172a" }}>{step.title}</h3>
          <p style={{ fontSize: 14, color: "#475569", lineHeight: 1.7, margin: "0 0 1rem" }}>{step.desc}</p>
          <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 8, padding: "10px 14px" }}>
            <p style={{ fontSize: 12, color: "#15803d", margin: 0 }}><strong>Tip:</strong> {step.tip}</p>
          </div>
        </div>
        <div style={{ background: "#f8fafc", border: "1px solid #f1f5f9", borderRadius: 12, overflow: "hidden", minHeight: 280 }}>
          <Mockup apiBase={apiBase} />
        </div>
      </div>

      {/* Dots nav */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "2rem" }}>
        <button onClick={() => setCurrent(c => Math.max(0, c - 1))} style={{ fontSize: 13, padding: "8px 16px", visibility: current === 0 ? "hidden" : "visible" }}>← Previous</button>
        <div style={{ display: "flex", gap: 6 }}>
          {STEPS.map((_, i) => (
            <div key={i} onClick={() => setCurrent(i)} style={{ width: 8, height: 8, borderRadius: "50%", background: current === i ? "#2563eb" : "#cbd5e1", cursor: "pointer" }} />
          ))}
        </div>
        <button onClick={() => setCurrent(c => Math.min(STEPS.length - 1, c + 1))} style={{ fontSize: 13, padding: "8px 16px", visibility: current === STEPS.length - 1 ? "hidden" : "visible" }}>Next →</button>
      </div>
    </div>
  )
}
