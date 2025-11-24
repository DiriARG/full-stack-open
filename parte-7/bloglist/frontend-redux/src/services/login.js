import axios from 'axios'
const urlBase = '/api/login'

const login = async (credenciales) => {
  const respuesta = await axios.post(urlBase, credenciales)
  return respuesta.data
}

export default { login }
