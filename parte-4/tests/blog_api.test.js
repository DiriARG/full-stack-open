// Archivo de pruebas de integración que utiliza SuperTest para verificar las rutas de la API de blogs.
const assert = require("node:assert");
const { test, after, beforeEach, describe } = require("node:test");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
const Usuario = require("../models/usuario");
const utilidades = require("./utilidades_pruebas");

// Supertest crea un "cliente" que simula peticiones HTTP a la app sin arrancar un servidor real.
const api = supertest(app);

/* Esta es una variable global que se utiliza obviamente para guardar el token JWT obtenido al hacer login.
Es "let" y no "const" porque su valor se asigna dentro del beforeEach() y se utiliza en cada test cambiando de valor constantemente.*/
let token = "";

describe("cuando existen blogs iniciales guardados", () => {
  // Se limpia la bd antes de cada test.
  beforeEach(async () => {
    await Blog.deleteMany({});
    await Usuario.deleteMany({});

    // Se crea un usuario.
    await api.post("/api/users").send(utilidades.nuevoUsuario);
    // Se inicia sesión (/api/login) con las credenciales del usuario recién creado para obtener un token de autenticación.
    const respuestaLogin = await api.post("/api/login").send({
      username: utilidades.nuevoUsuario.username,
      password: utilidades.nuevoUsuario.password,
    });

    /* Se extrae el token del cuerpo (body) de la respuesta de inicio de sesión (respuestaLogin), y se asigna a la variable "token" declarada previamente con "let".
    Este token se usará luego en la cabecera "Authorization" de las peticiones protegidas (POST Y DELETE).*/
    token = respuestaLogin.body.token;

    // Se inserta los blogs iniciales.
    await Blog.insertMany(utilidades.primerosBlogs);
  });

  describe("lectura de blogs (GET)", () => {
    test("los blogs se devuelven como JSON", async () => {
      await api
        .get("/api/blogs")
        .expect(200)
        .expect("Content-Type", /application\/json/);
    });

    test("se devuelven todos los blogs iniciales", async () => {
      const respuesta = await api.get("/api/blogs");
      assert.strictEqual(
        respuesta.body.length,
        utilidades.primerosBlogs.length
      );
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
  });

  describe("creación de blogs (POST)", () => {
    test("se puede crear un nuevo blog con un token válido", async () => {
      // Estado real actual de la BD.
      const blogsAntes = await utilidades.blogsEnBd();

      // Acá se produce un cambio, osea se agrega un nuevo blog.
      await api
        .post("/api/blogs")
        .set("Authorization", `Bearer ${token}`)
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
      const respuesta = await api
        .post("/api/blogs")
        .set("Authorization", `Bearer ${token}`)
        .send(utilidades.blogsInvalidos.sinLikes)
        .expect(201)
        .expect("Content-Type", /application\/json/);

      // Se verifica que tenga 0 likes.
      assert.strictEqual(respuesta.body.likes, 0);
    });

    test("falla con código de estado 400 si faltan title o url", async () => {
      const blogsAntes = await utilidades.blogsEnBd();

      await api
        .post("/api/blogs")
        .set("Authorization", `Bearer ${token}`)
        .send(utilidades.blogsInvalidos.sinTitulo)
        .expect(400);

      await api
        .post("/api/blogs")
        .set("Authorization", `Bearer ${token}`)
        .send(utilidades.blogsInvalidos.sinUrl)
        .expect(400);

      const blogsDespues = await utilidades.blogsEnBd();

      // Se afirma que no se agregó ningún blog.
      assert.strictEqual(blogsDespues.length, blogsAntes.length);
    });

    test("falla con 401 si no se proporciona token", async () => {
      const blogsAntes = await utilidades.blogsEnBd();

      await api.post("/api/blogs").send(utilidades.blogValido).expect(401);

      const blogsDespues = await utilidades.blogsEnBd();
      assert.strictEqual(blogsDespues.length, blogsAntes.length);
    });
  });

  describe("eliminación de blogs (DELETE)", () => {
    test("eliminar un blog existente con un token válido", async () => {
      // Primero se crea un nuevo blog, enviando el token en el header, porque solo un usuario autenticado puede crear y eliminar blogs.
      const nuevoBlog = await api
        .post("/api/blogs")
        .set("Authorization", `Bearer ${token}`)
        .send(utilidades.blogValido);

      // Estado inicial de la bd.
      const blogsAntes = await utilidades.blogsEnBd();

      // Se guarda el blog recíen creado.
      const blogAEliminar = nuevoBlog.body;

      // Petición de DELETE.
      await api
        .delete(`/api/blogs/${blogAEliminar.id}`)
        .set("Authorization", `Bearer ${token}`)
        .expect(204);

      // Estado de la bd después de eliminar el blog.
      const blogsDespues = await utilidades.blogsEnBd();

      // Busqueda de todos los IDs de los blogs que siguen existiendo.
      const ids = blogsDespues.map((blog) => blog.id);
      // Verificación que el ID del blog eliminado ya no esté en la bd.
      assert.ok(!ids.includes(blogAEliminar.id));
      // Verificación que la cantidad de blogs haya disminuido en 1.
      assert.strictEqual(blogsDespues.length, blogsAntes.length - 1);
    });
  });

  describe("actualización de blogs (PUT)", () => {
    test("actualiza correctamente los likes de un blog existente", async () => {
      const blogsAntes = await utilidades.blogsEnBd();
      const blogAActualizar = blogsAntes[0];

      const blogActualizado = {
        // Copia todas las propiedades del objeto original (blogAActualizar) en este nuevo objeto.
        ...blogAActualizar,
        // Se incrementa en +1 la propiedad de likes, si tiene 7 pasa a 8 likes.
        likes: blogAActualizar.likes + 1,
      };

      const respuesta = await api
        .put(`/api/blogs/${blogAActualizar.id}`)
        .send(blogActualizado)
        .expect(200)
        .expect("Content-Type", /application\/json/);

      // Se verifica que la respuesta HTTP tenga la misma cantidad de likes que el blog que se envió (blogActualizado).
      assert.strictEqual(respuesta.body.likes, blogActualizado.likes);

      const blogsDespues = await utilidades.blogsEnBd();
      // Se busca el blog con el mismo id que el que se actualizó.
      const blogFinal = blogsDespues.find(
        (blog) => blog.id === blogAActualizar.id
      );
      assert.strictEqual(blogFinal.likes, blogActualizado.likes);
    });
  });
});

// Cierre de conexión a la base de datos una vez terminadas las pruebas.
after(async () => {
  await mongoose.connection.close();
});
