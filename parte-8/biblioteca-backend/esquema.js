/* "type Query" → qué consultas están permitidas --> GraphQL solo define qué se puede hacer, pero no cómo hacerlo. 
"type Libro" es un Tipo de Objeto Personalizado. Define la forma de un objeto Libro, especificando sus campos (propiedades) y sus tipos (String!, Int!, etc) asociados.
"type Mutation" → todas las operaciones que provocan cambio son mutaciones (crear, actualizar, borrar datos). 
"type Subscription" → Los clientes pueden suscribirse a actualizaciones sobre cambios en el servidor, el tipo de retorno debe ser un tipo de objeto personalizado ej: Libro. */
const typeDefs = `
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }  
  
  type Token {
    value: String! 
  }

  type Libro {
    title: String!
    author: Autor!
    published: Int!
    genres: [String!]!
    id: ID!
  }
  
  type Autor {
    name: String!
    id: ID!
    born: Int
    bookCount: Int! 
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Libro!]!
    allAuthors: [Autor!]!
    me: User
  }
  
  type Mutation {
  addBook(
    title: String!
    author: String!
    published: Int!
    genres: [String!]!
  ): Libro

  editAuthor(
    name: String!
    setBornTo: Int!
  ): Autor

  createUser(
    username: String!
    favoriteGenre: String!
  ): User

  login(
    username: String!
    password: String!
  ): Token

  }
  
  type Subscription {
    bookAdded: Libro!
  }
`;

module.exports = typeDefs;
