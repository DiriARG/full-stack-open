import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import FormularioLogin from "./components/FormularioLogin";
import Recomendaciones from "./components/Recomendaciones";
import { useApolloClient, useSubscription } from "@apollo/client";
import { BOOK_ADDED, ALL_BOOKS } from "./consultas";

const App = () => {
  const [page, setPage] = useState("authors");
  const cliente = useApolloClient();

  // La función se ejecuta solo una vez al inicio para leer el token de "localStorage".
  const [token, setToken] = useState(() => {
    return localStorage.getItem("usuarioLogueado");
  });

  // Función que se encarga de actualizar manualmente la caché cuando el servidor envía, mediante suscripción, un nuevo libro.
  const actualizarCache = (cache, query, nuevoLibro) => {
    // Evita que un libro se agregue dos veces a la caché.
    const unicoPorId = (arreglo) => {
      // Se inicializa vacio el "Set".
      const idsVistos = new Set();
      // Itera sobre cada item del arreglo original.
      return arreglo.filter((item) => {
        // Se comprueba si el ID del objeto actual ya está en el "Set" con "Set.prototype.has()".
        if (idsVistos.has(item.id)) {
          // Si el ID ya existe, devuelve 'false' para excluir este duplicado del resultado.
          return false;
        }
        // Si no existe en el objet, se lo añade al "Set".
        idsVistos.add(item.id);
        // Se devuelve "true" para incluir este elemento en el resultado.
        return true;
      });
    };

    /* "updateQuery" permite modificar manualmente los datos que Apollo Client tiene almacenados en la caché para una consulta específica. 
    "datosExistentes" contiene el resultado actual de la consulta (ej: { allBooks: [...] }) tal como está guardado en la caché de Apollo. */
    cache.updateQuery(query, (datosExistentes) => {
      // Si la consulta nunca se ha ejecutado antes (caché vacía)...
      if (!datosExistentes) {
        // Se devuelve solo el nuevo libro.
        return { allBooks: [nuevoLibro] };
      }

      // Si ya hay datos en la caché, se concatena el nuevo libro a la lista existente.
      return {
        allBooks: unicoPorId(datosExistentes.allBooks.concat(nuevoLibro)),
      };
    });
  };

  // Suscripción a nuevos libros agregados. "useSubscription" abre una conexión ws al sv usando GraphQL WS.
  useSubscription(BOOK_ADDED, {
    // "onData" se ejecuta cada vez que llega un nuevo valor desde la suscripción.
    onData: ({ data, client }) => {
      // Se extrae el libro recibido desde la suscripción. La estructura de acceso es "data.data.[nombre-del-campo]".
      const libroNuevo = data.data.bookAdded;
      window.alert(`Nuevo libro agregado: ${libroNuevo.title}`);

      // Actualización de la caché en casos que no haya filtro (genre: null).
      actualizarCache(
        client.cache,
        { query: ALL_BOOKS, variables: { genre: null } },
        libroNuevo
      );

      /* Actualización de la caché en caso que los libros esten filtrados por género. Ej: Si el libro tiene los sig. generos: ["fantasy", "design"] entonces actualiza ALL_BOOKS(genre:"fantasy") y ALL_BOOKS(genre:"design").
      Se itera sobre cada género al que pertenece el libro recién agregado. */
      libroNuevo.genres.forEach((genero) => {
        // Por cada género se actualiza la entrada de caché específica para ese filtro.
        actualizarCache(
          client.cache,
          { query: ALL_BOOKS, variables: { genre: genero } },
          libroNuevo
        );
      });
    },
  });

  const salir = () => {
    // Se elimina el token del estado global.
    setToken(null);
    // Se elimina el token del almacenamiento local del navegador.
    localStorage.removeItem("usuarioLogueado");
    // Limpieza de caché de Apollo.
    cliente.resetStore();
    setPage("authors");
  };

  return (
    <div>
      <div>
        {/* Botones de navegación visibles para todos. */}
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>

        {/* Si NO hay token, mostrar botón de login. */}
        {!token && <button onClick={() => setPage("login")}>login</button>}

        {/* Si hay token, mostrar funcionalidades exclusivas. */}
        {token && (
          <>
            <button onClick={() => setPage("add")}>add book</button>
            <button onClick={() => setPage("recomendaciones")}>
              recomendaciones
            </button>
            <button onClick={salir}>salir</button>
          </>
        )}
      </div>

      <Authors show={page === "authors"} />
      <Books show={page === "books"} />
      <NewBook show={page === "add"} />
      <Recomendaciones show={page === "recomendaciones"} />
      <FormularioLogin
        show={page === "login"}
        setToken={setToken}
        setPage={setPage}
      />
    </div>
  );
};

export default App;
