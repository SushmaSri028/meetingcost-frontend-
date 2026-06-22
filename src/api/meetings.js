// src/api/meetings.js
import { api } from './auth'

export const getMeetings  = () => api.get('/meetings').then(r => r.data)
export const getStats     = () => api.get('/meetings/stats').then(r => r.data)
export const syncCalendar = () => api.post('/calendar/sync').then(r => r.data)