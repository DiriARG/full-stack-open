const bcrypt = require("bcrypt");
const usuariosRouter = require("express").Router();
const Usuario = require("../models/usuario");

usuariosRouter.get("/", async (request, response) => {
  const usuarios = await Usuario.find({});
  response.json(usuarios);
});

// Endpoint que crea un nuevo usuario.
usuariosRouter.post("/", async (request, response) => {
  const { username, name, password } = request.body;

  // Validaciones.
  if (!username || !password) {
    return response
      .status(400)
      .json({ error: "Se requiere nombre de usuario y contraseña" });
  }

  if (username.length < 3) {
    return response
      .status(400)
      .json({ error: "El nombre de usuario debe tener al menos 3 caracteres" });
  }

  if (password.length < 3) {
    return response
      .status(400)
      .json({ error: "La contraseña debe tener al menos 3 caracteres" });
  }

  // Cantidad de rondas de "sal" que se utilizan para encriptar la contraseña.
  const rondasDeSal = 10;
  // Acá se cifra la contraseña ("password") proporcionada, utilizando bcrypt y las rondas definidas.
  const passwordHash = await bcrypt.hash(password, rondasDeSal);

  // Se crea un nuevo objeto "Usuario", donde se guardan los datos y la contra cifrada.
  const usuario = new Usuario({
    username,
    name,
    passwordHash,
  });

  // Se guarda el nuevo usuario en la bd.
  const usuarioGuardado = await usuario.save();

  // Se muestra el nuevo usuario creado.
  response.status(201).json(usuarioGuardado);
});

module.exports = usuariosRouter;
