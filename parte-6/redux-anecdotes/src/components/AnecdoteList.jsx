// Componente que renderiza la lista de anécdotas y maneja la lógica de votación.
import { useDispatch, useSelector } from "react-redux";
import { votarAnecdota } from "../reducers/anecdoteReducer";

const AnecdoteList = () => {
  // Se obtiene el estado global (lista de anécdotas) desde el store de Redux.
  const anecdotes = useSelector((state) => state);
  const dispatch = useDispatch();

  const vote = (id) => {
    console.log("vote", id);
    dispatch(votarAnecdota(id));
  };

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
