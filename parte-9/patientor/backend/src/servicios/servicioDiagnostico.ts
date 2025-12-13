import diagnosticos from "../data/diagnosticosTipados";
import { Diagnostico } from "../tipos";

const obtenerDiagnosticos = (): Diagnostico[] => {
  return diagnosticos;
};

export default {
  obtenerDiagnosticos,
};
