// Este componente decide qué mostrar en función de la cantidad de resultados que reciba.
import DetallesDelPais from "./DetallesDelPais";

const ResultadoDeBusqueda = ({ paises }) => {

  if (paises.length > 10) {
    return <p>Demasiadas coincidencias, especifica otro filtro</p>;
  }

  if (paises.length <= 10 && paises.length > 1) {
    return (
      <ul>
        {paises.map((pais) => (
          // Se utiliza "cca3" como key, significa "código de 3 letras único", ej: Argentina --> cca3: "ARG".
          <li key={pais.cca3}>{pais.name.common}</li>
        ))}
      </ul>
    );
  }

  if (paises.length === 1) {
    // Si la búsqueda devuelve 1 solo país, agarramos ese objeto del array y se lo pasamos como prop al componente de detalles.
    const paisUnico = paises[0];
    return <DetallesDelPais pais={paisUnico} />;
  }

  return <p>No se encontraron coincidencias con ese filtro.</p>;
};

export default ResultadoDeBusqueda;
