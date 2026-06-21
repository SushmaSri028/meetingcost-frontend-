import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  define: {
    global: 'globalThis',
  },
  server: {
    port: 3000,
    proxy: {
      '/api': 'http://localhost:8080',
      '/oauth2/authorization': 'http://localhost:8080',   // ← only proxy the login trigger
      '/login/oauth2': 'http://localhost:8080',           // ← Spring's internal callback
      '/ws': {
        target: 'http://localhost:8080',
        ws: true,
        changeOrigin: true,
      }
    }
  }
})