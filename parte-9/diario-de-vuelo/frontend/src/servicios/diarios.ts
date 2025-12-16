import axios from "axios";
import type { Diario, NuevoDiario } from "../tipos";

const urlBase = "http://localhost:3000/api/diaries";

export const obtenerTodosLosDiarios = () => {
  /* "axios.get<Diario[]>" indica que esperamos que el backend nos devuelva un array de objetos con la forma del tipo Diario.
  Typescript validará que el uso de la respuesta coincida con esa estructura. */
  return axios.get<Diario[]>(urlBase).then((respuesta) => respuesta.data);
};

// Se envia un "NuevoDiario" (sin id).
export const crearDiario = (objeto: NuevoDiario) => {
  return axios
    // El back responde con un solo diario por eso es <Diario> y no <Diario[]>.
    .post<Diario>(urlBase, objeto)
    .then((respuesta) => respuesta.data);
};
