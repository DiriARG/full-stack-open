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
  }

  next(error);
};

module.exports = {
  registroDeSolicitudes,
  rutaDesconocida,
  controladorDeErrores,
};
