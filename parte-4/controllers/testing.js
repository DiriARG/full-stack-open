const router = require("express").Router();
const Blog = require("../models/blog");
const Usuario = require("../models/usuario");

// Este endpoint se utiliza exclusivamente durante las pruebas E2E.
router.post("/reset", async (request, response) => {
  // Vacia por completo la bd borrando todos los blogs y usuarios.
  await Blog.deleteMany({});
  await Usuario.deleteMany({});

  response.status(204).end();
});

module.exports = router;
