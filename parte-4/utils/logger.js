// Archivo que centraliza los mensajes de log, para imprimir información y errores en consola.
const info = (...params) => {
  console.log(...params)
}

const error = (...params) => {
  console.error(...params)
}

module.exports = { info, error }