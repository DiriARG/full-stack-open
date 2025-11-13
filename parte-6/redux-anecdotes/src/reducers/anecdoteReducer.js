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

    votarAnecdota(state, action) {
      // El payload contiene el id de la anécdota a la cual se quiere votar.
      const id = action.payload;
      // Se recorre la lista de anécdotas y se genera un nuevo array con la anécdota votada actualizada.
      const estadoActualizado = state.map((anecdota) =>
        // Si el id coincide, se copia el objeto y se incrementa su cantidad de votos.
        anecdota.id === id
          ? { ...anecdota, votes: anecdota.votes + 1 }
          : anecdota
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
export const { setAnecdotas, votarAnecdota, crearNuevaAnecdota } =
  anecdotaSlice.actions;

export const inicializarAnecdotas = () => {
  return async (dispatch) => {
    // Llama al servicio para obtener todas las anécdotas del servidor.
    const anecdotas = await servicioDeAnecdotas.obtenerTodo();
    // Se ejucuta con la acción "setAnecdotas", la cual tiene la lista de anécdotas en su payload. 
    dispatch(setAnecdotas(anecdotas));
  };
};

// Exportación del reducer para usarlo en store.js.
export default anecdotaSlice.reducer;
