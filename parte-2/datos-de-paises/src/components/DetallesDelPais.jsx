// Este componente simplemente muestra la información detallada de un solo país.
import { useState, useEffect } from "react";
import obtenerClima from "../services/clima";

const DetallesDelPais = ({ pais }) => {
  // Nuevo estado para guardar los datos del clima, al principio es "null" hasta que llegue la respuesta.
  const [clima, setClima] = useState(null);

  useEffect(() => {
    // Verificación para ver que el país tenga capital antes de pedir los datos del clima.
    if (pais.capital && pais.capital.length > 0) {
      const capital = pais.capital[0]; // Se agarra la primera capital (ej: "Buenos Aires" ).
      // Llamamos a la función que obtiene el clima de esa capital.
      obtenerClima(capital)
        // Cuando la promesa se resuelve, guardamos la data en el estado "clima".
        .then((data) => setClima(data))
        // Si ocurre un error (ej: ciudad no encontrada)... 
        .catch((err) => console.error("Error al obtener clima:", err));
    }
  }, [pais]); // El efecto se ejecuta cada vez que cambie el país recibido como prop.
  return (
    <div>
      <h1>{pais.name.common}</h1>
      <p>
        Capital: {pais.capital} <br />
        Área: {pais.area}
      </p>

      <h2>Idiomas</h2>
      <ul>
        {
          /* La propiedad "languages" de la API es un objeto, no un array.
            Para poder iterar sobre los valores y crear una lista de idiomas,
            usamos `Object.values()` para convertir los valores del objeto
            en un array de strings. Luego, usamos `.map()` para renderizar
            cada idioma en un elemento de lista (`<li>`) con su nombre como "key".
          */
          Object.values(pais.languages).map((lang) => (
            <li key={lang}>{lang}</li>
          ))
        }
      </ul>
      <img
        src={pais.flags.png}
        alt={`Bandera de ${pais.name.common}`}
        width="200"
      />

      {/* Sección de Clima */}
      {clima && ( // Solo se muestra esta sección si "clima" ya tiene datos.
        <div>
          <h2>Clima en {pais.capital[0]}</h2>
          <p>Temperatura: {clima.main.temp} Celsius</p>
          <img
            src={`https://openweathermap.org/img/wn/${clima.weather[0].icon}@2x.png`}
            alt={clima.weather[0].description}
          />
          <p>Viento: {clima.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
};
export default DetallesDelPais;
