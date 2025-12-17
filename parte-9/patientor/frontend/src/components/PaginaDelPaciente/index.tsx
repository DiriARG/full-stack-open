import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Patient, Diagnosis } from "../../types";
import { Male, Female, HelpOutline } from "@mui/icons-material";
import servicioDePacientes from "../../services/patients";

// Prop que recibe desde App.tsx.
interface Prop {
  diagnosticos: Diagnosis[];
}

const PaginaDelPaciente = ({ diagnosticos }: Prop) => {
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

      <h3>entradas</h3>
      {paciente.entries.map((entrada) => (
        <div key={entrada.id} style={{ marginBottom: "1rem" }}>
          <div>
            <strong>{entrada.date}</strong>{" "}
            <span
              style={{
                /* - fontFamily: "sans-serif" define el tipo de letra (familia tipográfico); la familia da el aspecto general de la letra.
                - fontStyle: "italic": define el estilo del texto dentro de esa fuente, osea como se presenta esa letra. */
                fontStyle: "italic",
                fontFamily: "sans-serif",
                fontSize: "14px",
              }}
            >
              {entrada.description}
            </span>
          </div>

          {/* "diagnosisCodes" se renderiza solo si existe. */}
          {entrada.diagnosisCodes && (
            <ul>
              {entrada.diagnosisCodes.map((codigo) => {
                // Se busca el objeto "Diagnosis" cuyo "code" coincida.
                const diagnostico = diagnosticos.find((d) => d.code === codigo);

                return (
                  <li key={codigo}>
                    {/* Si existe se muestra el nombre, caso contrario undefined. */}
                    {codigo} {diagnostico ? diagnostico.name : ""}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};

export default PaginaDelPaciente;
