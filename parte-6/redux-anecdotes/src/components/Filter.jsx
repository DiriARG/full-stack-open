import { useDispatch } from "react-redux";
import { setFiltro } from "../reducers/filtroReducer";

const Filter = () => {
  const dispatch = useDispatch();

  const handleChange = (event) => {
    /* "event.target" representa el input HTML que se está escribiendo, "event.target.value" es el contenido actual del input. 
    setFiltro crea una acción que actualiza el estado del filtro en Redux. */
    dispatch(setFiltro(event.target.value));
  };
  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  );
};

export default Filter;
