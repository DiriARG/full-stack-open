import { useState, useEffect } from "react";
import obtenerTodosLosPaises from "./services/paises";
import ResultadoDeBusqueda from "./components/ResultadoDeBusqueda";
import FiltroDeBusqueda from "./components/FiltroDeBusqueda";

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
      <FiltroDeBusqueda
        busqueda={busqueda}
        handleCambioDeBusqueda={handleCambioDeBusqueda}
      />

      <ResultadoDeBusqueda paises={paisesFiltrados} busqueda={busqueda}/>
    </div>
  );
};

export default App;
