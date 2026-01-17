import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      // En lugar de esperar que el sistema operativo envíe una señal de cambio, Vite revisa activametne los archivos cada pocos milisegundos.
      usePolling: true,
    },
    // Permite que el servidor de Vite escuche en todas las direcciones de red del contenedor (0.0.0.0). Sin esto, el contenedor no aceptaría las conexiones que vienen desde el navegador en Windows.
    host: true,
  },
  test: {
    environment: 'jsdom',
    globals: true,
  }
})
