// Archivo que contiene middlewares personalizados de Express.
const logger = require("./logger");

// Registra en consola información de cada solicitud.
const registroDeSolicitudes = (request, response, next) => {
  logger.info("Método:", request.method);
  logger.info("Ruta:  ", request.path);
  logger.info("Cuerpo:  ", request.body);
  logger.info("---");
  next();
};

const rutaDesconocida = (request, response) => {
  response.status(404).send({ error: "Ruta no encontrada" });
};

const controladorDeErrores = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "ID con formato incorrecto" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  } else if (
    error.name === "MongoServerError" &&
    error.message.includes("E11000 duplicate key error")
  ) {
    return response.status(400).json({
      error: "El nombre de usuario ya está en uso.",
    });
  } else if (error.name === "JsonWebTokenError") {
    return response.status(401).json({ error: "token invalido" });
  }
  next(error);
};

// Middleware para extraer el token JWT del encabezado y adjuntarlo a request.token.
const extraerToken = (request, response, next) => {
  const cabeceraAutorizacion = request.get("authorization");
  // Se verifica si existe la cabecera y si empieza con "Bearer".
  if (cabeceraAutorizacion && cabeceraAutorizacion.startsWith("Bearer ")) {
    // Si existe, guarda el token en la request y se elimina el prefijo "Bearer".
    request.token = cabeceraAutorizacion.replace("Bearer ", "");
  } else {
    // Si no...
    request.token = null;
  }

  next();
};

module.exports = {
  registroDeSolicitudes,
  rutaDesconocida,
  controladorDeErrores,
  extraerToken,
};
