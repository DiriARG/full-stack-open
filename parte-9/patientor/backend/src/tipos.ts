export interface Diagnostico {
  code: string;
  name: string;
  // El "?" indica que este campo es opcional, osea, el objeto "Diagnostico" puede o no incluir esta propiedad.
  latin?: string;
}

export interface Paciente {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
}

/* Con "type" se aplica un alias de tipo para mejorar la legibilidad.
Se utiliza el tipo de utilidad "Omit", para crear un tipo seguro que excluye los campos que se quieren excluir, en este caso, el campo "ssn". */
export type PacienteSinSsn = Omit<Paciente, "ssn">;