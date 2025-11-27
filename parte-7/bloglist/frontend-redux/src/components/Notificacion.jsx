import { useSelector } from 'react-redux'

const Notificacion = () => {
  const mensaje = useSelector((state) => state.notificacion)

  if (mensaje === null) return null

  return <div className={mensaje.tipo}>{mensaje.texto}</div>
}

export default Notificacion
