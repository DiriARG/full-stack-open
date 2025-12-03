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
    bookCount: async () => Book.countDocuments(),
    authorCount: async () => Author.countDocuments(),
    allBooks: async (root, args) => {
      // Se crea un objeto vacío para el filtro de busqueda, si no se pasa ningun parámetro, este objeto queda vacío y se devuelve todos los libros.
      const filtro = {};

      /* Si el usuario envía un parámetro "genre", se filtra por género. 
      Para buscar dentro de un array en mongo se utiliza el operador $in. */
      if (args.genre) {
        filtro.genres = { $in: [args.genre] };
      }

      // Busca los libros aplicando el filtro y ".populate('author')" incluye el objeto completo del autor en lugar de solo su ID.
      return Book.find(filtro).populate("author");
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
    bookCount: async (root) => {
      // Calcula y devuelve el número exacto de libros en la colección "Book" que estan asociados con el ID (_id) del autor actualmente procesado (root).
      return Book.countDocuments({ author: root._id });
    },
  },
  // Resolver para las mutaciones.
  Mutation: {
    // El parámetro "args" es un objeto que contiene todos los valores que el usuario pasó a la consulta al momento de hacer la petición, osea basicamente, lo que escribe el usuario en la query.
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
    editAuthor: async (root, args) => {
      const autor = await Author.findOne({ name: args.name });

      if (!autor) {
        return null;
      }

      // Se modifica el objeto en memoria.
      autor.born = args.setBornTo;
      // Se guarda el cambio en la bd.
      await autor.save();

      return autor;
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
