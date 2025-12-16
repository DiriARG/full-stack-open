import axios from "axios";
import type { Diario } from "../tipos";

const urlBase = "http://localhost:3000/api/diaries";

export const obtenerTodosLosDiarios = () => {
  /* "axios.get<Diario[]>" indica que esperamos que el backend nos devuelva un array de objetos con la forma del tipo Diario.
  Typescript validará que el uso de la respuesta coincida con esa estructura. */
  return axios.get<Diario[]>(urlBase).then((respuesta) => respuesta.data);
};
