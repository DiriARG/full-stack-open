import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (nuevoToken) => {
  token = `Bearer ${nuevoToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const crear = async (nuevoObjeto) => {
  const configuracion = {
    headers: { Authorization: token },
  }

  const respuesta = await axios.post(baseUrl, nuevoObjeto, configuracion)
  return respuesta.data
}

/* Servicio actualizado para recibir un solo parámetro. Esto permite usarlo directamente en "mutationFn", es decir: mutationFn: servicioDeBlogs.actualizar.
Si esta función recibiera dos parámetros (id, blogActualizado), React Query no sabría cómo dividir el dato que le enviamos. */
const actualizar = async (blogActualizado) => {
  const respuesta = await axios.put(
    `${baseUrl}/${blogActualizado.id}`,
    blogActualizado,
  )
  return respuesta.data
}

const eliminar = async (id) => {
  const configuracion = {
    headers: { Authorization: token },
  }
  const respuesta = await axios.delete(`${baseUrl}/${id}`, configuracion)
  return respuesta.data
}

/* Al desestructurar { id, comentario } nos permite que la función pueda usarse  directamente así en mutationFn: "mutationFn: servicioDeBlogs.agregarComentario".
Esto evita tener que hacer esto: mutationFn: ({ id, comentario }) => servicioDeBlogs.agregarComentario(id, comentario)`;
por justamente no desestructurar: `const agregarComentario = async (id, comentario)...`
*/
const agregarComentario = async ({ id, comentario }) => {
  const respuesta = await axios.post(`${baseUrl}/${id}/comments`, {
    comment: comentario,
  })
  return respuesta.data
}

export default {
  getAll,
  crear,
  setToken,
  actualizar,
  eliminar,
  agregarComentario,
}
