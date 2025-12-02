import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink
} from "@apollo/client";

const cliente = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: 'http://localhost:4000'
  })
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ApolloProvider client={cliente}>
      <App />
    </ApolloProvider>
  </StrictMode>
)