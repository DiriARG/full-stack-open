import { useState } from "react";
import { Button, TextField, Box, Alert } from "@mui/material";
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
  const [descripcion, setDescripcion] = useState("");
  const [fecha, setFecha] = useState("");
  const [especialista, setEspecialista] = useState("");
  const [healthCheckRating, setHealthCheckRating] = useState("");
  const [codigosDiagnostico, setCodigosDiagnostico] = useState("");

  const enviarFormulario = (evento: React.FormEvent) => {
    evento.preventDefault();

    // Se construye la entrada con las claves que espera el backend.
    const nuevaEntrada: NuevaEntrada = {
      type: "HealthCheck",
      description: descripcion,
      date: fecha,
      specialist: especialista,
      healthCheckRating: Number(healthCheckRating) as HealthCheckRating,
      /* Operación ternaria: Si existe, el usuario ingresa los códigos como un string separados por comas ej: "Z57.1, N30.0";
      Luego con el split(",") se convierte ese string en un array: ["Z57.1", "N30.0"].
      Por ultimo el map y trim es para eliminar espacios extra en cada código. */
      diagnosisCodes: codigosDiagnostico
        ? codigosDiagnostico.split(",").map((codigo) => codigo.trim())
        : // Si el campo está vacio, se envia un array vacío [], ya que el backend admite diagnosisCodes como opcional.
          [],
    };

    alEnviar(nuevaEntrada);
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
        label="HealthCheck rating (0–3)"
        fullWidth
        margin="normal"
        value={healthCheckRating}
        onChange={(evento) => setHealthCheckRating(evento.target.value)}
      />

      <TextField
        label="Códigos de diagnóstico"
        placeholder="Z57.1, N30.0"
        fullWidth
        margin="normal"
        value={codigosDiagnostico}
        onChange={(evento) => setCodigosDiagnostico(evento.target.value)}
      />

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
