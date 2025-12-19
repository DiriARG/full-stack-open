import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Patient, Diagnosis, NuevaEntrada } from "../../types";
import { Male, Female, HelpOutline } from "@mui/icons-material";
import servicioDePacientes from "../../services/patients";
import DetallesDeLaEntrada from "../DetallesDeLaEntrada";
import FormularioNuevaEntrada from "./FormularioNuevaEntrada";
import axios from "axios";

// Prop que recibe desde App.tsx.
interface Prop {
  diagnosticos: Diagnosis[];
}

const PaginaDelPaciente = ({ diagnosticos }: Prop) => {
  const { id } = useParams<{ id: string }>();
  const [paciente, setPaciente] = useState<Patient | null>(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [error, setError] = useState<string | undefined>();

  useEffect(() => {
    if (id) {
      servicioDePacientes.obtenerPorId(id).then(setPaciente);
    }
  }, [id]);

  const agregarNuevaEntrada = async (entrada: NuevaEntrada) => {
    if (!paciente || !id) return;

    try {
      const nuevaEntrada = await servicioDePacientes.agregarEntrada(
        id,
        entrada
      );

      // Se actualiza el estado del paciente agregando la nueva entrada.
      setPaciente({
        ...paciente,
        entries: paciente.entries.concat(nuevaEntrada),
      });

      // Se cierra el formulario si todo salió bien.
      setMostrarFormulario(false);
      // Limpieza de errores previos.
      setError(undefined);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.error ?? "Error del servidor");
      } else if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Error desconocido");
      }
    }
  };

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

      {!mostrarFormulario && (
        <button onClick={() => setMostrarFormulario(true)}>
          Agregar nueva entrada
        </button>
      )}

      {mostrarFormulario && (
        <FormularioNuevaEntrada
          alEnviar={agregarNuevaEntrada}
          alCancelar={() => setMostrarFormulario(false)}
          error={error}
        />
      )}

      <h3>entradas</h3>
      {paciente.entries.map((entrada) => (
        <div key={entrada.id} style={{ marginBottom: "1rem" }}>
          <DetallesDeLaEntrada entrada={entrada} />

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
