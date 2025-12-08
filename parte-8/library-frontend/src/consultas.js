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
  # Este nombre se puede modificar, ya que solo existe en el front.
  query LibrosPorGenero($genre: String) {
    # Esta operación debe coincidir exactamente con la que está en el backend.
    allBooks(genre: $genre) {
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

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`;

export const ME = gql`
  query {
    me {
      username
      favoriteGenre
      id
    }
  }
`;

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      title
      published
      genres
      id
      author {
        name
        id
      }
    }
  }
`;

