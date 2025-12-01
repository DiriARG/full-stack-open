const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");

let authors = [
  {
    name: "Robert Martin",
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: "Martin Fowler",
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963,
  },
  {
    name: "Fyodor Dostoevsky",
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821,
  },
  {
    name: "Joshua Kerievsky",
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  {
    name: "Sandi Metz",
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
];

let books = [
  {
    title: "Clean Code",
    published: 2008,
    author: "Robert Martin",
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring"],
  },
  {
    title: "Agile software development",
    published: 2002,
    author: "Robert Martin",
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ["agile", "patterns", "design"],
  },
  {
    title: "Refactoring, edition 2",
    published: 2018,
    author: "Martin Fowler",
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring"],
  },
  {
    title: "Refactoring to patterns",
    published: 2008,
    author: "Joshua Kerievsky",
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring", "patterns"],
  },
  {
    title: "Practical Object-Oriented Design, An Agile Primer Using Ruby",
    published: 2012,
    author: "Sandi Metz",
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring", "design"],
  },
  {
    title: "Crime and punishment",
    published: 1866,
    author: "Fyodor Dostoevsky",
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ["classic", "crime"],
  },
  {
    title: "Demons",
    published: 1872,
    author: "Fyodor Dostoevsky",
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ["classic", "revolution"],
  },
];

/* "type Query" → qué consultas están permitidas --> GraphQL solo define qué se puede hacer, pero no cómo hacerlo. 
"type Libro" es un Tipo de Objeto Personalizado. Define la forma de un objeto Libro, especificando sus campos (propiedades) y sus tipos (String!, Int!, etc) asociados.*/
const typeDefs = `
  type Libro {
    title: String!
    author: String!
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
    allBooks: [Libro!]!
    allAuthors: [Autor!]!
  }
`;

// Lógica real, que define como se responde a las consultas GraphQL.
const resolvers = {
  Query: {
    bookCount: () => books.length,
    authorCount: () => authors.length,
    allBooks: () => books,
    allAuthors: () => authors,
  },
  // Este objeto contiene la lógica para los campos de "type Autor" que no existen directamente en los datos originales (array "authors").
  Autor: {
    /* El parámetro "root" es el objeto "Autor" actual que se está procesando:
    EJ: en la primera ejecución, "root" es:
    { name: "Robert Martin", id: "...", born: 1952 } */
    bookCount: (root) => {
      /* Se filtra el arreglo global "books", comparando el campo "author" de cada libro (book.author) con el nombre del autor actual que estamos resolviendo (root.name);
      luego se cuenta la cantidad de libros que cumplen la condición (.length), calculando el número de libros para este autor específico. */
      return books.filter((book) => book.author === root.name).length;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
