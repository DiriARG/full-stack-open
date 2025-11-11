// Componente que renderiza la lista de anécdotas y maneja la lógica de votación.
import { useDispatch, useSelector } from "react-redux";
import { votarAnecdota } from "../reducers/anecdoteReducer";

const AnecdoteList = () => {
  const anecdotes = useSelector((state) =>
    // "filter()" recorre la lista de anécdotas del store ("state.anecdotas"). "anecdota" representa una anécdota individual de ese array.
    state.anecdotas.filter((anecdota) =>
      /* Se filtran las anécdotas según el texto ingresado en el filtro.
       Se convierten ambos a minúsculas para evitar diferencias entre mayúsculas y minúsculas.
       - anecdota.content → el texto de la anécdota.
       - state.filtro → el texto que el usuario escribe en el input del filtro.

       Si anecdota.content contiene (incluye) el texto escrito en el filtro, entonces "includes()" devuelve true, y esa anécdota se mantiene en la lista mostrada. */
      anecdota.content.toLowerCase().includes(state.filtro.toLowerCase())
    )
  );
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
