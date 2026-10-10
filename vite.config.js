import process from 'node:process'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const sanityProjectId = env.VITE_SANITY_PROJECT_ID?.trim()
  const sanityProxy = sanityProjectId
    ? {
        '/sanity-cdn': {
          target: `https://${sanityProjectId}.apicdn.sanity.io`,
          changeOrigin: true,
          secure: true,
          rewrite: (path) => path.replace(/^\/sanity-cdn/, ''),
        },
      }
    : {}

  return {
  base: process.env.GH_PAGES === 'true' ? '/J-Events/' : '/',
  plugins: [react()],
  optimizeDeps: {
    include: ['sanity', '@sanity/vision', '@portabletext/react'],
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8787',
        changeOrigin: true,
      },
      ...sanityProxy,
    },
  },
  }
})
