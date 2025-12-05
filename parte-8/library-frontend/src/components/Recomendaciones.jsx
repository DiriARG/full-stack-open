import { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { ME, ALL_BOOKS } from "../consultas";

const Recomendaciones = ({ show }) => {
  // Obtención de los datos del usuario logueado.
  const { data: dataUsuario, loading: loadingUsuario } = useQuery(ME);

  const generoFavorito = dataUsuario?.me?.favoriteGenre;

  // Se ejecuta la consulta "ALL_BOOKS" por primera vez, acá no se filtra por género todavia.
  const {
    data: dataLibros,
    loading: loadingLibros,
    refetch,
  } = useQuery(ALL_BOOKS, {
    // Carga todos los libros incialmente.
    variables: { genre: null },
  });

  // El "useEffect" se activa cuando "generoFavorito" cambia, osea, cuando la consulta "ME" termina y Apollo obtiene el usuario.
  useEffect(() => {
    if (generoFavorito) {
      // Esto actualiza "dataLibros" con los libros filtrados.
      refetch({ genre: generoFavorito });
    }
  }, [generoFavorito, refetch]);

  if (!show) {
    return null;
  }

  if (loadingUsuario) {
    return <div>Cargando usuario...</div>;
  }

  if (loadingLibros) {
    return <div>Cargando libros...</div>;
  }

  /*
    dataLibros?.allBooks
    ALL_BOOKS SIEMPRE devuelve los libros, lo único que cambia es su contenido según la última consulta.
    Primera ejecución → todos los libros.
    Luego del refetch → libros filtrados por género favorito.
    Por eso no hace falta "librosFiltrados" ni otras variables: Apollo actualiza automáticamente la propiedad "allBooks".
  */
  const libros = dataLibros?.allBooks || [];

  return (
    <div>
      <h2>Recomendaciones</h2>

      <p>
        Libros de tu género favorito: <strong>{generoFavorito}</strong>
      </p>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>autor</th>
            <th>publicado</th>
          </tr>

          {libros.map((libro) => (
            <tr key={libro.id}>
              <td>{libro.title}</td>
              <td>{libro.author.name}</td>
              <td>{libro.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Recomendaciones;
