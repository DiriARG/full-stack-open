import { useNotificacion } from '../hooks'

const Notificacion = () => {
  const mensaje = useNotificacion()

  if (!mensaje) return null

  return <div className={mensaje.tipo}>{mensaje.texto}</div>
}

export default Notificacion
