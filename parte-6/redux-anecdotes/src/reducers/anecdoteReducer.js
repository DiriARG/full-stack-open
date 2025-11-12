import { createSlice } from "@reduxjs/toolkit";

const anecdotesAtStart = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

const initialState = anecdotesAtStart.map(asObject);
/*
  Creación del slice:
  - name: nombre interno para identificar las acciones.
  - initialState: el estado inicial del reducer.
  - reducers: funciones que modifican el estado.
*/
const anecdotaSlice = createSlice({
  name: "anecdotas",
  initialState,
  reducers: {
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
      const contenido = action.payload;
      const nuevaAnecdota = {
        // Estructura que espera la UI (App.jsx --> AnecdoteList.jsx).
        content: contenido,
        id: getId(),
        votes: 0,
      };
      const estadoActualizado = [...state, nuevaAnecdota];
      // Se realiza el ordenamiento antes de devolverlo por consistencia del estado y experiencia del usuario (UX).
      return [...estadoActualizado].sort(
        (anecdota1, anecdota2) => anecdota2.votes - anecdota1.votes
      );
    },
  },
});

// Exportación de las acciones generadas automáticamente por createSlice.
export const { votarAnecdota, crearNuevaAnecdota } = anecdotaSlice.actions;

// Exportación del reducer para usarlo en store.js.
export default anecdotaSlice.reducer;
