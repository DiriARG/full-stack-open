import axios from "axios";
const baseUrl = "/api/blogs";

// Variable para almacenar el JWT.
let token = null;

// Permite establecer (o actualizar) el token actual de autenticación.
const setToken = (nuevoToken) => {
  token = `Bearer ${nuevoToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

// Función para crear un nuevo blog.
const crear = async (nuevoObjeto) => {
  const configuracion = {
    headers: { Authorization: token },
  };

  // A la url, se envía la data (el nuevo blog) y la configuración de autenticación.
  const respuesta = await axios.post(baseUrl, nuevoObjeto, configuracion);
  return respuesta.data;
};

const actualizar = async (id, blogActualizado) => {
  const respuesta = await axios.put(`${baseUrl}/${id}`, blogActualizado);
  return respuesta.data;
};

export default { getAll, crear, setToken, actualizar };
