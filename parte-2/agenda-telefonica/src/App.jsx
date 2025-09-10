import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  // Controlador de eventos para agregar nuevos nombres.
  const agregarNombre = (evento) => {
    evento.preventDefault();
    const objetoNombre = {
      name: newName,
      id: persons.length + 1,
    };
    setPersons(persons.concat(objetoNombre));
    setNewName("");
  };

  // Controlador de eventos que actualiza el estado "newName" con el valor del input.
  const handleCambioDeNombre = (evento) => {
    setNewName(evento.target.value);
  };

  return (
    <div>
      <h2>Agenda Telefónica</h2>
      <form onSubmit={agregarNombre}>
        <div>
          Nombre: <input value={newName} onChange={handleCambioDeNombre} />
        </div>
        <div>
          <button type="submit">Agregar</button>
        </div>
      </form>
      <h2>Números</h2>
      <ul>
        {persons.map((persona) => (
          <li key={persona.id}>{persona.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
