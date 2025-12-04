import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink
} from "@apollo/client";
// Se importa "setContext" para manipular los headers de las peticiones.
import { setContext } from '@apollo/client/link/context'

// Este link se utiliza para añadir el token de autenticación a cada petición GraphQL.
const linkAutenticacion = setContext((_, { headers }) => {
  // Se obtiene el token del usuario.
  const token = localStorage.getItem("usuarioLogueado");
  
  // Se devuelve el nuevo contexto con los headers modificados.
  return {
    headers: {
      // Mantenemos cualquier header que ya existiera.
      ...headers,
      // Se agrega o sobreescribe el header de autorización en caso de que exista un token, caso contrario, null.
      authorization: token ? `Bearer ${token}` : null,
    },
  };
});

const httpLink = createHttpLink({
  uri: 'http://localhost:4000',
})

const cliente = new ApolloClient({
  cache: new InMemoryCache(),
  // Encadenamiento de links: Primero linkAutenticación añade el token, luego httpLink envía la petición final (ya autenticada) a la URL del servidor. 
  link: linkAutenticacion.concat(httpLink)
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ApolloProvider client={cliente}>
      <App />
    </ApolloProvider>
  </StrictMode>
)