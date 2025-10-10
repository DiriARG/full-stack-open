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

test("el identificador único del blog se llama id", async () => {
  const respuesta = await api.get("/api/blogs");

  // Se toma un blog, en este caso, el primero para comprobar si el formato de salida es el correcto.
  const blog = respuesta.body[0];
  // "assert.ok" comprueba que el blog tenga la propiedad id, si no lo tiene dropea el mensaje.
  assert.ok(blog.id, "El blog no tiene propiedad id");
  // Verifica que la propiedad "_id" no exista, osea undefined (variable no declarada / sin valor).
  assert.strictEqual(blog._id, undefined);
});

test("se puede crear un nuevo blog con el POST", async () => {
  // Estado real actual de la BD.
  const blogsAntes = await utilidades.blogsEnBd();

  // Acá se produce un cambio, osea se agrega un nuevo blog.
  await api
    .post("/api/blogs")
    .send(utilidades.blogValido)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  // Ahora, la BD, ya contiene el nuevo blog.
  const blogsDespues = await utilidades.blogsEnBd();
  assert.strictEqual(blogsDespues.length, blogsAntes.length + 1);

  // Verificación, creando un nuevo array con solo los titulos...
  const titulos = blogsDespues.map((blog) => blog.title);
  // Luego se comprueba que dentro de ese array exista el título del blog que recién se creo.
  assert.ok(titulos.includes(utilidades.blogValido.title));
});

test("si falta la propiedad likes, se asigna 0 por defecto", async () => {
  const nuevoBlogSinLikes = {
    title: "Blog sin likes",
    author: "Diri - VLLC!",
    url: "http://nolikes.com",
  };

  await api
    .post("/api/blogs")
    .send(nuevoBlogSinLikes)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blogs = await utilidades.blogsEnBd();
  const blogAgregado = blogs.find((blog) => blog.title === "Blog sin likes");

  // Se verifica que tenga 0 likes.
  assert.strictEqual(blogAgregado.likes, 0);
});

test("falla con código de estado 400 si faltan title o url", async () => {
  const blogSinTitulo = {
    author: "SrMaTyD",
    url: "https://steamcommunity.com/id/SrMaTyD",
    likes: 5,
  };

  const blogSinUrl = {
    title: "Antiguo aka",
    author: "FeAr*",
    likes: 2,
  };

  const blogsAntes = await utilidades.blogsEnBd();

  await api.post("/api/blogs").send(blogSinTitulo).expect(400);
  await api.post("/api/blogs").send(blogSinUrl).expect(400);

  const blogsDespues = await utilidades.blogsEnBd();

  // Se afirma que no se agregó ningún blog.
  assert.strictEqual(blogsDespues.length, blogsAntes.length);
});

test("eliminar un blog existente", async () => {
  // Estado inicial de la BD.
  const blogsAntes = await utilidades.blogsEnBd();
  // Se agarra el primero para eliminar.
  const blogAEliminar = blogsAntes[0];

  await api.delete(`/api/blogs/${blogAEliminar.id}`).expect(204);

  const blogsDespues = await utilidades.blogsEnBd();

  // Se crea un nuevo array que contiene solo los id de los blogs que quedaron después de la eliminación.
  const ids = blogsDespues.map((blog) => blog.id);
  // El array "ids" NO INCLUYE el id del blog eliminado (blogAEliminar).
  assert.ok(!ids.includes(blogAEliminar.id));
  
  assert.strictEqual(blogsDespues.length, blogsAntes.length - 1);
});

// Cierre de conexión a la base de datos una vez terminadas las pruebas.
after(async () => {
  await mongoose.connection.close();
});
