import { useQuery } from "@apollo/client";
import { useState } from "react";
import { ALL_BOOKS } from "../consultas";

const Books = (props) => {
  /* Estado que guarda el género actualmente seleccionado. 
  Al cambiar este valor, se trae desde el back la lista filtrada por ese género a partir de un refetch manual (más abajo en el código).*/
  const [genero, setGenero] = useState(null);

  const { loading, error, data, refetch } = useQuery(ALL_BOOKS, {
    // Se envía la variable "genre" a GraphQL para que el servidor filtre los libros, sin embargo, como se quiere que la query siempre traiga datos frescos cuando cambia el filtro, se utiliza refetch() más abajo.
    variables: { genre: genero },
  });

  if (!props.show) {
    return null;
  }

  if (loading) {
    return <div>Cargando libros...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const books = data?.allBooks || [];

  /* Con "flatMap()" se crea un solo gran array con todos los géneros de todos los libros (incluyendo duplicados).
  Después con "new Set(...)" se elimina los géneros repetidos. 
  Por ultimo "[...Set]" vuelve a convertir el Set en un array normal para su uso. */
  const todosLosGeneros = [...new Set(books.flatMap((libro) => libro.genres))];
  
  
  /* Cuando el usuario toca un botón de género:
  1 - Se guarda el estado qué género seleccionó --> setGenero (generoNuevo).
  2 - Se fuerza que Apollo pida datos frescos al back pasando ese género como parámetro a "refetch". 
  Esto actualiza la lista de libros. */
  const seleccionarGenero = (generoNuevo) => {
    setGenero(generoNuevo);
    refetch({ genre: generoNuevo });
  };
  
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
          {books.map((a) => (
            <tr key={a.id}>
              <td>{a.title}</td>
              {/* Ahora "author" es un objeto, no un string. */}
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Botones para filtrar por género. */}
      <div style={{ marginTop: "1rem" }}>
        {/* Mapea y renderiza un botón por cada género único. */}
        {todosLosGeneros.map((g) => (
          <button key={g} onClick={() => seleccionarGenero(g)}>
            {g}
          </button>
        ))}

        {/* Botón para ver todos los libros (quita el filtro). */}
        <button
          onClick={() => {
            setGenero(null);
            refetch({ genre: null }); // Se piden todos los libros otra vez.
          }}
        >
          todos los géneros
        </button>
      </div>
    </div>
  );
};

export default Books;
