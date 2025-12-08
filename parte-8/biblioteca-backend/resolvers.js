const { GraphQLError } = require("graphql");
const { PubSub } = require("graphql-subscriptions");
const jwt = require("jsonwebtoken");
const Author = require("./modelos/author");
const Book = require("./modelos/book");
const User = require("./modelos/user");

// PubSub es el mecanismo en memoria para manejar suscripciones. Provee el método "publish" para enviar eventos y "asyncIterator" para recibirlos.
const pubsub = new PubSub();

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
    // Resolver optimizado con "DataLoader". 
    bookCount: async (root, args, { loaders }) => {
      // Delega la petición al loader, que recopila el ID del autor y aplaza la consulta real. Esto resuelve el problema n+1 al agrupar múltiples IDs en una solo query a la bd (batch --> agrupación de consultas).
      return loaders.bookCountLoader.load(root._id); //"root._id" es el ID del autor actual.
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

        // Popula el campo "author" para devolver un objeto Author completo (en lugar de solo el ObjectId).
        const libroPopulado = await nuevoLibro.populate("author");

        // Se publica el evento "BOOK_ADDED" con el payload ("bookAdded"). Esto notifica a todos los clientes que están suscritos.
        pubsub.publish("BOOK_ADDED", { bookAdded: libroPopulado });

        return libroPopulado;
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
  Subscription: {
    bookAdded: {
      // Esto permite a los clientes recibir datos en tiempo real cuando se publica un evento.
      subscribe: () => pubsub.asyncIterator("BOOK_ADDED"),
    },
  },
};

module.exports = resolvers;
