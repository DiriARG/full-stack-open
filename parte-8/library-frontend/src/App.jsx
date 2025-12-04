import { useState} from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import FormularioLogin from "./components/FormularioLogin";
import { useApolloClient } from "@apollo/client";

const App = () => {
  const [page, setPage] = useState("authors");
  const cliente = useApolloClient();

  // La función se ejecuta solo una vez al inicio para leer el token de "localStorage".
  const [token, setToken] = useState(() => {
    return localStorage.getItem("usuarioLogueado");
  });

  const salir = () => {
    // Se elimina el token del estado global.
    setToken(null);
    // Se elimina el token del almacenamiento local del navegador.
    localStorage.removeItem("usuarioLogueado");
    // Limpieza de cache de Apollo.
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
            <button onClick={salir}>salir</button>
          </>
        )}
      </div>

      <Authors show={page === "authors"} />
      <Books show={page === "books"} />
      <NewBook show={page === "add"} />
      <FormularioLogin show={page === "login"} setToken={setToken} setPage={setPage} />
    </div>
  );
};

export default App;
