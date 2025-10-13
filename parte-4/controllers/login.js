const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const loginRouter = require("express").Router();
const Usuario = require("../models/usuario");

loginRouter.post("/", async (request, response) => {
  const { username, password } = request.body;

  // Se busca al usuario en la bd.
  const usuario = await Usuario.findOne({ username });
  // Se verifica la contraseña.
  const contraseñaCorrecta =
    usuario === null
      ? false
      : await bcrypt.compare(password, usuario.passwordHash);

  if (!(usuario && contraseñaCorrecta)) {
    return response.status(401).json({
      error: "Nombre de usuario o contraseña no válidos",
    });
  }

  // Objeto con la información para firmar el token.
  const datosParaToken = {
    username: usuario.username,
    id: usuario._id,
  };

  // Se crea el JWT.
  const token = jwt.sign(datosParaToken, process.env.SECRET);

  // Se envia el token y la info del usuario en la respuesta.
  response
    .status(200)
    .send({ token, username: usuario.username, name: usuario.name });
});

module.exports = loginRouter;
