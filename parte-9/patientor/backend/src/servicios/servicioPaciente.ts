import { v1 as uuid } from "uuid";
import pacientes from "../data/pacientesTipados";
import { PacienteSinSsn, NuevoPaciente, Paciente, Entry, NuevaEntrada } from "../tipos";

const obtenerPacientes = (): PacienteSinSsn[] => {
  /* Se desestructura el objeto "Paciente" (viene de pacientesTipados.ts);
  Se extrae y se descarta el campo "ssn" (se coloca: _ssn para indicarle a eslint que no se va a utilizar).
  "..restoPaciente" tiene el resto de las propiedades del objeto. Por último se devuelve "restoPaciente" que cumple con el retorno "PacienteSinSsn[]". */
  return pacientes.map(({ ssn: _ssn, ...restoPaciente }) => restoPaciente);
};

const agregarPaciente = (datos: NuevoPaciente): Paciente => {
  const nuevoPaciente: Paciente = {
    id: uuid(),
    // Siempre empieza vacío.
    entries: [],
    ...datos,
  };

  pacientes.push(nuevoPaciente);
  return nuevoPaciente;
};

const obtenerPacientePorID = (id: string): Paciente | undefined => {
  return pacientes.find((paciente) => paciente.id === id);
};

const agregarEntradaAPaciente = (
  pacienteId: string,
  // Es una de las variantes válidas, osea: Hospital | OccupationalHealthcare | HealthCheck pero sin id.  
  entrada: NuevaEntrada
): Entry => {
  const paciente = obtenerPacientePorID(pacienteId);

  if (!paciente) {
    throw new Error("Paciente no encontrado");
  }

  const nuevaEntrada: Entry = {
    // Se le agrega el id para que se convierta en una "Entry".
    id: uuid(),
    ...entrada,
  };

  paciente.entries.push(nuevaEntrada);
  return nuevaEntrada;
};


export default {
  obtenerPacientes,
  agregarPaciente,
  obtenerPacientePorID,
  agregarEntradaAPaciente
};
