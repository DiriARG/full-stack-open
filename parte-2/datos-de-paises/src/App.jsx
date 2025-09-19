import { useState, useEffect } from "react";
import obtenerTodosLosPaises from "./services/paises";
import ResultadoDeBusqueda from "./components/ResultadoDeBusqueda";
import FiltroDeBusqueda from "./components/FiltroDeBusqueda";
import DetallesDelPais from "./components/DetallesDelPais";

const App = () => {
  // Estados.
  const [todosLosPaises, setTodosLosPaises] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  // Guarda el país sobre el que se clickea "Mostrar".
  const [paisSeleccionado, setPaisSeleccionado] = useState(null);  

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
    setPaisSeleccionado(null); // Resetea el país seleccionado al cambiar la búsqueda.
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

      {/* Si hay un país seleccionado, mostramos solo sus detalles.
         Si no hay selección, mostramos la lista filtrada. */}
      {paisSeleccionado ? (
        <DetallesDelPais pais={paisSeleccionado} />
      ) : (
        <ResultadoDeBusqueda
          paises={paisesFiltrados}
          busqueda={busqueda}
          setPaisSeleccionado={setPaisSeleccionado}
        />
      )}
    </div>
      
  );
};

export default App;