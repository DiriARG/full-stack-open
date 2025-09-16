/* Módulo responsable de manejar la comunicación con el backend para el recurso "persons".
Exporta un objeto con tres funciones como propiedades:
- obtenerTodo: obtiene todos los contactos (GET)
- crear: crea un nuevo contacto (POST)
- actualizar: actualiza un contacto existente (PUT) */
import axios from "axios";
const urlBase = "http://localhost:3001/persons";

const obtenerTodo = () => {
  const peticion = axios.get(urlBase);
  return peticion.then((respuesta) => respuesta.data);
};

const crear = (nuevoObjeto) => {
  const peticion = axios.post(urlBase, nuevoObjeto);
  return peticion.then((respuesta) => respuesta.data);
};

const actualizar = (id, nuevoObjeto) => {
  const peticion = axios.put(`${urlBase}/${id}`, nuevoObjeto);
  return peticion.then((respuesta) => respuesta.data);
};

export default {
  obtenerTodo,
  crear,
  actualizar,
};
