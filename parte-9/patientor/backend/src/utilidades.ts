import { NuevoPaciente, Genero } from "./tipos";

/* Se coloca "unknown" ya que es el tipo más seguro para representar un valor de entrada cuyo tipo no se conoce.
Además obliga a que se realicen verificaciones de tipo explícitas antes de usar el valor, garantizando seg. y permitiendo que la función se aplique a cualquier tipo de dato. */
const esString = (texto: unknown): texto is string => {
  return typeof texto === "string" || texto instanceof String;
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
