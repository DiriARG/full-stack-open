const logger = require('./logger')
const jwt = require('jsonwebtoken')
const Usuario = require('../models/usuario')

const registroDeSolicitudes = (request, response, next) => {
  logger.info('Método:', request.method)
  logger.info('Ruta:  ', request.path)
  logger.info('Cuerpo:  ', request.body)
  logger.info('---')
  next()
}

const rutaDesconocida = (request, response) => {
  response.status(404).send({ error: 'Ruta no encontrada' })
}

const controladorDeErrores = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'ID con formato incorrecto' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (
    error.name === 'MongoServerError' &&
    error.message.includes('E11000 duplicate key error')
  ) {
    return response.status(400).json({
      error: 'El nombre de usuario ya está en uso.',
    })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: 'Token invalido' })
  }
  next(error)
}

const extraerToken = (request, response, next) => {
  const cabeceraAutorizacion = request.get('authorization')
  if (cabeceraAutorizacion && cabeceraAutorizacion.startsWith('Bearer ')) {
    request.token = cabeceraAutorizacion.replace('Bearer ', '')
  } else {
    request.token = null
  }

  next()
}

const userExtractor = async (request, response, next) => {
  if (!request.token) {
    return response.status(401).json({ error: 'Token faltante' })
  }
  const tokenDecodificado = jwt.verify(request.token, process.env.SECRET)

  if (!tokenDecodificado.id) {
    return response.status(401).json({ error: 'Token inválido' })
  }
  request.user = await Usuario.findById(tokenDecodificado.id)

  if (!request.user) {
    return response.status(404).json({ error: 'Usuario no encontrado' })
  }

  next()
}

module.exports = {
  registroDeSolicitudes,
  rutaDesconocida,
  controladorDeErrores,
  extraerToken,
  userExtractor,
}
