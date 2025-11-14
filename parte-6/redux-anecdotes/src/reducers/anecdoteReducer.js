import { createSlice } from "@reduxjs/toolkit";
import servicioDeAnecdotas from "../servicios/anecdotas";

/*
  Creación del slice:
  - name: nombre interno para identificar las acciones.
  - initialState: el estado inicial del reducer.
  - reducers: funciones que modifican el estado.
*/
const anecdotaSlice = createSlice({
  name: "anecdotas",
  // Por defecto no hay notas.
  initialState: [],
  reducers: {
    // Reemplaza completamente el estado por las anécdotas obtenidas del backend.
    setAnecdotas(state, action) {
      return action.payload;
    },

    // Actualización de una anécdota después de recibirla del backend (json-server).
    actualizarAnecdotaEnStore(state, action) {
      // Anécdota devuelta por el back.
      const anecdotaActualizada = action.payload;
      // Se crea un nuevo array donde se reemplaza únicamente la anécdota actualizada.
      const estadoActualizado = state.map((anecdota) =>
        anecdota.id === anecdotaActualizada.id ? anecdotaActualizada : anecdota
      );
      // Se usa spread para crear una copia antes de ordenar (de mayor a menor) por tema de inmutabilidad, luego se lo devuelve.
      return [...estadoActualizado].sort(
        (anecdota1, anecdota2) => anecdota2.votes - anecdota1.votes
      );
    },

    crearNuevaAnecdota(state, action) {
      const nuevaAnecdota = action.payload;
      const estadoActualizado = [...state, nuevaAnecdota];
      // Se realiza el ordenamiento antes de devolverlo por consistencia del estado y experiencia del usuario (UX).
      return [...estadoActualizado].sort(
        (anecdota1, anecdota2) => anecdota2.votes - anecdota1.votes
      );
    },
  },
});

// Exportación de las acciones generadas automáticamente por createSlice.
export const { setAnecdotas, actualizarAnecdotaEnStore, crearNuevaAnecdota } =
  anecdotaSlice.actions;

/* Anotación: 
Ejercicios 6.16 y 6.17 ya realizados previamente en los ejercicios 6.14 y 6.15 respectivamente.  */

export const inicializarAnecdotas = () => {
  return async (dispatch) => {
    // Llama al servicio para obtener todas las anécdotas del servidor.
    const anecdotas = await servicioDeAnecdotas.obtenerTodo();
    // Se ejucuta con la acción "setAnecdotas", la cual tiene la lista de anécdotas en su payload.
    dispatch(setAnecdotas(anecdotas));
  };
};

// Thunk: crea una nueva anécdota en el backend y luego la añade al store.
export const crearAnecdota = (contenido) => {
  return async (dispatch) => {
    const nuevaAnecdota = await servicioDeAnecdotas.crear(contenido);
    dispatch(crearNuevaAnecdota(nuevaAnecdota));
  };
};

export const votarAnecdota = (id) => {
  return async (dispatch, getState) => {
    // Se obtiene la lista actual de anécdotas desde el store gracias a "getState()".
    const estadoActual = getState().anecdotas;
    // Se busca a la anécdota que se desea votar mediante su id.
    const anecdotaEncontrada = estadoActual.find((anecdota) => anecdota.id === id);

    // Se crea una copia con los votos incrementados.
    const anecdotaActualizada = {
      ...anecdotaEncontrada,
      votes: anecdotaEncontrada.votes + 1,
    };

    // Se envia la anécdota actualizada al backend.
    const resultado = await servicioDeAnecdotas.actualizar(
      id,
      anecdotaActualizada
    );

    // Actualización del store de Redux con la versión final aprobado por el backend.
    dispatch(actualizarAnecdotaEnStore(resultado));
  };
};

// Exportación del reducer para usarlo en store.js.
export default anecdotaSlice.reducer;
