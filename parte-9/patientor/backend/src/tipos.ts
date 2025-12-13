export interface Diagnostico {
  code: string;
  name: string;
  // El "?" indica que este campo es opcional, osea, el objeto "Diagnostico" puede o no incluir esta propiedad.
  latin?: string;  
}
