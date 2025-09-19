import axios from "axios";

const api_key = import.meta.env.VITE_SOME_KEY; 

// Función que obtiene el clima actual de una ciudad usando OpenWeatherMap.
const obtenerClima = (ciudad) => {
  /*Construimos la URL para la API:
  - q=${ciudad} → nombre de la ciudad.
  - appid=${api_key} → nuestra clave de acceso (obligatoria).
  - units=metric → convierte temperaturas a grados Celsius.*/ 
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${api_key}&units=metric`;
  // Cuando se resuelve, devolvemos solo la parte importante: respuesta.data.
  return axios.get(url).then((respuesta) => respuesta.data);
};

export default obtenerClima;
