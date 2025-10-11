// Archivo que centraliza los mensajes de log, para imprimir información y errores en consola.
const info = (...params) => {
  // No imprime en consola si el entorno es de prueba (NODE_ENV === "test").
  if (process.env.NODE_ENV !== "test") {
    console.log(...params);
  }
};

const error = (...params) => {
  if (process.env.NODE_ENV !== "test") {
    console.error(...params);
  }
};
module.exports = { info, error };
