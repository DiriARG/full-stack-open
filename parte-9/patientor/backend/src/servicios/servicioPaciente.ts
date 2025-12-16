import { v1 as uuid } from "uuid";
import pacientes from "../data/pacientesTipados";
import { PacienteSinSsn, NuevoPaciente, Paciente } from "../tipos";

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

export default {
  obtenerPacientes,
  agregarPaciente,
  obtenerPacientePorID,
};
