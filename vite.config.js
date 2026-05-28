import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: process.env.GH_PAGES === 'true' ? '/J-Events/' : '/',
  plugins: [react()],
  assetsInclude: ['**/*.mov', '**/*.MOV'],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8787',
        changeOrigin: true,
      },
    },
  },
})
