// Componente que contiene el formulario y toda la lógica para manejar el envío de nuevas anécdotas.

import { useDispatch } from "react-redux";
import { crearNuevaAnecdota } from "../reducers/anecdoteReducer";
import { setNotificationConTiempo } from "../reducers/notificacionReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const crearAnecdota = (evento) => {
    evento.preventDefault();
    /* Obtiene el valor escrito en el input 
    "evento.target" es el <form> y como el input tiene name="anecdota" se puede acceder directamente a él como evento.target.anecdota. "value" es el texto que el usuario escribió. */
    const contenido = evento.target.anecdota.value;
    // Se limpia el input (borra el texto que el usuario acaba de enviar el formulario), dejando el campo listo para una nueva entrada.
    evento.target.anecdota.value = "";
    // Se utiliza el Action Creator importado.
    dispatch(crearNuevaAnecdota(contenido));
    dispatch(setNotificationConTiempo(`Anécdota creada: '${contenido}'`, 5));
  };

  return (
    <div>
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

export default AnecdoteForm;
