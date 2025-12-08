import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
  split,
} from "@apollo/client";
// Se importa "setContext" para manipular los headers de las peticiones.
import { setContext } from "@apollo/client/link/context";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { getMainDefinition } from "@apollo/client/utilities";

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
  uri: "http://localhost:4000",
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: "ws://localhost:4000",
  })
);

// Enrutador condicional: Dirige las Subscriptions a WS y las Queries/Mutations a HTTP con autenticación.
const enlaceCondicional = split(
  // Desestructuración, para poder cambiarle el nombre.
  ({ query: consulta }) => {
    // Acá se obtiene la definición de la operación, osea, Query, Mutation o Subscription.
    const definicion = getMainDefinition(consulta);
    // Devuelve verdadero si y solo si la operación es una "subscription".
    return (
      definicion.kind === "OperationDefinition" &&
      definicion.operation === "subscription"
    );
  },
  // Al ser "true" se usa el enlace WebSocket.
  wsLink,

  /* En caso de "false" (query o mutation) se utiliza el enlace HTTP con la lógica de autenticación.
  Encadenamiento de links: Primero linkAutenticación añade el token, luego httpLink envía la petición final (ya autenticada) a la URL del servidor. */
  linkAutenticacion.concat(httpLink)
);

const cliente = new ApolloClient({
  cache: new InMemoryCache(),
  link: enlaceCondicional,
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ApolloProvider client={cliente}>
      <App />
    </ApolloProvider>
  </StrictMode>
);
