import { useState } from "react";

const Blog = ({ blog }) => {
  const [mostrarDetalles, setMostrarDetalles] = useState(false);

  // Estilos en línea.
  const estiloDeBlog = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  // Invierte el valor de estado de "mostrarDetalles".
  const alternarDetalles = () => {
    setMostrarDetalles(!mostrarDetalles);
  };

  return (
    // Acá se aplica los estilos definidos previamente.
    <div style={estiloDeBlog}>
      {/* Acá se muestra el título y el autor. Al lado está el botón que activa la función de alternancia al hacer click,
      osea si "mostrarDetalles" es true, el texto es "Ocultar". Si es false, el texto es "Mostrar". */ }
      <div>
        {blog.title} {blog.author}{" "}
        <button onClick={alternarDetalles}>
          {mostrarDetalles ? "Ocultar" : "Mostrar"}
        </button>
      </div>

      {/* El operador lógico AND (&&) asegura que el div interno solo se muestre si "mostrarDetalles" es true, mostrando los demás datos del blog.*/}
      {mostrarDetalles && (
        <div>
          <div>{blog.url}</div>
          <div>
            Likes {blog.likes} <button>Like</button>
          </div>
          {/* Se usa el operador de encadenamiento opcional: "?." para acceder a "name" solo si "blog.user" existe. 
           Sirve para prevenir errores en caso de que la propiedad "user" es null o undefined. */}
          <div>{blog.user?.name}</div>
        </div>
      )}
    </div>
  );
};

export default Blog;
