# 💸 MeetingCost.io — Frontend

> **React frontend** for MeetingCost.io — real-time meeting cost tracker with JWT auth, Google OAuth2, and a live WebSocket cost ticker.

[![React](https://img.shields.io/badge/React-18-61dafb)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5-646cff)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8)](https://tailwindcss.com/)
[![WebSocket](https://img.shields.io/badge/WebSocket-STOMP.js-purple)](https://stomp.github.io/)

---

## What It Does

A fully featured SPA that connects to the MeetingCost.io Spring Boot API. Users can sign in with email/password or Google, sync their Google Calendar meetings, view cost analytics, and watch a live dollar cost ticker running in real time over WebSocket.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 |
| Build Tool | Vite 5 |
| Routing | React Router v6 |
| Styling | Tailwind CSS v3 |
| HTTP | Axios (with JWT interceptor) |
| WebSocket | @stomp/stompjs + SockJS |

---

## Pages

| Page | Route | Description |
|------|-------|-------------|
| Login / Sign Up | `/login` | JWT login, registration, Google OAuth2 |
| Dashboard | `/dashboard` | Stats cards, sync calendar, quick actions |
| Meetings | `/meetings` | Table of synced Google Calendar meetings |
| Live Ticker | `/ticker` | Real-time cost ticker over WebSocket |

---

## Screenshots

> Add screenshots here after deployment

---

## Getting Started

### Prerequisites

- Node.js 18+
- [meetingcost-api](https://github.com/YOUR_USERNAME/meetingcost-api) running on `localhost:8080`

### 1. Clone the repo

```bash
git clone https://github.com/YOUR_USERNAME/meetingcost-frontend.git
cd meetingcost-frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the dev server

```bash
npm run dev
```

App runs at `http://localhost:3000`

> The Vite dev server proxies all `/api` and `/ws` requests to `http://localhost:8080` automatically — no CORS setup needed.

---

## Project Structure

```
src/
├── api/
│   ├── auth.js          # Axios instance + JWT interceptor, login/logout/register
│   └── meetings.js      # getMeetings(), getStats(), syncCalendar()
├── components/
│   ├── Navbar.jsx        # Top nav with active link highlighting + logout
│   └── PrivateRoute.jsx  # Redirects unauthenticated users to /login
├── pages/
│   ├── LoginPage.jsx     # Sign in / Sign up toggle + Google OAuth2 button
│   ├── DashboardPage.jsx # 4 stat cards + sync + quick actions
│   ├── MeetingsPage.jsx  # Meetings table with per-row Ticker button
│   └── TickerPage.jsx    # Live WebSocket cost ticker
├── App.jsx               # Router + OAuthCallback handler
├── main.jsx              # React entry point
└── index.css             # Tailwind directives
```

---

## Key Architecture Decisions

### JWT interceptor
All API calls share one Axios instance. The request interceptor automatically attaches the JWT from `localStorage` to every request — no manual headers needed anywhere.

```js
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})
```

### Google OAuth2 callback
After Google login, Spring Boot redirects to `/oauth2/callback?token=...`. The `OAuthCallback` component in `App.jsx` reads the token from URL params, saves it to `localStorage`, and navigates to `/dashboard`.

### WebSocket with STOMP.js
Uses the modern `@stomp/stompjs` `Client` API over `SockJS`. The client connects on mount, subscribes to `/topic/cost/{meetingId}`, and updates the UI every second with incoming cost data.

### Vite proxy
The `vite.config.js` proxies only specific paths to avoid the `/oauth2/callback` React route being accidentally forwarded to Spring Boot:

```js
proxy: {
  '/api': 'http://localhost:8080',
  '/oauth2/authorization': 'http://localhost:8080',
  '/login/oauth2': 'http://localhost:8080',
  '/ws': { target: 'http://localhost:8080', ws: true }
}
```

---

## Backend

The Spring Boot API lives in a separate repo:  
👉 [meetingcost-api](https://github.com/YOUR_USERNAME/meetingcost-api)

---

## Built as Part of Full-Stack Boot Camp

| Step | Feature |
|------|---------|
| 1-4 | Spring Boot API (separate repo) |
| 5 | This React frontend |
| 6 | GitHub + documentation |

---

*Built by Sushma Sri Kondamareddy — CS Masters, Florida Atlantic University*
