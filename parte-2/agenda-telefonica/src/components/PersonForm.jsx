// Componente que maneja el formulario para agregar nuevos contactos.
const PersonForm = ({
  agregarNombre,
  newName,
  handleCambioDeNombre,
  nuevoNumero,
  handleCambioDeNumero,
}) => {
  return (
    <form onSubmit={agregarNombre}>
      <div>
        Nombre: <input value={newName} onChange={handleCambioDeNombre} />
      </div>
      <div>
        Número: <input value={nuevoNumero} onChange={handleCambioDeNumero} />
      </div>
      <div>
        <button type="submit">Agregar</button>
      </div>
    </form>
  );
};

export default PersonForm;
