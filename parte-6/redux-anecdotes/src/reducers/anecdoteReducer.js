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

const reducer = (state = initialState, action) => {
  console.log("state now: ", state);
  console.log("action", action);

  switch (action.type) {
    case "VOTE": {
      // El payload contiene el id de la anécdota a la cual se quiere votar.
      const id = action.payload;
      // Se recorre cada anécdota...
      return state.map((anecdota) =>
        anecdota.id === id
          ? // Si coincide el id, copia y actualiza solo la anécdota votada.
            { ...anecdota, votes: anecdota.votes + 1 }
          : anecdota
      );
    }
    case "CREAR": {
      const contenido = action.payload;
      const nuevaAnecdota = {
        // Propiedades que espera la UI (App.jsx).
        content: contenido,
        id: getId(),
        votes: 0,
      };
      return [...state, nuevaAnecdota];
    }
    default:
      return state;
  }
};

export default reducer;
