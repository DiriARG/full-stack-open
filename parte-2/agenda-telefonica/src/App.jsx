import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import servicioDePersonas from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  // Nuevo estado para manejar el valor del input del número de teléfono.
  const [nuevoNumero, setNuevoNumero] = useState("");
  // Nuevo estado para guardar el término de búsqueda que el usuario escriba.
  const [nuevaBusqueda, setNuevaBusqueda] = useState("");

  // Usamos el servicio "servicioDePersonas" para obtener todos los contactos desde la "API" al cargar el componente "App" (osea, al iniciar la aplicación).
  useEffect(() => {
    servicioDePersonas.obtenerTodo().then((personasIniciales) => {
      setPersons(personasIniciales);
    });
  }, []);

  // Controlador de eventos para agregar nuevos nombres.
  const agregarNombre = (evento) => {
    evento.preventDefault();

    // Verifica si el nombre ya existe en la lista.
    const nombreExistente = persons.some((persona) => persona.name === newName);
    if (nombreExistente) {
      alert(`${newName} ya está agregado a la agenda telefónica.`);
    } else {
      const objetoNombre = {
        name: newName,
        number: nuevoNumero,
      };
      // Usamos el servicio "servicioDePersonas" para guardar el nuevo contacto en el servidor mediante una petición POST.
      servicioDePersonas.crear(objetoNombre).then((personaCreada) => {
        setPersons(persons.concat(personaCreada));
        setNewName("");
        setNuevoNumero("");
      });
    }
  };

  // Controlador de eventos que actualiza el estado "newName" con el valor del input.
  const handleCambioDeNombre = (evento) => {
    setNewName(evento.target.value);
  };

  // Controlador de eventos que actualiza el estado "nuevoNumero" con el valor del input.
  const handleCambioDeNumero = (evento) => {
    setNuevoNumero(evento.target.value);
  };

  // Controlador de eventos que actualiza el estado "nuevaBusqueda" con el valor del input de búsqueda.
  const handleCambioDeBusqueda = (evento) => {
    setNuevaBusqueda(evento.target.value);
  };

  // Lógica para filtrar los contactos sin distinguir entre mayúsculas y minúsculas.
  const contactosFiltrados = persons.filter((persona) =>
    persona.name.toLowerCase().includes(nuevaBusqueda.toLowerCase())
  );

  return (
    <div>
      <h2>Agenda Telefónica</h2>

      <Filter
        nuevaBusqueda={nuevaBusqueda}
        handleCambioDeBusqueda={handleCambioDeBusqueda}
      />

      <h3>Agregar nuevo contacto</h3>

      <PersonForm
        agregarNombre={agregarNombre}
        newName={newName}
        handleCambioDeNombre={handleCambioDeNombre}
        nuevoNumero={nuevoNumero}
        handleCambioDeNumero={handleCambioDeNumero}
      />

      <h3>Números</h3>

      <Persons personas={contactosFiltrados} />
    </div>
  );
};

export default App;
