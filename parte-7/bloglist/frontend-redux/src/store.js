import { configureStore } from '@reduxjs/toolkit'
import notificacionReducer from './reducers/notificacionReducer'

const store = configureStore({
  reducer: {
    notificacion: notificacionReducer,
  },
})

export default store
