import axios from "axios";
import { Patient, PatientFormValues, Entry, NuevaEntrada } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(`${apiBaseUrl}/patients`);

  return data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(`${apiBaseUrl}/patients`, object);

  return data;
};

const obtenerPorId = async (id: string) => {
  // Se desestructura para obtener data directamente.
  const { data } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
  return data;
};

/* Retorna una Promise porque las llamadas a la API no son instantáneas. El tipo Promise<Entry> le indica a TypeScript que el resultado final de esta operación será un objeto de tipo Entry, permitiendo el uso de await para esperar su resolución. 
El front envía "NuevaEntrada" sin id; el back valida los datos, genera el id y devuelve una Entry completa con id. */
const agregarEntrada = async (
  pacienteId: string,
  entrada: NuevaEntrada
): Promise<Entry> => {
  const { data } = await axios.post<Entry>(
    `${apiBaseUrl}/patients/${pacienteId}/entries`,
    entrada
  );
  return data;
};

export default {
  getAll,
  create,
  obtenerPorId,
  agregarEntrada
};
