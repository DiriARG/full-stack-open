const bcrypt = require('bcrypt')
const usuariosRouter = require('express').Router()
const Usuario = require('../models/usuario')

usuariosRouter.get('/', async (request, response) => {
  const usuarios = await Usuario.find({}).populate('blogs', {
    url: 1,
    title: 1,
    author: 1,
  })
  response.json(usuarios)
})

usuariosRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  if (!username || !password) {
    return response
      .status(400)
      .json({ error: 'Se requiere nombre de usuario y contraseña' })
  }

  if (username.length < 3) {
    return response
      .status(400)
      .json({ error: 'El nombre de usuario debe tener al menos 3 caracteres' })
  }

  if (password.length < 3) {
    return response
      .status(400)
      .json({ error: 'La contraseña debe tener al menos 3 caracteres' })
  }

  const rondasDeSal = 10
  const passwordHash = await bcrypt.hash(password, rondasDeSal)

  const usuario = new Usuario({
    username,
    name,
    passwordHash,
  })

  const usuarioGuardado = await usuario.save()

  response.status(201).json(usuarioGuardado)
})

module.exports = usuariosRouter
