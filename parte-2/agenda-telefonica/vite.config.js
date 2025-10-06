import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // En modo desarrollo, Vite redirige todas las peticiones que comienzan con /api al servidor Express en el puerto 10000.
      '/api': {
        target: 'http://localhost:3001', // Siempre tiene que apuntar al puerto donde se está ejecutando el servidor backend (Express).
        changeOrigin: true,
      },
    }
  },
})
