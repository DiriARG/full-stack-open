import { configureStore } from '@reduxjs/toolkit'
import notificacionReducer from './reducers/notificacionReducer'
import blogReducer from './reducers/blogReducer'
import usuarioReducer from './reducers/usuarioReducer'

const store = configureStore({
  reducer: {
    notificacion: notificacionReducer,
    blogs: blogReducer,
    usuario: usuarioReducer,
  },
})

export default store
