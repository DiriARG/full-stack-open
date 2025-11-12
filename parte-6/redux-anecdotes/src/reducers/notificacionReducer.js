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
  },
});

export const { setNotificacion } = notificacionSlice.actions;
export default notificacionSlice.reducer;
