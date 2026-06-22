// src/api/auth.js
import axios from 'axios'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api'
})

// Attach JWT token to every request automatically
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

export async function login(email, password) {
  const res = await api.post('/auth/login', { email, password })
  localStorage.setItem('token', res.data.token)
  localStorage.setItem('user', JSON.stringify(res.data))
  return res.data
}
export async function register(displayName, email, password) {
  const res = await api.post('/auth/register', { displayName, email, password })
  localStorage.setItem('token', res.data.token)
  localStorage.setItem('user', JSON.stringify(res.data))
  return res.data
}

export function logout() {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
}

export function getUser() {
  const u = localStorage.getItem('user')
  return u ? JSON.parse(u) : null
}

export function isLoggedIn() {
  return !!localStorage.getItem('token')
}