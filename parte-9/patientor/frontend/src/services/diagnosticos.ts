import axios from "axios";
import { Diagnosis } from "../types";
import { apiBaseUrl } from "../constants";

const obtenerTodos = async () => {
  // Se usa "Diagnosis[]" porque el backend devuelve un array completo de diagnósticos.
  const { data } = await axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnoses`);
  return data;
};

export default {
  obtenerTodos,
};
