// Componente que se encarga de la lógica de búsqueda.
const Filter = ({ nuevaBusqueda, handleCambioDeBusqueda }) => {
  return (
    <div>
      Filtro mostrado con:{" "}
      <input value={nuevaBusqueda} onChange={handleCambioDeBusqueda} />
    </div>
  );
};

export default Filter;
