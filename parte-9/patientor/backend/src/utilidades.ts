import {
  NuevoPaciente,
  Genero,
  NuevaEntrada,
  HealthCheckRating,
  Diagnostico,
} from "./tipos";

/* Se coloca "unknown" ya que es el tipo más seguro para representar un valor de entrada cuyo tipo no se conoce.
Además obliga a que se realicen verificaciones de tipo explícitas antes de usar el valor, garantizando seg. y permitiendo que la función se aplique a cualquier tipo de dato. */
const esString = (texto: unknown): texto is string => {
  return typeof texto === "string" || texto instanceof String;
};

const validarString = (valor: unknown, campo: string): string => {
  // Valida que el string no esté vacío ni contenga solo espacios (gracias al .trim(), si el usuario escribe " ", el método elimina esos espacios, el resultado es un string de longitud 0 y la validación falla como debe ser).
  if (!esString(valor) || valor.trim().length === 0) {
    throw new Error(`Campo inválido o faltante: ${campo}`);
  }
  return valor;
};

// "Record<string, unknown>" es una forma elegante de representar un objeto del cual aún no se conoce su estructura.
const validarObject = (valor: unknown): valor is Record<string, unknown> => {
  // Comprobación de que el tipo sea un objeto y que no de un falso positivo con valores nulos.
  return typeof valor === "object" && valor !== null;
};

// Valida y retorna un nombre válido.
const validarNombre = (nombre: unknown): string => {
  if (!esString(nombre)) {
    throw new Error("Nombre inválido o faltante");
  }
  return nombre;
};

// Se valida que la fecha sea un string y tenga un formato válido.
const validarFecha = (fecha: unknown): string => {
  if (!esString(fecha) || isNaN(Date.parse(fecha))) {
    throw new Error("Fecha inválida o faltante");
  }
  return fecha;
};

const validarSsn = (ssn: unknown): string => {
  if (!esString(ssn)) {
    throw new Error("SSN inválido o faltante");
  }
  return ssn;
};

const validarOcupacion = (ocupacion: unknown): string => {
  if (!esString(ocupacion)) {
    throw new Error("Ocupación inválida o faltante");
  }
  return ocupacion;
};

// Verifica si un string pertence a los valores del enum "Genero".
const esGenero = (valor: string): valor is Genero => {
  /* "Object.values.(Genero)" obtiene un array de todos los valores del enum Genero, osea ["male", "female", "other"].
  Luego con el ".includes(valor as Genero)" se verifica si el array del enum contiene el valor que se pasó como argumento. */
  return Object.values(Genero).includes(valor as Genero);
};

const validarGenero = (genero: unknown): Genero => {
  if (!esString(genero) || !esGenero(genero)) {
    throw new Error("Género inválido o faltante");
  }
  return genero;
};

// Acá se construye un objeto "NuevoPaciente" de forma segura a partir de un objeto unknown.
export const construirNuevoPaciente = (objeto: unknown): NuevoPaciente => {
  // Verifica si es un objeto.
  if (!objeto || typeof objeto !== "object") {
    throw new Error("Datos inválidos o faltantes");
  }

  // Se verifican que todos los campos requeridos para "NuevoPaciente" existan en el objeto.
  if (
    "name" in objeto &&
    "dateOfBirth" in objeto &&
    "ssn" in objeto &&
    "gender" in objeto &&
    "occupation" in objeto
  ) {
    // Se crea el objeto final, usando las funciones auxiliares para validar.
    const nuevoPaciente: NuevoPaciente = {
      name: validarNombre(objeto.name),
      dateOfBirth: validarFecha(objeto.dateOfBirth),
      ssn: validarSsn(objeto.ssn),
      gender: validarGenero(objeto.gender),
      occupation: validarOcupacion(objeto.occupation),
    };

    // Se devuelve.
    return nuevoPaciente;
  }

  throw new Error("Faltan campos obligatorios");
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnostico["code"]> => {
  if (!object || typeof object !== "object" || !("diagnosisCodes" in object)) {
    return [] as Array<Diagnostico["code"]>;
  }

  return object.diagnosisCodes as Array<Diagnostico["code"]>;
};

export const construirNuevaEntrada = (objeto: unknown): NuevaEntrada => {
  if (!validarObject(objeto)) {
    throw new Error("Datos inválidos o faltantes");
  }

  // Todas las entradas deben tener un campo "type" y deben ser un string válido.
  if (!("type" in objeto) || !esString(objeto.type)) {
    throw new Error("Falta o es inválido el tipo de entrada");
  }

  // Campos comunes a todas las entradas (los que están definidos en "BaseEntry").
  const base = {
    description: validarString(objeto.description, "description"),
    date: validarFecha(objeto.date),
    specialist: validarString(objeto.specialist, "specialist"),
    diagnosisCodes: parseDiagnosisCodes(objeto),
  };

  // El renderizado esta basado en el discriminante "type".
  switch (objeto.type) {
    case "Hospital":
      // "HospitalEntry" requiere obligatoriamente "discharge".
      if (
        !("discharge" in objeto) ||
        !validarObject(objeto.discharge)
      ) {
        throw new Error("Falta información de discharge");
      }

      return {
        type: "Hospital",
        ...base,
        discharge: {
          date: validarFecha(objeto.discharge.date),
          criteria: validarString(
            objeto.discharge.criteria,
            "criteria"
          ),
        },
      };

    case "OccupationalHealthcare":
      return {
        type: "OccupationalHealthcare",
        ...base,
        employerName: validarString(
          objeto.employerName,
          "employerName"
        ),
        // Opcional.
        sickLeave:
          validarObject(objeto.sickLeave)
            ? {
                startDate: validarFecha(objeto.sickLeave.startDate),
                endDate: validarFecha(objeto.sickLeave.endDate),
              }
            : undefined,
      };

    case "HealthCheck":
      // "HealthCheckEntry" require un "healthCheckRating" válido.
      if (
        !("healthCheckRating" in objeto) ||
        typeof objeto.healthCheckRating !== "number" ||
        !Object.values(HealthCheckRating).includes(
          objeto.healthCheckRating
        )
      ) {
        throw new Error("healthCheckRating inválido");
      }

      return {
        type: "HealthCheck",
        ...base,
        healthCheckRating: objeto.healthCheckRating,
      };

    default:
      throw new Error("Tipo de entrada desconocido");
  }
};
