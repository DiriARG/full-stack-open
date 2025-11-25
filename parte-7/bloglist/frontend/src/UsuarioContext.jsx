import { createContext, useReducer } from 'react'

// El estado inicial es ningún usuario logueado.
const usuarioInicial = null

const usuarioReducer = (state, action) => {
  switch (action.type) {
  case 'SET_USUARIO':
    return action.payload
  case 'SALIR':
    return null

  default:
    return state
  }
}

const UsuarioContext = createContext()

export const UsuarioContextProvider = ({ children }) => {
  const [usuario, usuarioDispatch] = useReducer(usuarioReducer, usuarioInicial)

  return (
    <UsuarioContext.Provider value={[usuario, usuarioDispatch]}>
      {children}
    </UsuarioContext.Provider>
  )
}

export default UsuarioContext
