import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'
import { NotificacionContextProvider } from './NotificacionContext'

createRoot(document.getElementById('root')).render(
  <NotificacionContextProvider>
    <App />
  </NotificacionContextProvider>,
)
