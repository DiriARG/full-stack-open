import { gql } from "@apollo/client";

// Mismo nombre que fue definido en el esquema del backend (index.js).
export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
      id
    }
  }
`;

export const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      published
      genres
      id
      author {
        name
        born
        id
      }
    }
  }
`;

export const ADD_BOOK = gql`
  # Esta sección define las variables que el cliente (componente React) debe proporcionar cuando ejecuta la mutación.
  mutation addBook(
    $title: String!
    $author: String!
    $published: Int!
    $genres: [String!]!
  ) {
    # "addBook" es el nombre del resolver en el esquema GraphQL del backend.
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      # Datos que se quieren recibir al crear el objeto.
      title
      author
      published
      genres
      id
    }
  }
`;

export const EDIT_AUTHOR = gql`
  mutation editAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
      id
      bookCount
    }
  }
`;
