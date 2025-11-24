const Notificacion = ({ mensaje }) => {
  if (mensaje === null) {
    return null
  }

  return <div className={mensaje.tipo}>{mensaje.texto}</div>
}

export default Notificacion