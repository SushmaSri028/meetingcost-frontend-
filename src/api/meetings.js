// src/api/meetings.js
import { api } from './auth'

export const getMeetings = () => api.get('/meetings')
export const getStats    = () => api.get('/meetings/stats')
export const syncCalendar = () => api.post('/calendar/sync')