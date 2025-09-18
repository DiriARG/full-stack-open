import { useState, useEffect } from "react";
import obtenerTodosLosPaises from "./services/paises";
import ResultadoDeBusqueda from "./components/ResultadoDeBusqueda";

const App = () => {
  // Estados.
  const [todosLosPaises, setTodosLosPaises] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  // useEffect para obtener todos los países de la API.
  useEffect(() => {
    obtenerTodosLosPaises()
      .then((paises) => {
        setTodosLosPaises(paises);
      })
      .catch((error) => {
        console.error("Error al cargar países: ", error);
      });
  }, []);

  // Controlador de eventos para manejar el cambio en el campo de búsqueda.
  const handleCambioDeBusqueda = (evento) => {
    setBusqueda(evento.target.value);
  };

  // Lógica para filtrar los países basandose en la busqueda.
  const paisesFiltrados = todosLosPaises.filter((pais) =>
    pais.name.common.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div>
      Encontrar paises:{" "}
      <input value={busqueda} onChange={handleCambioDeBusqueda} />
      {/* Lógica para mostrar resultados según el input de búsqueda */}
      {busqueda === "" ? (
        <p>Comienza a escribir para buscar un país...</p>
      ) : (
        <ResultadoDeBusqueda paises={paisesFiltrados} />
      )}
    </div>
  );
};

export default App;
