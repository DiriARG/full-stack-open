/* Este componente alterna la visibilidad de su contenido interno. 
El contenido a mostrar se pasa como children desde el componente padre.
Por ejemplo, en App.jsx, children representa lo que está dentro de las etiquetas <AlternarContenido> como puede ser el formulario <BlogFormulario />.
*/
import { useState } from "react";

const AlternarContenido = (props) => {
  // Estado que controla si el contenido es visible o no.
  const [visible, setVisible] = useState(false);

  // Estilos que controlan qué parte se muestra en función del estado.
  const ocultar = { display: visible ? "none" : "" };
  const mostrar = { display: visible ? "" : "none" };

  // Cambia la visibilidad del contenido.
  const alternarVisibilidad = () => {
    setVisible(!visible);
  };

  return (
    <div>
      {/* Botón visible solo cuando el contenido está oculto. */}
      <div style={ocultar}>
        <button onClick={alternarVisibilidad}>{props.textoBoton}</button>
      </div>
      {/* Contenido visible solo cuando visible = true. */}
      <div style={mostrar}>
        {props.children}
        <button onClick={alternarVisibilidad}>cancelar</button>
      </div>
    </div>
  );
};

export default AlternarContenido;
