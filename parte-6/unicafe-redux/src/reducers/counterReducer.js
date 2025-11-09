const initialState = {
  good: 0,
  ok: 0,
  bad: 0,
};

const counterReducer = (state = initialState, action) => {
  console.log(action);
  // En cada caso el switch devuelve un nuevo objeto de estado para mantener la inmutabilidad.
  switch (action.type) {
    case "GOOD":
      return {
        ...state,
        good: state.good + 1,
      };
    case "OK":
      return {
        ...state,
        ok: state.ok + 1,
      };
    case "BAD":
      return {
        ...state,
        bad: state.bad + 1,
      };
    case "RESET":
      return initialState;
    default:
      // Devuelve el estado actual en caso de que no coincida la acción.
      return state;
  }
};

export default counterReducer;
