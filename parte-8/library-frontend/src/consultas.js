import { gql } from "@apollo/client";

// Este fragmento sirve para definir un conjunto de campos que se reutilizan en múltiples consultas.
export const DETALLES_LIBRO = gql`
  # "on Libro" es la Condición de Tipo (Type Condition), indica que este fragmento se aplica a objetos que coincidan con el tipo "Libro" definido en el "typeDefs" (esquema).
  fragment DetallesLibro on Libro {
    title
    published
    genres
    id
    # El autor es un objeto anidado, al cual se le solicita sus detalles:
    author {
      name
      born
      id
    }
  }
`;

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
      # Se utiliza el fragmento para incluir todos sus campos en el resultado de esta consulta.
      ...DetallesLibro
    }
  }
  # Es obligatorio incluir el fragmento fuera de la query para que GraphQL lo reconozca.
  ${DETALLES_LIBRO}
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
      ...DetallesLibro
    }
  }
  ${DETALLES_LIBRO}
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
      ...DetallesLibro
    }
  }
  ${DETALLES_LIBRO}
`;
