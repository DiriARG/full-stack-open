import { useMutation, useQuery } from "@apollo/client";
import { ALL_AUTHORS, EDIT_AUTHOR } from "../consultas";
import { useState } from "react";

const Authors = (props) => {
  // "useQuery" es el hook de Apollo que ejecuta la consulta GraphQL (ALL_AUTHORS) y desestructura los estados de la petición: loading, error, y data.
  const { loading, error, data } = useQuery(ALL_AUTHORS);
  const [nombre, setNombre] = useState("");
  const [fecha, setFecha] = useState("");

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

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

  const enviar = (evento) => {
    evento.preventDefault();

    editAuthor({
      variables: {
        // La mutación (editAuthor) requiere un parámetro (clave) llamada name, se le asigna el valor de estado de React "nombre" a la clave obligatoria.
        name: nombre,
        setBornTo: Number(fecha),
      },
    });

    // Limpieza del formulario después de la mutación.
    setNombre("");
    setFecha("");
  };

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

      {/*  Anotación:
      El ejercicio 8.12 fue realizado previamente en el ejercicio 8.11. */}
      <h3>Establecer año de nacimiento</h3>
      <form onSubmit={enviar}>
        <div>
          Nombre{" "}
          {/* El "<select>" nos da una lista (menú de opciones) de autores existentes, asi se evita tener que escribirlo manualmente. */}
          <select value={nombre} onChange={(evento) => setNombre(evento.target.value)}>
            {/* "<option>" es cada elemento que hay en la lista; se recorre el array "authors" para crear un <option> por cada autor. */}
            <option value=""> --- Elegir autor --- </option>
            {authors.map((autor) => (
              <option key={autor.id} value={autor.name}>
                {autor.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          Fecha{" "}
          <input
            type="number"
            value={fecha}
            onChange={(evento) => setFecha(evento.target.value)}
          />
        </div>

        <button type="submit">Actualizar autor</button>
      </form>
    </div>
  );
};

export default Authors;
