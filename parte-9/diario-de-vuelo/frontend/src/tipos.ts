export interface Diario {
  id: number;
  date: string;
  weather: string;
  visibility: string;
  comment: string;
}

export type NuevoDiario = Omit<Diario, "id">;
