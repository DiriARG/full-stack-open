// Archivo de pruebas de integración que utiliza SuperTest para verificar las rutas de la API de blogs.
const assert = require("node:assert");
const { test, after, beforeEach } = require("node:test");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
const utilidades = require("./utilidades_pruebas");

// Supertest crea un "cliente" que simula peticiones HTTP a la app sin arrancar un servidor real.
const api = supertest(app);

// Antes de cada test se limpia la base de datos y se cargan los blogs iniciales.
beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(utilidades.primerosBlogs);
});

test("los blogs se devuelven como JSON", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("se devuelven todos los blogs iniciales", async () => {
  const respuesta = await api.get("/api/blogs");
  assert.strictEqual(respuesta.body.length, utilidades.primerosBlogs.length);
});

// Cierre de conexión a la base de datos una vez terminadas las pruebas.
after(async () => {
  await mongoose.connection.close();
});
