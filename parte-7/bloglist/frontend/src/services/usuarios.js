import axios from 'axios'
const urlBase = '/api/users'

const obtenerTodo = async () => {
  const respuesta = await axios.get(urlBase)
  return respuesta.data
}

export default { obtenerTodo }
