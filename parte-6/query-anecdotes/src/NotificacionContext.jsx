import { createContext, useReducer } from 'react'

const notificacionReducer = (state, action) => {
  switch (action.type) {
    case 'SET':
      return action.payload
    case 'LIMPIAR':
      return ''
    default:
      return state
  }
}

/* Se crea el contexto que permitirá compartir el estado y el dispatch.
Este contexto será usado por cualquier componente que necesite leer o cambiar la notificación. */
const NotificacionContext = createContext()

export const NotificacionContextProvider = ({ children }) => {
  /* useReducer devuelve:
  notificacion --> Estado actual.
  notificacionDispatch --> Función para enviar acciones al reducer.  
  */
  const [notificacion, notificacionDispatch] = useReducer(
    notificacionReducer,
    '', // Estado inicial: Sin notificación.
  )

  /* El Provider expone el estado y el dispatch en un array:
  [notificacion, notificacionDispatch]
  Cualquier componente que use: useContext(NotificacionContext) podrá acceder a ambos valores. */
  return (
    <NotificacionContext.Provider value={[notificacion, notificacionDispatch]}>
      {children}
    </NotificacionContext.Provider>
  )
}

export default NotificacionContext
