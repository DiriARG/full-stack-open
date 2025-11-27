import { configureStore } from '@reduxjs/toolkit'
import notificacionReducer from './reducers/notificacionReducer'
import blogReducer from './reducers/blogReducer'

const store = configureStore({
  reducer: {
    notificacion: notificacionReducer,
    blogs: blogReducer,
  },
})

export default store
