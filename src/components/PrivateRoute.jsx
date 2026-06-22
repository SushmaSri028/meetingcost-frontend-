// src/components/PrivateRoute.jsx
import { Navigate } from 'react-router-dom'
import { isLoggedIn } from '../api/auth'

export default function PrivateRoute({ children }) {
  return isLoggedIn() ? children : <Navigate to="/login" replace />
}