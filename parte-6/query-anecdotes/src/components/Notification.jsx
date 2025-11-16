import { useContext } from 'react'
import NotificacionContext from '../NotificacionContext'

const Notification = () => {
  // Se extrae SOLO la notificación del conteo (índice 0).
  const [notificacion] = useContext(NotificacionContext)
  
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  }

  // Si no hay mensaje no se muestra el componente.
  if (!notificacion) return null

  // Se renderiza la notificación en pantalla.
  return <div style={style}>{notificacion}</div>
}

export default Notification
