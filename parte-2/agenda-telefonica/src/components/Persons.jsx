// Componente que muestra la lista de personas y un botón para eliminar a cada una.
const Persons = ({ personas, handleEliminar }) => {
  return (
    <ul>
      {personas.map((persona) => (
        <li key={persona.id}>
          {persona.name} {persona.number} {" "}
          {/* Botón para eliminar la persona */}
          <button onClick={() => handleEliminar(persona.id, persona.name)}>
            Eliminar
          </button>
        </li>
      ))}
    </ul>
  );
};

export default Persons;
