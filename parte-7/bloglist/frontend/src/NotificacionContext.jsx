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

const NotificacionContext = createContext()

export const NotificacionContextProvider = ({ children }) => {
  const [notificacion, notificacionDispatch] = useReducer(
    notificacionReducer,
    '',
  )

  return (
    <NotificacionContext.Provider value={[notificacion, notificacionDispatch]}>
      {children}
    </NotificacionContext.Provider>
  )
}

export default NotificacionContext
