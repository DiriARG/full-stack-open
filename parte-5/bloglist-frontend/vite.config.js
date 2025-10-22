import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3003',
        changeOrigin: true,
      },
    },
  },
  test: {
    // Le dice a Vitest que use un DOM simulado.
    environment: 'jsdom',
    // Para usar describe, test, expect sin importar Vitest en cada archivo.
    globals: true,
    // Configuraciones globales.
    setupFiles: './configuracionTests.js',
  },
})
