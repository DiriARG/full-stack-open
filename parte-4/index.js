// Archivo principal de la aplicación, importa "app.js" y pone en marcha el servidor HTTP.
const app = require("./app");
const config = require("./utils/config");
const logger = require("./utils/logger");

app.listen(config.PORT, () => {
  logger.info(`Servidor corriendo en puerto: ${config.PORT}`);
});
