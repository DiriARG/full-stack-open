// Servicio pequeño para consultar la API de Rest Countries.
import axios from "axios";
const urlBase = "https://studies.cs.helsinki.fi/restcountries/api/all";

const obtenerTodosLosPaises = () => {
  const peticion = axios.get(urlBase);
  return peticion.then((respuesta) => respuesta.data);
};

export default obtenerTodosLosPaises;
