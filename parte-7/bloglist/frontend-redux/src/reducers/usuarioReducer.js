import { createSlice } from '@reduxjs/toolkit'
import servicioLogin from '../services/login'
import servicioDeBlogs from '../services/blogs'

const initialState = null

const usuarioSlice = createSlice({
  name: 'usuario',
  initialState,
  reducers: {
    setUsuario(state, action) {
      return action.payload
    },
    limpiarUsuario() {
      return null
    },
  },
})

export const { setUsuario, limpiarUsuario } = usuarioSlice.actions

export const inicializarUsuario = () => {
  return (dispatch) => {
    const usuarioLogueadoJSON = window.localStorage.getItem(
      'usuarioBlogListLogueado',
    )
    if (usuarioLogueadoJSON) {
      const usuario = JSON.parse(usuarioLogueadoJSON)
      servicioDeBlogs.setToken(usuario.token)
      dispatch(setUsuario(usuario))
    }
  }
}

export const loginUsuario = (credenciales) => {
  return async dispatch => {
    const usuario = await servicioLogin.login(credenciales)

    window.localStorage.setItem(
      'usuarioBlogListLogueado',
      JSON.stringify(usuario)
    )

    servicioDeBlogs.setToken(usuario.token)
    dispatch(setUsuario(usuario))
  }
}

export const salirUsuario = () => {
  return dispatch => {
    window.localStorage.removeItem('usuarioBlogListLogueado')
    dispatch(limpiarUsuario())
  }
}

export default usuarioSlice.reducer