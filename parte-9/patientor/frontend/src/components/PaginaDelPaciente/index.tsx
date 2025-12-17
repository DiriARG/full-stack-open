import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Patient } from "../../types";
import { Male, Female, HelpOutline } from "@mui/icons-material";
import servicioDePacientes from "../../services/patients";

const PaginaDelPaciente = () => {
  const { id } = useParams<{ id: string }>();
  const [paciente, setPaciente] = useState<Patient | null>(null);

  useEffect(() => {
    if (id) {
      servicioDePacientes.obtenerPorId(id).then(setPaciente);
    }
  }, [id]);

  if (!paciente) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <h2>
        {paciente.name} {""}
        {/* Renderizado condicional: Si el género del paciente coincide con este valor ("male/female/other"), se muestra el ícono correspondiente, si no, no se muestra nada. */}
        {paciente.gender === "male" && <Male />}
        {paciente.gender === "female" && <Female />}
        {paciente.gender === "other" && <HelpOutline />}
      </h2>

      <div>ssn: {paciente.ssn}</div>
      <div>ocupación: {paciente.occupation}</div>
    </div>
  );
};

export default PaginaDelPaciente;
