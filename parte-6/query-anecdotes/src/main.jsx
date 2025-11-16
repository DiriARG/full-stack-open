import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import App from './App'
import { NotificacionContextProvider } from './NotificacionContext'

// Se crea una nueva instancia de QueryClient.
const clienteQuery = new QueryClient()

createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={clienteQuery}>
    {/* Se envuelve toda la app con el Context Provider,
        lo que permite que cualquier componente pueda usar
        useContext(NotificacionContext).
    */}
    <NotificacionContextProvider>
      <App />
    </NotificacionContextProvider>
  </QueryClientProvider>,
)
