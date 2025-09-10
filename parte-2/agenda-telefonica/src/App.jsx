import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

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
      };
      setPersons(persons.concat(objetoNombre));
      setNewName("");
    }
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
          <li key={persona.name}>{persona.name}</li> // Se utiliza el nombre de la persona como valor de la propiedad "key".
        ))}
      </ul>
    </div>
  );
};

export default App;
