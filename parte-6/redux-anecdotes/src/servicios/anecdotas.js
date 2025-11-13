import axios from "axios";
const urlBase = "http://localhost:3001/anecdotes";

const obtenerTodo = async () => {
  const respuesta = await axios.get(urlBase)
  return respuesta.data
};

export default { obtenerTodo };
