import axios from "axios";
const urlBase = "http://localhost:3001/anecdotes";

const obtenerTodo = async () => {
  const respuesta = await axios.get(urlBase)
  return respuesta.data
};

/* Recibe únicamente el contenido, ya que por ej en: "AnecdoteForm", cuando el usuario ingresa texto: dispatch(crearAnecdota(contenido)); 
El thunk "crearAnecdota" solo espera pasarle el contenido, no un objeto armado. 
Por eso el servicio toma contenido y crea adentro el objeto final: { content: contenido, votes: 0 } */
const crear = async (contenido) => {
  const nuevaAnecdota = { content: contenido, votes: 0 };
  const respuesta = await axios.post(urlBase, nuevaAnecdota);
  return respuesta.data; 
};

const actualizar = async (id, nuevaAnecdota) => {
  const respuesta = await axios.put(`${urlBase}/${id}`, nuevaAnecdota);
  return respuesta.data; 
}


export default { obtenerTodo, crear, actualizar };