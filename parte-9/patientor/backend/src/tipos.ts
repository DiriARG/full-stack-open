export interface Diagnostico {
  code: string;
  name: string;
  // El "?" indica que este campo es opcional, osea, el objeto "Diagnostico" puede o no incluir esta propiedad.
  latin?: string;
}

// "Enum" sirve para restringir el género a un conjunto finito de valores válidos.
export enum Genero {
  Hombre = "male",
  Mujer = "female",
  Otro = "other",
}

/* "BaseEntry", "HealthCheckRating", "HealthCheckEntry" y "Entry" fueron copiados directamente desde el material de lectura. */
export interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  // Se usa Diagnostico["code"] para asegurar que los códigos de diagnóstico siempre coincidan con el tipo definido en Diagnostico. Si cambia en el futuro, se actualiza este campo automáticamente.
  diagnosisCodes?: Array<Diagnostico["code"]>;
}

export interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge: {
    date: string;
    criteria: string;
  };
}

export interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: {
    startDate: string;
    endDate: string;
  };
}

export enum HealthCheckRating {
  Healthy = 0,
  LowRisk = 1,
  HighRisk = 2,
  CriticalRisk = 3,
}

export interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

// Ahora ts puede saber el tipo correcto según el valor del campo "type".
export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

export interface Paciente {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Genero;
  occupation: string;
  entries: Entry[];
}

/* Con "type" se aplica un alias de tipo para mejorar la legibilidad.
Se utiliza el tipo de utilidad "Omit", para crear un tipo seguro que excluye los campos que se quieren excluir, en este caso, el campo "ssn". */
export type PacienteSinSsn = Omit<Paciente, "ssn" | "entries">; // Ahora también excluye "entries".

export type NuevoPaciente = Omit<Paciente, "id" | "entries">;

/* "OmitirUnion" sirve para trabajar con uniones de tipos (Entry). PropertyKey representa cualquier clave válida de un objeto en JS, se coloca para que ESlint no joda.
- T reresenta la unión de tipos (HospitalEntry | OccupationalHealthcareEntry | HealthCheckEntry).  
- K es la propiedad que se quiere remover, en este caso, "id". 
"T extends unknown" se utiliza para:
- Activar la "distribución": ts procesa cada miembro de la unión por separado.
- Mantiene la integridad: Sin esto, al omitir "id", se perderían los campos específicos de cada tipo (como "sickLeave" o "healthCheckRating") porque Omit solo vería los campos compartidos en "BaseEntry".   
Eñ resultado es una nueva unión donde cada interfaz conserva su "type" y sus campos únicos pero ya no tienen el "id". */
type OmitirUnion<T, K extends PropertyKey> =
  T extends unknown ? Omit<T, K> : never;

export type NuevaEntrada = OmitirUnion<Entry, "id">;