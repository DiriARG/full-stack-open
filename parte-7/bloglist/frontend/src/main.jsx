import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter } from 'react-router-dom'

import App from './App'
import './index.css'
import { NotificacionContextProvider } from './NotificacionContext'
import { UsuarioContextProvider } from './UsuarioContext'

const clienteQuery = new QueryClient()

createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={clienteQuery}>
    <UsuarioContextProvider>
      <NotificacionContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </NotificacionContextProvider>
    </UsuarioContextProvider>
  </QueryClientProvider>,
)
