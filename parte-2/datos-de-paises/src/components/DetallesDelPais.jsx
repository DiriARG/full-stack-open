// Este componente simplemente muestra la información detallada de un solo país.
const DetallesDelPais = ({ pais }) => {
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
    </div>
  );
};
export default DetallesDelPais;
