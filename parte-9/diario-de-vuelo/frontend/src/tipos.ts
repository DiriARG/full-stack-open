// Enums copiados del backend, se cambiaron por uniones de string (union types) por el error de ESlint: "erasableSyntaxOnly".
export type Weather = "sunny" | "rainy" | "cloudy" | "stormy" | "windy";

export type Visibility = "great" | "good" | "ok" | "poor";

export interface Diario {
  id: number;
  date: string;
  weather: string;
  visibility: string;
  comment: string;
}

export type NuevoDiario = Omit<Diario, "id">;
