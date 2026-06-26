import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { login, register } from "../api/auth"

export default function LoginPage() {
  const [mode, setMode] = useState("login")
  const [form, setForm] = useState({ name: "", email: "", password: "" })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)
    try {
      if (mode === "login") {
        const data = await login(form.email, form.password)
        localStorage.setItem("token", data.token)
        localStorage.setItem("user", JSON.stringify({ email: data.email, name: data.displayName }))
      } else {
        const data = await register(form.name, form.email, form.password)
        localStorage.setItem("token", data.token)
        localStorage.setItem("user", JSON.stringify({ email: data.email, name: data.displayName }))
      }
      navigate("/dashboard")
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const apiBase = (import.meta.env.VITE_API_URL || "http://localhost:8080/api").replace("/api", "")

  const handleGoogle = () => {
    window.location.href = `${apiBase}/oauth2/authorization/google`
  }

  const handleMicrosoft = () => {
    window.location.href = `${apiBase}/oauth2/authorization/microsoft`
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Left panel — branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-blue-600 flex-col justify-between p-12">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
            <span className="text-blue-600 font-bold text-sm">M</span>
          </div>
          <span className="text-white font-semibold text-lg">MeetingCost.io</span>
        </div>

        <div>
          <h1 className="text-white text-4xl font-bold leading-tight mb-6">
            Know what every meeting<br />actually costs.
          </h1>
          <p className="text-blue-200 text-lg leading-relaxed mb-10">
            Connect your Google or Microsoft calendar, sync your meetings, and watch the real dollar cost tick up in real time.
          </p>

          <div className="space-y-4">
            {[
              { icon: "📅", text: "Sync from Google Calendar or Outlook" },
              { icon: "⚡", text: "Live cost ticker via WebSocket" },
              { icon: "📊", text: "Analytics across all your meetings" },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-3">
                <span className="text-xl">{item.icon}</span>
                <span className="text-blue-100 text-sm">{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex -space-x-2">
            {["bg-blue-400", "bg-blue-300", "bg-blue-200"].map((c, i) => (
              <div key={i} className={`w-8 h-8 rounded-full ${c} border-2 border-blue-600`} />
            ))}
          </div>
          <p className="text-blue-200 text-sm">Join developers tracking meeting costs</p>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">

          {/* Mobile logo */}
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">M</span>
            </div>
            <span className="text-slate-800 font-semibold text-lg">MeetingCost.io</span>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mb-1">
            {mode === "login" ? "Welcome back" : "Create your account"}
          </h2>
          <p className="text-slate-500 text-sm mb-8">
            {mode === "login"
              ? "Sign in to your account to continue"
              : "Start tracking your meeting costs today"}
          </p>

          {/* OAuth buttons */}
          <div className="space-y-3 mb-6">
            {/* Google */}
            <button
              onClick={handleGoogle}
              type="button"
              className="w-full flex items-center justify-center gap-3 py-2.5 px-4 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 hover:border-slate-300 transition-all duration-150 shadow-sm"
            >
              <svg width="18" height="18" viewBox="0 0 18 18">
                <path fill="#4285F4" d="M16.51 8H8.98v3h4.3c-.18 1-.74 1.48-1.6 2.04v2.01h2.6a7.8 7.8 0 0 0 2.38-5.88c0-.57-.05-.66-.15-1.18z"/>
                <path fill="#34A853" d="M8.98 17c2.16 0 3.97-.72 5.3-1.94l-2.6-2.01c-.72.48-1.63.77-2.7.77a4.83 4.83 0 0 1-4.56-3.33H1.73v2.07A8 8 0 0 0 8.98 17z"/>
                <path fill="#FBBC05" d="M4.42 10.49a4.84 4.84 0 0 1 0-3.09V5.33H1.73a8.02 8.02 0 0 0 0 7.23l2.69-2.07z"/>
                <path fill="#EA4335" d="M8.98 3.58c1.22 0 2.3.42 3.16 1.24l2.37-2.37A8 8 0 0 0 1.73 5.33l2.69 2.07a4.83 4.83 0 0 1 4.56-3.82z"/>
              </svg>
              Continue with Google
            </button>

            {/* Microsoft */}
            <button
              onClick={handleMicrosoft}
              type="button"
              className="w-full flex items-center justify-center gap-3 py-2.5 px-4 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 hover:border-slate-300 transition-all duration-150 shadow-sm"
            >
              {/* Official Microsoft Windows logo */}
              <svg width="18" height="18" viewBox="0 0 21 21" xmlns="http://www.w3.org/2000/svg">
                <rect x="1"  y="1"  width="9" height="9" fill="#F25022"/>
                <rect x="11" y="1"  width="9" height="9" fill="#7FBA00"/>
                <rect x="1"  y="11" width="9" height="9" fill="#00A4EF"/>
                <rect x="11" y="11" width="9" height="9" fill="#FFB900"/>
              </svg>
              Continue with Microsoft
            </button>
          </div>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-3 bg-slate-50 text-slate-400">or continue with email</span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "signup" && (
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Full name</label>
                <input
                  name="name"
                  type="text"
                  placeholder="Sushma Sri"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white transition"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Email address</label>
              <input
                name="email"
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white transition"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-sm font-medium text-slate-700">Password</label>
                {mode === "login" && (
                  <span className="text-xs text-blue-600 cursor-pointer hover:underline">Forgot password?</span>
                )}
              </div>
              <input
                name="password"
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white transition"
              />
            </div>

            {error && (
              <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-100 rounded-lg">
                <svg className="w-4 h-4 text-red-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/>
                </svg>
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white text-sm font-medium rounded-lg transition-colors duration-150 flex items-center justify-center gap-2"
            >
              {loading && (
                <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                </svg>
              )}
              {loading ? "Please wait..." : mode === "login" ? "Sign in" : "Create account"}
            </button>
          </form>

          <p className="text-center text-sm text-slate-500 mt-6">
            {mode === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              onClick={() => { setMode(mode === "login" ? "signup" : "login"); setError("") }}
              className="text-blue-600 font-medium hover:underline"
            >
              {mode === "login" ? "Sign up for free" : "Sign in"}
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}
