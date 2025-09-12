// Componente responsable de mostrar a todas las personas de la agenda telefónica.
const Persons = ({ personas }) => {
  return (
    <ul>
      {personas.map((persona) => (
        <li key={persona.id}>
          {persona.name} {persona.number}
        </li>
      ))}
    </ul>
  );
};

export default Persons;
