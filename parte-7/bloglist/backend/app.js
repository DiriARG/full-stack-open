const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const config = require('./utils/config')
const logger = require('./utils/logger')
const blogsRouter = require('./controllers/blogs')
const middleware = require('./utils/middleware')
const usuariosRouter = require('./controllers/usuarios')
const loginRouter = require('./controllers/login')

const app = express()

logger.info('Conectando a', config.MONGODB_URI)

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    console.log('Conectado a MongoDB')
  })
  .catch((error) => {
    console.log('Error al conectar a MongoDB: ', error.message)
  })

app.use(cors())
app.use(express.json())
app.use(middleware.registroDeSolicitudes)
app.use(middleware.extraerToken)

app.use('/api/login', loginRouter)
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usuariosRouter)

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing')
  app.use('/api/testing', testingRouter)
}

app.use(middleware.rutaDesconocida)
app.use(middleware.controladorDeErrores)

module.exports = app
