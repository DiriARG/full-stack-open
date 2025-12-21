import { useState } from "react";
import {
  Button,
  TextField,
  Box,
  Alert,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  OutlinedInput,
} from "@mui/material";
import { NuevaEntrada, HealthCheckRating, Diagnosis } from "../../types";

interface Props {
  // Función que recibe la nueva entrada y la envía al backend.
  alEnviar: (entrada: NuevaEntrada) => void;
  // Cancela el formulario (lo oculta).
  alCancelar: () => void;
  // Mensaje de error devuelto por el backend (opcional).
  error?: string;
  diagnosticos: Diagnosis[];
}

const FormularioNuevaEntrada = ({
  alEnviar,
  alCancelar,
  error,
  diagnosticos,
}: Props) => {
  // Este estado indica qué tipo de entrada médica el usuario quiere crear (ts solo permitirá estos 3 valores). Cuando el form. se abre, por defecto muestra el form. de HealthCheck.
  const [tipo, setTipo] = useState<
    "HealthCheck" | "Hospital" | "OccupationalHealthcare"
  >("HealthCheck");

  // Estados comunes en los 3 tipos.
  const [descripcion, setDescripcion] = useState("");
  const [fecha, setFecha] = useState("");
  const [especialista, setEspecialista] = useState("");
  const [codigosDiagnostico, setCodigosDiagnostico] = useState<string[]>([]);

  // HealthCheck; espera un valor del Enum "HealthCheckRating".
  const [ratingDeSalud, setRatingDeSalud] = useState<HealthCheckRating>(
    HealthCheckRating.Healthy // Valor inicial: 0.
  );

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
      diagnosisCodes: codigosDiagnostico,
    };

    switch (tipo) {
      case "HealthCheck":
        alEnviar({
          type: "HealthCheck",
          ...base,
          healthCheckRating: ratingDeSalud,
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
      <h3>Nueva entrada {tipo}</h3>

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
        type="date"
        fullWidth
        margin="normal"
        // Evita problemas visuales con inputs "date".
        InputLabelProps={{ shrink: true }}
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

      {/* Diagnósticos (Select múltiple). */}
      <FormControl fullWidth margin="normal">
        <InputLabel>Códigos de diagnóstico</InputLabel>
        <Select
          multiple
          value={codigosDiagnostico}
          onChange={(evento) => setCodigosDiagnostico(evento.target.value as string[])}
          input={<OutlinedInput label="Códigos de diagnóstico" />}
        >
          {/*Se renderiza una opción por cada diagnóstico disponible recibido desde el backend.
          - value: Lo que se guarda en el estado --> codigosDiagostico (solo el código).
          El texto visible es el código y el nombre para poder ayudar al usuario. */}
          {diagnosticos.map((diagnostico) => (
            <MenuItem key={diagnostico.code} value={diagnostico.code}>
              {diagnostico.code} — {diagnostico.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* HealthCheck. */}
      {tipo === "HealthCheck" && (
        <TextField
          select
          label="Rating de salud"
          fullWidth
          margin="normal"
          value={ratingDeSalud}
          /* "evento.target.value"  SIEMPRE llega como string desde un <select>, incluso si el <MenuItem value={0}> parece un número.
          Ejemplo real:
          - El usuario elige "Riesgo alto".
          - value del MenuItem = 2.
          - evento.target.value === "2"  ← es un string, NO un number.
          Por lo tanto:
         - Se convierte explícitamente el string a número usando Number(...).
         - Se le dice  a TypeScript que ese número pertenece al enum HealthCheckRating.
         Esto es necesario porque:
        - El estado "ratingDeSalud" espera un HealthCheckRating.
        - Ts no puede inferir automáticamente que "2" es un valor válido del enum. */
          onChange={(evento) =>
            setRatingDeSalud(
              Number(evento.target.value) as HealthCheckRating
            )
          }
        >
          <MenuItem value={0}>Saludable</MenuItem>
          <MenuItem value={1}>Riesgo bajo</MenuItem>
          <MenuItem value={2}>Riesgo alto</MenuItem>
          <MenuItem value={3}>Riesgo crítico</MenuItem>
        </TextField>
      )}

      {/* Hospital. */}
      {tipo === "Hospital" && (
        <>
          {/* Se usa el Fragment <> para agrupar los campos en un contenedor único, ya que React no permite devolver múltiples elementos sueltos. 
        En HealthCheck no es necesario porque un solo TextField ya actúa como la unidad de retorno. */}
          <TextField
            label="Fecha de alta"
            type="date"
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
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
            label="Inicio de licencia"
            type="date"
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            value={inicioLicencia}
            onChange={(evento) => setInicioLicencia(evento.target.value)}
          />

          <TextField
            label="Fin de licencia"
            type="date"
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
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
