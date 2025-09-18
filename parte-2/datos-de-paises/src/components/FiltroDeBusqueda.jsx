// Componente que se encarga de la lógica de búsqueda.
const FiltroDeBusqueda = ({ busqueda, handleCambioDeBusqueda }) => {
  return (
    <div>
      <label>
      Encontrar paises:{" "}
      <input value={busqueda} onChange={handleCambioDeBusqueda} />
      </label>
    </div>
  );
};

export default FiltroDeBusqueda;
