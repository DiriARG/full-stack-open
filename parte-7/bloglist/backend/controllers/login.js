const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const Usuario = require('../models/usuario')

loginRouter.post('/', async (request, response) => {
  const { username, password } = request.body

  const usuario = await Usuario.findOne({ username })

  const contraseñaCorrecta =
    usuario === null
      ? false
      : await bcrypt.compare(password, usuario.passwordHash)

  if (!(usuario && contraseñaCorrecta)) {
    return response.status(401).json({
      error: 'Nombre de usuario o contraseña no válidos',
    })
  }

  const datosParaToken = {
    username: usuario.username,
    id: usuario._id,
  }

  const token = jwt.sign(datosParaToken, process.env.SECRET)

  response
    .status(200)
    .send({ token, username: usuario.username, name: usuario.name })
})

module.exports = loginRouter
