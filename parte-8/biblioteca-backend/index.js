const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { v4: uuid } = require("uuid");
require("dotenv").config();
const mongoose = require("mongoose");
// Deshabilita el modo de consulta estricto de Mongoose. Esto evita una advertencia de consola y permite buscar documentos usando campos que NO estén definidos en el esquema (Schema).
mongoose.set("strictQuery", false);
const Author = require("./modelos/author");
const Book = require("./modelos/book");
const book = require("./modelos/book");
const MONGODB_URI = process.env.MONGODB_URI;

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Conectado a MongoDB");
  })
  .catch((error) => {
    console.log("Error al conectar a MongoDB:", error.message);
  });

/* "type Query" → qué consultas están permitidas --> GraphQL solo define qué se puede hacer, pero no cómo hacerlo. 
"type Libro" es un Tipo de Objeto Personalizado. Define la forma de un objeto Libro, especificando sus campos (propiedades) y sus tipos (String!, Int!, etc) asociados.
"type Mutation" → todas las operaciones que provocan cambio son mutaciones (crear, actualizar, borrar datos). */
const typeDefs = `
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
}
`;

// Lógica real, que define como se responde a las consultas GraphQL.
const resolvers = {
  Query: {
    bookCount: () => books.length,
    authorCount: () => authors.length,
    // El parámetro "args" es un objeto que contiene todos los valores que el usuario pasó a la consulta al momento de hacer la petición, osea basicamente, lo que escribe el usuario en la query.
    allBooks: async () => {
      return Book.find({}).populate("author")
    },
    allAuthors: async () => {
      return Author.find({});
    },
  },
  // Este objeto contiene la lógica para los campos de "type Autor" que no existen directamente en los datos originales.
  Autor: {
    /* El parámetro "root" es el objeto "Autor" actual que se está procesando:
    EJ: en la primera ejecución, "root" es:
    { name: "Robert Martin", id: "...", born: 1952 } */
    bookCount: () => 0
  },
  // Resolver para las mutaciones.
  Mutation: {
    addBook: async (root, args) => {
      // Se comprueba si existe el autor.
      let autor = await Author.findOne({ name: args.author });

      // Si no existe el autor...
      if (!autor) {
        // Se crea uno nuevo.
        autor = new Author({ name: args.author });
        // Se lo guarda.
        await autor.save();
      }

      // Se crea el nuevo libro.
      const nuevoLibro = new Book({
        title: args.title,
        published: args.published,
        genres: args.genres,
        author: autor._id,
      });

      await nuevoLibro.save();

      return nuevoLibro.populate("author");
    },
    editAuthor: (root, args) => {
      const autor = authors.find((a) => a.name === args.name);

      if (!autor) {
        return null;
      }

      const autorActualizado = {
        ...autor,
        born: args.setBornTo,
      };

      // Se actualiza el array global "authors" de forma inmutable, se utiliza map para reemplazar el objeto viejo con el objeto actualizado.
      authors = authors.map((a) =>
        a.name === args.name ? autorActualizado : a
      );

      return autorActualizado;
    },
  },
};

// Se crea el servidor GraphQL usando el esquema (typeDefs) y los resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
