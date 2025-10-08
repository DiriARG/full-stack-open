// Archivo que maneja las variables de entorno y configuración general. 
require('dotenv').config()

let PORT = process.env.PORT
let MONGODB_URI = process.env.MONGODB_URI

module.exports = { MONGODB_URI, PORT }