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
    evento.estadoAnteriorentDefault();

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

  // Controlador de eventos para eliminar una persona. Se pasa a Persons para ser llamado desde el botón.
  const handleEliminar = (id, nombre) => {
    // Confirmación al usuario antes de eliminar.
    if (window.confirm(`¿Eliminar ${nombre}?`)) {
      servicioDePersonas
        .eliminar(id)
        .then(() => {
          // Actualizamos el state removiendo la persona eliminada.
          setPersons((estadoAnterior) => estadoAnterior.filter((p) => p.id !== id)); // Crea un nuevo array que contiene todas las personas excepto la que tenga el id que queremos eliminar.
        })
        .catch((error) => {
          // Si el recurso ya no existe en el servidor, avisamos y actualizamos el state local.
          alert(`La persona '${nombre}' ya fue eliminada del servidor.`);
          setPersons((estadoAnterior) => estadoAnterior.filter((p) => p.id !== id));
        });
    }
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

      <Persons personas={contactosFiltrados} handleEliminar={handleEliminar}/>
    </div>
  );
};

export default App;
