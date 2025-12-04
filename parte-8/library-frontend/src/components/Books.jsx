import { useQuery } from "@apollo/client";
import { useState } from "react";
import { ALL_BOOKS } from "../consultas";

const Books = (props) => {
  const [genero, setGenero] = useState(null);

  const { loading, error, data } = useQuery(ALL_BOOKS);

  if (!props.show) {
    return null;
  }

  if (loading) {
    return <div>Cargando libros...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const books = data.allBooks;

  /* Con "flatMap()" se crea un solo gran array con todos los géneros de todos los libros (incluyendo duplicados).
  Después con "new Set(...)" se elimina los géneros repetidos. 
  Por ultimo "[...Set]" vuelve a convertir el Set en un array normal para su uso. */
  const todosLosGeneros = [...new Set(books.flatMap((libro) => libro.genres))];

  const librosAMostrar = genero
  // Si hay un género seleccionado, se filtran los libros para incluir solo aquellos cuya lista "genres" contenga ese género. 
  ? books.filter((libro) => libro.genres.includes(genero))
  // Si no hay género seleccionado simplemente se devuelve todos los libros.
  : books;

  return (
    <div>
      <h2>books</h2>

      {/* Muestra el género actual de filtrado si hay uno seleccionado. */}
      {genero && (
        <p>
          Género seleccionado: <strong>{genero}</strong>
        </p>
      )}

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {librosAMostrar.map((a) => (
            <tr key={a.id}>
              <td>{a.title}</td>
              {/* Ahora "author" es un objeto, no un string. */}
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Botones para filtrar por géneros. */}
      <div style={{ marginTop: "1rem" }}>
        {/* Mapea y renderiza un botón por cada género único.
            Al hacer click, actualiza el estado "setGenero". */}
        {todosLosGeneros.map((g) => (
          <button key={g} onClick={() => setGenero(g)}>
            {g}
          </button>
        ))}

        {/* Botón para ver todos los libros (quita el filtro). */}
        <button onClick={() => setGenero(null)}>todos los géneros</button>
      </div>
    </div>
  );
};

export default Books;
