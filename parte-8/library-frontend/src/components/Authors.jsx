import { useQuery } from '@apollo/client'

import { ALL_AUTHORS } from "../consultas";

const Authors = (props) => {
  // "useQuery" es el hook de Apollo que ejecuta la consulta GraphQL (ALL_AUTHORS) y desestructura los estados de la petición: loading, error, y data.  
  const { loading, error, data } = useQuery(ALL_AUTHORS);

  if (!props.show) {
    return null;
  }

  if (loading) {
    return <div>Cargando autores...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // Una vez que los datos han llegado (no hay loading ni error), extrae el array de autores de la respuesta ("data").
  const authors = data.allAuthors;

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Authors;
