const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { GraphQLError } = require("graphql");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const mongoose = require("mongoose");
// Deshabilita el modo de consulta estricto de Mongoose. Esto evita una advertencia de consola y permite buscar documentos usando campos que NO estén definidos en el esquema (Schema).
mongoose.set("strictQuery", false);
const Author = require("./modelos/author");
const Book = require("./modelos/book");
const User = require("./modelos/user");
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
    // Devuelve al usuario autenticado según el token desde la función "context".
    me: (root, args, context) => {
      return context.usuarioActual || null;
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
    createUser: async (root, args) => {
      try {
        const usuario = new User({
          username: args.username,
          favoriteGenre: args.favoriteGenre,
        });

        return await usuario.save();
      } catch (error) {
        if (error.name === "ValidationError") {
          throw new GraphQLError("Error de validación al crear usuario.", {
            extensions: {
              code: "BAD_USER_INPUT",
              invalidArgs: Object.keys(error.errors),
              error,
            },
          });
        }
        throw error;
      }
    },
    // Devuelve un token JWT (campo value).
    login: async (root, args) => {
      const usuario = await User.findOne({ username: args.username });

      // En el ejercicio se asume que todos los usuarios tienen la misma contraseña.
      if (!usuario || args.password !== "secreta") {
        throw new GraphQLError("Credenciales inválidas", {
          extensions: { code: "BAD_USER_INPUT" },
        });
      }

      // Información que se incluye en el token.
      const contenidoToken = {
        id: usuario._id,
        username: usuario.username,
      };

      // Se firma el token con la clave secreta del .env.
      const tokenFirmado = jwt.sign(contenidoToken, process.env.JWT_SECRETO);

      return { value: tokenFirmado };
    },
    // El parámetro "args" es un objeto que contiene todos los valores que el usuario pasó a la consulta al momento de hacer la petición, osea basicamente, lo que escribe el usuario en la query.
    addBook: async (root, args, context) => {
      // Comprobación de autorización.
      if (!context.usuarioActual) {
        throw new GraphQLError("Debe iniciar sesión para agregar un libro", {
          extensions: { code: "UNAUTHENTICATED" },
        });
      }

      try {
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
      } catch (error) {
        if (error.name === "ValidationError") {
          throw new GraphQLError("Error de validación", {
            extensions: {
              code: "BAD_USER_INPUT",
              // Se obtienen los nombres de los campos que fallaron la validación.
              invalidArgs: Object.keys(error.errors),
              error,
            },
          });
        }

        // Si no es un error de validación (ej: error de duplicado), se relanza el error para que sea manejado por el servidor GraphQL.
        throw error;
      }
    },
    editAuthor: async (root, args, context) => {
      if (!context.usuarioActual) {
        throw new GraphQLError("Debe iniciar sesión para editar un autor", {
          extensions: { code: "UNAUTHENTICATED" },
        });
      }
      try {
        const autor = await Author.findOne({ name: args.name });

        if (!autor) {
          return null;
        }
        // Se modifica el objeto en memoria.
        autor.born = args.setBornTo;
        // Se guarda el cambio en la bd.
        await autor.save();

        return autor;
      } catch (error) {
        if (error.name === "ValidationError") {
          throw new GraphQLError("Error de validación.", {
            extensions: {
              code: "BAD_USER_INPUT",
              invalidArgs: Object.keys(error.errors),
              error,
            },
          });
        }

        throw error;
      }
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

  // La función 'context' actúa como un middleware de autenticación por cada operación GraphQL.
  context: async ({ req }) => {
    // Operador de encadenamiento opcional (`?.`) y OR lógico para obtener el encabezado 'Authorization' o `null`.
    const autorizacion = req?.headers?.authorization || null;

    // Si viene un token en formato 'Bearer <token>'...
    if (autorizacion && autorizacion.startsWith("Bearer ")) {
      // Se remueve el prefijo "Bearer " (que tiene 7 caracteres) para obtener solo el token JWT.
      const token = autorizacion.substring(7);

      try {
        // Se verifica el token usando la clave secreta del .env.
        const tokenDecodificado = jwt.verify(token, process.env.JWT_SECRETO);

        // Se busca al usuario correspondiente al ID dentro del token en la bd.
        const usuarioActual = await User.findById(tokenDecodificado.id);

        // Se devuelve el usuario autenticado para que sea accesible a todos los resolvers.
        return { usuarioActual };
      } catch (error) {
        console.log("Token inválido o expirado.");
        return {};
      }
    }

    // Si no hay token, se devuelve un contexto vacío (usuario no autenticado).
    return {};
  },
}).then(({ url }) => {
  console.log(`Servidor corriendo en ${url}`);
});
