import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  // Nuevo estado para manejar el valor del input del número de teléfono.
  const [nuevoNumero, setNuevoNumero] = useState("");
  // Nuevo estado para guardar el término de búsqueda que el usuario escriba.
  const [nuevaBusqueda, setNuevaBusqueda] = useState("");

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
        id: persons.length + 1,
      };
      setPersons(persons.concat(objetoNombre));
      setNewName("");
      setNuevoNumero("");
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
      <form onSubmit={agregarNombre}>
        <div>
          Filtro mostrado con: 
          <input value={nuevaBusqueda} onChange={handleCambioDeBusqueda} />
        </div>
        <div>
          <h2>Agregar nuevo contacto</h2>
          Nombre: <input value={newName} onChange={handleCambioDeNombre} />
        </div>
        <div>
          Número: <input value={nuevoNumero} onChange={handleCambioDeNumero} />
        </div>
        <div>
          <button type="submit">Agregar</button>
        </div>
      </form>
      <h2>Números</h2>
      <ul>
        {contactosFiltrados.map((persona) => (
          <li key={persona.id}>
            {persona.name} {persona.number}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
