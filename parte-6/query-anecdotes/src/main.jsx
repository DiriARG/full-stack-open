import { createRoot } from "react-dom/client"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import App from './App'

// Se crea una nueva instancia de QueryClient. 
const clienteQuery = new QueryClient()

createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={clienteQuery}>
    <App />
  </QueryClientProvider>
)