import styled, { css, keyframes } from 'styled-components'
import { useNotificacion } from '../hooks'

// Animación para que la notificación aparezca despacio.
const animacionSuave = keyframes`
  from { opacity: 0; transform: translateY(-6px); }
  to { opacity: 1; transform: translateY(0); }
`

// Estilo base de cualquier notificación.
const NotificacionBase = styled.div`
  padding: 12px 16px;
  border-radius: 6px;
  margin-bottom: 15px;
  font-size: 1rem;
  font-weight: 500;
  animation: ${animacionSuave} 0.3s ease-out;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);

  /* 
    Estilos condicionales según "props.$tipo".
    Esto reemplaza completamente el uso de className.
    Cada bloque solo se aplica si props.$tipo === "exito" o "error".
  */

  ${(props) =>
    props.$tipo === 'exito' &&
    css`
      background: #d4edda;
      color: #155724;
      border-left: 5px solid #28a745;
    `}

  ${(props) =>
    props.$tipo === 'error' &&
    css`
      background: #f8d7da;
      color: #721c24;
      border-left: 5px solid #dc3545;
    `}
`

const Notificacion = () => {
  const mensaje = useNotificacion()

  if (!mensaje) return null

  /*
    Antes: <div className={mensaje.tipo}>{mensaje.texto}</div>
    Ahora: pasamos "$tipo" como prop al componente estilizado.

    Esto permite que styled-components lea el tipo y aplique
    el estilo correcto sin usar clases CSS tradicionales.
  */

  return (
    <NotificacionBase $tipo={mensaje.tipo}>{mensaje.texto}</NotificacionBase>
  )
}

export default Notificacion
