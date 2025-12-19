import { useState } from "react";
import { Button, TextField, Box, Alert, MenuItem } from "@mui/material";
import { NuevaEntrada, HealthCheckRating } from "../../types";

interface Props {
  // Función que recibe la nueva entrada y la envía al backend.
  alEnviar: (entrada: NuevaEntrada) => void;
  // Cancela el formulario (lo oculta).
  alCancelar: () => void;
  // Mensaje de error devuelto por el backend (opcional).
  error?: string;
}

const FormularioNuevaEntrada = ({ alEnviar, alCancelar, error }: Props) => {
  // Este estado indica qué tipo de entrada médica el usuario quiere crear (ts solo permitirá estos 3 valores). Cuando el form. se abre, por defecto muestra el form. de HealthCheck.
  const [tipo, setTipo] = useState<
    "HealthCheck" | "Hospital" | "OccupationalHealthcare"
  >("HealthCheck");

  // Estados comunes en los 3 tipos.
  const [descripcion, setDescripcion] = useState("");
  const [fecha, setFecha] = useState("");
  const [especialista, setEspecialista] = useState("");
  const [codigosDiagnostico, setCodigosDiagnostico] = useState("");

  // HealthCheck.
  const [healthCheckRating, setHealthCheckRating] = useState("");

  // Hospital.
  const [fechaAlta, setFechaAlta] = useState("");
  const [criterioAlta, setCriterioAlta] = useState("");

  // OccupationalHealthcare.
  const [empleador, setEmpleador] = useState("");
  const [inicioLicencia, setInicioLicencia] = useState("");
  const [finLicencia, setFinLicencia] = useState("");

  const enviarFormulario = (evento: React.FormEvent) => {
    evento.preventDefault();

    // Campos base compartidos por todos los tipos. Se construye la entrada con las claves que espera el backend.
    const base = {
      description: descripcion,
      date: fecha,
      specialist: especialista,
      /* Operación ternaria: Si existe, el usuario ingresa los códigos como un string separados por comas ej: "Z57.1, N30.0";
      Luego con el split(",") se convierte ese string en un array: ["Z57.1", "N30.0"].
      Por ultimo el map y trim es para eliminar espacios extra en cada código. */
      diagnosisCodes: codigosDiagnostico
        ? codigosDiagnostico.split(",").map((codigo) => codigo.trim())
        : // Si el campo está vacio, se envia un array vacío [], ya que el backend admite diagnosisCodes como opcional.
          [],
    };

    switch (tipo) {
      case "HealthCheck":
        alEnviar({
          type: "HealthCheck",
          ...base,
          healthCheckRating: Number(healthCheckRating) as HealthCheckRating,
        });
        break;

      case "Hospital":
        alEnviar({
          type: "Hospital",
          ...base,
          discharge: {
            date: fechaAlta,
            criteria: criterioAlta,
          },
        });
        break;

      case "OccupationalHealthcare":
        alEnviar({
          type: "OccupationalHealthcare",
          ...base,
          employerName: empleador,
          sickLeave:
            // Solo si existen ambas fechas, se añade el objeto "sickLeave".
            inicioLicencia && finLicencia
              ? {
                  startDate: inicioLicencia,
                  endDate: finLicencia,
                }
              : undefined,
        });
        break;

      default:
        const _nunca: never = tipo;
        throw new Error(`Tipo de entrada no soportado: ${_nunca}`);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={enviarFormulario}
      sx={{ border: "1px dashed gray", padding: 2, marginBottom: 2 }}
    >
      <h3>Nueva entrada HealthCheck</h3>

      {/* Error del backend. */}
      {error && <Alert severity="error">{error}</Alert>}

      {/* Selector de tipo de entrada. */}
      <TextField
        // Le dice a Material UI que este TextField no es un input común, sino un selector desplegable.
        select
        label="Tipo de entrada"
        fullWidth
        margin="normal"
        value={tipo}
        /* 'evento.target.value' es tratado por defecto como un "string" genérico. 
        Como el estado "tipo" solo acepta tres valores específicos, se utiliza "as typeof tipo" (un type assertion) para asegurarle a TypeScript que el valor 
        seleccionado es uno de esos tres valores válidos y no cualquier otra cadena de texto. */
        onChange={(evento) => setTipo(evento.target.value as typeof tipo)}
      >
        <MenuItem value="HealthCheck">HealthCheck</MenuItem>
        <MenuItem value="Hospital">Hospital</MenuItem>
        <MenuItem value="OccupationalHealthcare">
          Occupational Healthcare
        </MenuItem>
      </TextField>

      {/* Campos comunes. */}
      <TextField
        label="Descripción"
        fullWidth
        margin="normal"
        value={descripcion}
        onChange={(evento) => setDescripcion(evento.target.value)}
      />

      <TextField
        label="Fecha"
        placeholder="YYYY-MM-DD"
        fullWidth
        margin="normal"
        value={fecha}
        onChange={(evento) => setFecha(evento.target.value)}
      />

      <TextField
        label="Especialista"
        fullWidth
        margin="normal"
        value={especialista}
        onChange={(evento) => setEspecialista(evento.target.value)}
      />

      <TextField
        label="Códigos de diagnóstico"
        placeholder="Z57.1, N30.0"
        fullWidth
        margin="normal"
        value={codigosDiagnostico}
        onChange={(evento) => setCodigosDiagnostico(evento.target.value)}
      />

      {/* HealthCheck. */}
      {tipo === "HealthCheck" && (
        <TextField
          label="HealthCheck rating (0–3)"
          fullWidth
          margin="normal"
          value={healthCheckRating}
          onChange={(evento) => setHealthCheckRating(evento.target.value)}
        />
      )}

      {/* Hospital. */}
      {tipo === "Hospital" && (
        <>
          {/* Se usa el Fragment <> para agrupar los campos en un contenedor único, ya que React no permite devolver múltiples elementos sueltos. 
        En HealthCheck no es necesario porque un solo TextField ya actúa como la unidad de retorno. */}
          <TextField
            label="Fecha de alta"
            placeholder="YYYY-MM-DD"
            fullWidth
            margin="normal"
            value={fechaAlta}
            onChange={(evento) => setFechaAlta(evento.target.value)}
          />

          <TextField
            label="Criterio de alta"
            fullWidth
            margin="normal"
            value={criterioAlta}
            onChange={(evento) => setCriterioAlta(evento.target.value)}
          />
        </>
      )}

      {/* OccupationalHealthcare. */}
      {tipo === "OccupationalHealthcare" && (
        <>
          <TextField
            label="Nombre del empleador"
            fullWidth
            margin="normal"
            value={empleador}
            onChange={(evento) => setEmpleador(evento.target.value)}
          />

          <TextField
            label="Inicio licencia"
            placeholder="YYYY-MM-DD"
            fullWidth
            margin="normal"
            value={inicioLicencia}
            onChange={(evento) => setInicioLicencia(evento.target.value)}
          />

          <TextField
            label="Fin licencia"
            placeholder="YYYY-MM-DD"
            fullWidth
            margin="normal"
            value={finLicencia}
            onChange={(evento) => setFinLicencia(evento.target.value)}
          />
        </>
      )}

      <Box sx={{ display: "flex", gap: 2, marginTop: 2 }}>
        <Button variant="contained" color="primary" type="submit">
          Agregar
        </Button>
        <Button variant="outlined" color="secondary" onClick={alCancelar}>
          Cancelar
        </Button>
      </Box>
    </Box>
  );
};

export default FormularioNuevaEntrada;
