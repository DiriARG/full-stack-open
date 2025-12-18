import React from "react";
import { Entry, HealthCheckRating } from "../../types";
import {
  LocalHospital,
  MedicalServices,
  Work,
  Favorite,
} from "@mui/icons-material";
import { Box } from "@mui/material";

const verificarExhaustividad = (valor: never): never => {
  throw new Error(
    `Miembro de unión discriminada no manejado: ${JSON.stringify(valor)}`
  );
};

// Componente funcional que muestra un ícono de corazón con color según el estado de salud (HealthCheckRating).
const IconoEstadoSalud = ({
  calificacion,
}: {
  calificacion: HealthCheckRating;
}) => {
  // Índice del enum "HealthCheckRating" --> color asociado --> green (0), yellow (1), etc.
  const colores = ["green", "yellow", "orange", "red"];

  /* Se devuelve "Favorite" que es simplemente el icono de corazón. 
  El color (recordar que para cambiar el color en CSS puro se utiliza por ej: color: blue) se selecciona dinámicamente usando el valor numérico de "calificacion" como índice del array "colores" .*/
  return <Favorite style={{ color: colores[calificacion] }} />;
};

/* Componente principal que renderiza los detalles de una entrada (Entry).
Usa una unión discriminada (entrada.type) + switch case para renderizar cada tipo de entrada correctamente.
- "React.FC" sirve para etiquetar la función como un componente funcional de React, asegurando que el retorno sea un elemento renderizable.
- "<{ entrada: Entry }>": Define la "forma" de las props, basicamente, el componente espera obligatoriamente un objeto que contenga una entrada.
- "({ entrada })" se aplica desestructuración lo que permite usar la variable entrada directamente en el code sin tener que escribir props.entrada. */
const DetallesDeLaEntrada: React.FC<{ entrada: Entry }> = ({ entrada }) => {
  switch (entrada.type) {
    case "Hospital":
      return (
        <Box border={1} padding={1} marginBottom={1} borderRadius={2}>
          <div>
            <strong>{entrada.date}</strong> <LocalHospital />
          </div>

          <em>{entrada.description}</em>

          <div>alta: {entrada.discharge.date}</div>
          <div>criterio: {entrada.discharge.criteria}</div>

          <div>diagnóstico por {entrada.specialist}</div>
        </Box>
      );

    case "OccupationalHealthcare":
      return (
        <Box border={1} padding={1} marginBottom={1} borderRadius={2}>
          <div>
            <strong>{entrada.date}</strong> <Work /> {entrada.employerName}
          </div>

          <em>{entrada.description}</em>

          {/* En caso de que exista "sickLeave". */}
          {entrada.sickLeave && (
            <div>
              licencia médica: {entrada.sickLeave.startDate} –{" "}
              {entrada.sickLeave.endDate}
            </div>
          )}

          <div>diagnóstico por {entrada.specialist}</div>
        </Box>
      );

    case "HealthCheck":
      return (
        <Box border={1} padding={1} marginBottom={1} borderRadius={2}>
          <div>
            <strong>{entrada.date}</strong> <MedicalServices />
          </div>

          <em>{entrada.description}</em>

          <IconoEstadoSalud calificacion={entrada.healthCheckRating} />

          <div>diagnóstico por {entrada.specialist}</div>
        </Box>
      );

    default:
      return verificarExhaustividad(entrada);
  }
};

export default DetallesDeLaEntrada;
