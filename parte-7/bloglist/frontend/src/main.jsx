import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import App from './App'
import './index.css'
import { NotificacionContextProvider } from './NotificacionContext'

const clienteQuery = new QueryClient()

createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={clienteQuery}>
    <NotificacionContextProvider>
      <App />
    </NotificacionContextProvider>
  </QueryClientProvider>,
)
