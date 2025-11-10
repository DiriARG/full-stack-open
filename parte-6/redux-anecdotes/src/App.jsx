import { useDispatch, useSelector } from "react-redux";
import { votarAnecdota, crearNuevaAnecdota } from "./reducers/anecdoteReducer";

const App = () => {
  const anecdotes = useSelector((state) => state);
  const dispatch = useDispatch();

  const vote = (id) => {
    console.log("vote", id);
    dispatch(votarAnecdota(id))
  };

  const crearAnecdota = (evento) => {
    evento.preventDefault();
    /* Obtiene el valor escrito en el input 
    "evento.target" es el <form> y como el input tiene name="anecdota" se puede acceder directamente a él como evento.target.anecdota. "value" es el texto que el usuario escribió. */
    const contenido = evento.target.anecdota.value;
    // Se limpia el input (borra el texto que el usuario acaba de enviar el formulario), dejando el campo listo para una nueva entrada.
    evento.target.anecdota.value = "";
    dispatch(crearNuevaAnecdota(contenido));
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
      <h2>create new</h2>
      <form onSubmit={crearAnecdota}>
        <div>
          <input name="anecdota" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default App;
