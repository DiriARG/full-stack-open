const { ApolloServer } = require("@apollo/server");
const {
  ApolloServerPluginDrainHttpServer,
} = require("@apollo/server/plugin/drainHttpServer");
const { expressMiddleware } = require("@as-integrations/express5");
const { makeExecutableSchema } = require("@graphql-tools/schema");

const { WebSocketServer } = require("ws");
const { useServer } = require("graphql-ws/lib/use/ws");

const http = require("http");
const express = require("express");
const cors = require("cors");

const jwt = require("jsonwebtoken");

require("dotenv").config();
const mongoose = require("mongoose");
// Deshabilita el modo de consulta estricto de Mongoose. Esto evita una advertencia de consola y permite buscar documentos usando campos que NO estén definidos en el esquema (Schema).
mongoose.set("strictQuery", false);
const User = require("./modelos/user");

const typeDefs = require("./esquema");
const resolvers = require("./resolvers");
const { crearLoaderBookCount } = require("./loaders");

const MONGODB_URI = process.env.MONGODB_URI;

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Conectado a MongoDB");
  })
  .catch((error) => {
    console.log("Error al conectar a MongoDB:", error.message);
  });

const iniciarServidor = async () => {
  const app = express();
  // Creación de un servidor HTTP estándar a partir de la app Express (necesario para el servidor ws).
  const servidorHttp = http.createServer(app);

  // Configuración del servidor "WebSocket" que gestiona las suscripciones (graphql-ws).
  const servidorWs = new WebSocketServer({
    server: servidorHttp,
    path: "/",
  });

  // Se combina "typeDefs" y los "resolvers"  para formar el schema.
  const schema = makeExecutableSchema({ typeDefs, resolvers });
  // "useServer" enlaza el "schema" con el servidorWs, lo que devuelve un objeto con utilidades para controlar la vida del server ej: "dispose()".
  const limpiezaServidor = useServer({ schema }, servidorWs);

  // Creación del ApolloServer.
  const server = new ApolloServer({
    schema,
    plugins: [
      // Plugin oficial para esperar a que el servidor HTTP cierre correctamente.
      ApolloServerPluginDrainHttpServer({ httpServer: servidorHttp }),
      // Plugin personalizado para el cierre de "WebSockets".
      {
        async serverWillStart() {
          return {
            async drainServer() {
              // Cierra ordenamente todas las conexiones WS activas al apagar.
              await limpiezaServidor.dispose();
            },
          };
        },
      },
    ],
  });

  // Se arranca el sv Apollo (config interna).
  await server.start();

  /* Middleware de Express que conecta Apollo Server con el endpoint HTTP. 
  - cors(): habilita CORS.
  - express.json(): parsea body JSON.
  - expressMiddleware(server, { context: ... }): integra Apollo con Express y define la función "context" que estará disponible en todos los resolvers.
  */
  app.use(
    "/",
    cors(),
    express.json(),
    expressMiddleware(server, {
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
            const tokenDecodificado = jwt.verify(
              token,
              process.env.JWT_SECRETO
            );

            // Se busca al usuario correspondiente al ID dentro del token en la bd.
            const usuarioActual = await User.findById(tokenDecodificado.id);

            // Se devuelve el usuario autenticado para que sea accesible a todos los resolvers.
            return {
              usuarioActual,
              // Se agregan el DataLoader al contexto. Cada request (query o mutación) obtiene sus loaders propios para evitar mezclar cachés.
              loaders: {
                // Loader para agrupar y optimizar la consulta "bookCount".
                bookCountLoader: crearLoaderBookCount(),
              },
            };
          } catch (error) {
            console.log("Token inválido o expirado.");
            return {};
          }
        }

        // Si no hay token, se devuelve un contexto vacío (usuario no autenticado).
        return {};
      },
    })
  );

  const PUERTO = 4000;

  // Se inicia el servidor HTTP para escuchar ambos tráficos: HTTP (Apollo) y WS (Suscripciones).
  servidorHttp.listen(PUERTO, () =>
    console.log(` Servidor listo en http://localhost:${PUERTO}`)
  );
};

iniciarServidor();
