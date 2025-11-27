import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const notificacionSlice = createSlice({
  name: 'notificacion',
  initialState,
  reducers: {
    setNotificacion(state, action) {
      return action.payload
    },
    limpiarNotificacion() {
      // Mejor null que "".
      return null
    },
  },
})

export const { setNotificacion, limpiarNotificacion } =
  notificacionSlice.actions
export default notificacionSlice.reducer
