import pacientes from "../data/pacientesTipados";
import { PacienteSinSsn } from "../tipos";

const obtenerPacientes = (): PacienteSinSsn[] => {
  /* Se desestructura el objeto "Paciente" (viene de pacientesTipados.ts);
  Se extrae y se descarta el campo "ssn" (se coloca: _ssn para indicarle a eslint que no se va a utilizar).
  "..restoPaciente" tiene el resto de las propiedades del objeto. Por último se devuelve "restoPaciente" que cumple con el retorno "PacienteSinSsn[]". */
  return pacientes.map(({ ssn: _ssn, ...restoPaciente }) => restoPaciente);
};

export default {
  obtenerPacientes,
};
