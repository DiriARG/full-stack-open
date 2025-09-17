import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import servicioDePersonas from "./services/persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  // Nuevo estado para manejar el valor del input del número de teléfono.
  const [nuevoNumero, setNuevoNumero] = useState("");
  // Nuevo estado para guardar el término de búsqueda que el usuario escriba.
  const [nuevaBusqueda, setNuevaBusqueda] = useState("");
  // Nuevo estado para manejar los mensajes de notificación.
  const [mensaje, setMensaje] = useState(null);

  // Usamos el servicio "servicioDePersonas" para obtener todos los contactos desde la "API" al cargar el componente "App" (osea, al iniciar la aplicación).
  useEffect(() => {
    servicioDePersonas.obtenerTodo().then((personasIniciales) => {
      setPersons(personasIniciales);
    });
  }, []);

  // Controlador de eventos para agregar o actualizar contactos.
  const agregarNombre = (evento) => {
    // Evita que el formulario recargue la página.
    evento.preventDefault();

    // Elimina espacios en blanco al inicio y al final.
    const nombreNormalizado = newName.trim();

    // Buscamos si existe una persona con el mismo nombre en la lista "persons" (toLowerCase para no distinguir entre mayus y minus).
    const personaExistente = persons.find(
      (p) => p.name.toLowerCase() === nombreNormalizado.toLowerCase()
    );

    if (personaExistente) {
      // Pedimos confirmación antes de reemplazar el número.
      if (
        window.confirm(
          `${personaExistente.name} ya está agregado a la agenda telefónica, ¿reemplazar el número antiguo por uno nuevo?`
        )
      ) {
        /* Crea un nuevo objeto con los datos actualizados, utilizando el operador spread (...) para copiar las propiedades del contacto existente
       y sobrescribiendo solo el número de teléfono con el nuevo valor.*/
        const personaActualizada = {
          ...personaExistente,
          number: nuevoNumero,
        };

        // Usamos el servicio para actualizar el recurso en el backend (PUT).
        servicioDePersonas
          .actualizar(personaExistente.id, personaActualizada) // Se le pasa el ID del contacto a actualizar y el objeto con los nuevos datos.
          .then((respuesta) => {
            // Reemplazamos la persona antigua por la que devolvió el servidor.
            setPersons((estadoAnterior) =>
              estadoAnterior.map(
                (p) => (p.id !== respuesta.id ? p : respuesta) // condicion ? valor_si_true : valor_si_false.
              )
            );
            setNewName("");
            setNuevoNumero("");
            // Notificación de éxito al actualizar ✅.
            setMensaje({
              texto: `Se actualizó el número de ${respuesta.name}`,
              tipo: "exito",
            });
            setTimeout(() => {
              setMensaje(null);
            }, 5000);
          })
          .catch(() => {
            // Si ocurre un error, retorna la notificación de error ❌.
            setMensaje({
              texto: `La información de ${personaExistente.name} ya fue eliminada del servidor`,
              tipo: "error",
            });
            setTimeout(() => setMensaje(null), 5000);
            // Se actualiza el estado local para eliminar el contacto que no se pudo actualizar.
            setPersons((estadoAnterior) =>
              estadoAnterior.filter((p) => p.id !== personaExistente.id)
            );
          });
      }
    } else {
      // Si el nombre no existe, lo creamos.
      const objetoNombre = {
        name: nombreNormalizado,
        number: nuevoNumero,
      };

      servicioDePersonas
        .crear(objetoNombre)
        .then((personaCreada) => {
          setPersons((estadoAnterior) => estadoAnterior.concat(personaCreada));
          setNewName("");
          setNuevoNumero("");

          // Notificación de éxito al crear (tiene que estar dentro del "then" porque "personaCreada" está acá) ✅.
          setMensaje({ texto: `Se agregó a ${personaCreada.name}`, tipo: "exito" });
          setTimeout(() => setMensaje(null), 5000);
        })
        .catch(() => {
          alert("No se pudo crear el contacto. Intentalo nuevamente.");
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
          setPersons((estadoAnterior) =>
            estadoAnterior.filter((p) => p.id !== id)
          ); // Crea un nuevo array que contiene todas las personas excepto la que tenga el id que queremos eliminar.
        })
        .catch((error) => {
          // Si el recurso ya no existe en el servidor, avisamos y actualizamos el state local.
          alert(`La persona '${nombre}' ya fue eliminada del servidor.`);
          setPersons((estadoAnterior) =>
            estadoAnterior.filter((p) => p.id !== id)
          );
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

      <Notification mensaje={mensaje} />

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

      <Persons personas={contactosFiltrados} handleEliminar={handleEliminar} />
    </div>
  );
};

export default App;
