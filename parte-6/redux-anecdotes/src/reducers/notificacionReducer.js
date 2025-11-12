import { createSlice } from "@reduxjs/toolkit";

const estadoInicial = "¡Bienvenido a la aplicación de anécdotas!";

const notificacionSlice = createSlice({
  name: "notificacion",
  initialState: estadoInicial,
  reducers: {
    // Acción para cambiar el mensaje de notificación.
    /* Se usa el prefijo "set" cuando la acción reemplaza completamente un valor existente del estado. No hay una lógica más específica (no se "crea", "elimina", "incrementa"), sino simplemente actualiza el valor actual. 
        Se usa nombres específicos como "crearNuevaAnecdota" o "votarAnecdota" cuando la acción no reemplaza completamente el estado, sino que lo trasnforma o muta parcialmente. Además hay una lógica interna más eleborada como buscar ids, copiar objetos, ordenar arrays...*/
    setNotificacion(state, action) {
      return action.payload;
    },
    limpiarNotificacion() {
      return "";
    },
  },
});

// Action creators asincrónicos (thunk).
export const setNotificationConTiempo = (mensaje, segundos) => {
  // Un thunk devuelve una función (en lugar de objetos de acción) que recibe "dispatch" para manejar lógica asíncrona.
  return (dispatch) => {
    // Establece el mensaje de notificación inmediatamente.
    dispatch(setNotificacion(mensaje));

    // Limpia la notificación después del tiempo especificado.
    setTimeout(() => {
      dispatch(limpiarNotificacion());
    }, segundos * 1000);
  };
};

export const { setNotificacion, limpiarNotificacion } =
  notificacionSlice.actions;
export default notificacionSlice.reducer;
