export interface Diagnostico {
  code: string;
  name: string;
  // El "?" indica que este campo es opcional, osea, el objeto "Diagnostico" puede o no incluir esta propiedad.
  latin?: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface Entry {

}

export interface Paciente {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Genero;
  occupation: string;
  entries: Entry[];
}

// "Enum" sirve para restringir el género a un conjunto finito de valores válidos.
export enum Genero {
  Hombre = "male",
  Mujer = "female",
  Otro = "other",
}

/* Con "type" se aplica un alias de tipo para mejorar la legibilidad.
Se utiliza el tipo de utilidad "Omit", para crear un tipo seguro que excluye los campos que se quieren excluir, en este caso, el campo "ssn". */
export type PacienteSinSsn = Omit<Paciente, "ssn" | "entries">; // Ahora también excluye "entries".

export type NuevoPaciente = Omit<Paciente, "id" | "entries">;
