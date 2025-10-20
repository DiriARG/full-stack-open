import { useState } from "react";
import blogService from "../services/blogs";

const Blog = ({ blog, blogs, setBlogs }) => {
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

  const handleLike = async () => {
    // Se prepara el objeto para enviar al backend para su actualización.
    const blogActualizado = {
      ...blog,
      likes: blog.likes + 1,
      // Se envia el ID del usuario.
      user: blog.user.id || blog.user,
    };

    // Se envia la actualización al backend.
    const respuesta = await blogService.actualizar(blog.id, blogActualizado);

    /* El backend devuelve el blog actualizado, pero sin la información completa del usuario.
     Por eso, se sobreescribe el campo "user" incompleto de "respuesta" con el objeto "user" completo que ya teníamos en el estado local. */
    const blogConUsuario = {
      ...respuesta,
      user: blog.user,
    };

    // Se recorre la lista actual de blogs, reemplazando el blog antiguo por la versión actualizada ("blogConUsuario") en caso de que el ID coincida, si no, se mantiene el blog original ("b").
    setBlogs(blogs.map((b) => (b.id === blog.id ? blogConUsuario : b)));
  };

  return (
    // Acá se aplica los estilos definidos previamente.
    <div style={estiloDeBlog}>
      {/* Acá se muestra el título y el autor. Al lado está el botón que activa la función de alternancia al hacer click,
      osea si "mostrarDetalles" es true, el texto es "Ocultar". Si es false, el texto es "Mostrar". */}
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
            Likes {blog.likes} <button onClick={handleLike}>Like</button>
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
