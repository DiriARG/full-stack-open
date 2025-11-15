import axios from 'axios'
const urlBase = 'http://localhost:3001/anecdotes'

export const obtenerAnecdotas = async () => {
  const respuesta = await axios.get(urlBase)
  return respuesta.data
}

export const crearAnecdota = async (nuevaAnecdota) => {
  const respuesta = await axios.post(urlBase, nuevaAnecdota)
  return respuesta.data
}
