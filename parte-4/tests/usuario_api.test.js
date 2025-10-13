// Archivo de pruebas de los usuarios.
const assert = require("node:assert");
const { test, after, beforeEach, describe } = require("node:test");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Usuario = require("../models/usuario");
const utilidades = require("./utilidades_pruebas");

const api = supertest(app);

describe("cuando hay inicialmente algunos usuarios en la base de datos", () => {
  beforeEach(async () => {
    await Usuario.deleteMany({});
    const usuarioInicial = new Usuario(utilidades.usuarioInicial);
    await usuarioInicial.save();
  });

  describe("lectura de usuarios (GET)", () => {
    test("la lista de usuarios se devuelve correctamente en formato JSON", async () => {
      await api
        .get("/api/users")
        .expect(200)
        .expect("Content-Type", /application\/json/);
    });
  });

  describe("creación de usuarios (POST)", () => {
    test("la creación de un nuevo usuario es exitosa con datos válidos", async () => {
      const usuariosAntes = await utilidades.usuariosEnBd();

      const resultado = await api
        .post("/api/users")
        .send(utilidades.nuevoUsuario)
        .expect(201)
        .expect("Content-Type", /application\/json/);

      const usuariosDespues = await utilidades.usuariosEnBd();
      assert.strictEqual(usuariosDespues.length, usuariosAntes.length + 1);

      const usernames = usuariosDespues.map((usuario) => usuario.username);
      assert.ok(usernames.includes(utilidades.nuevoUsuario.username));

      // No se debe devolver el hash de contraseña.
      assert.ok(!("passwordHash" in resultado.body));
    });

    test("falla con código 400 si falta username o password", async () => {
      const usuariosAntes = await utilidades.usuariosEnBd();
      await api
        .post("/api/users")
        .send(utilidades.usuariosInvalidos.sinPassword)
        .expect(400);

      await api
        .post("/api/users")
        .send(utilidades.usuariosInvalidos.sinUsername)
        .expect(400);

      const usuariosDespues = await utilidades.usuariosEnBd();
      assert.strictEqual(usuariosDespues.length, usuariosAntes.length);
    });

    test("falla con código 400 si username o password tienen menos de 3 caracteres", async () => {
      const usuariosAntes = await utilidades.usuariosEnBd();
      const resultado1 = await api
        .post("/api/users")
        .send(utilidades.usuariosInvalidos.cortoUsername)
        .expect(400);

      assert.ok(
        resultado1.body.error.includes(
          "El nombre de usuario debe tener al menos 3 caracteres"
        )
      );

      const resultado2 = await api
        .post("/api/users")
        .send(utilidades.usuariosInvalidos.cortoPassword)
        .expect(400);

      assert.ok(
        resultado2.body.error.includes(
          "La contraseña debe tener al menos 3 caracteres"
        )
      );

      const usuariosDespues = await utilidades.usuariosEnBd();
      assert.strictEqual(usuariosDespues.length, usuariosAntes.length);
    });

    test("falla con código 400 si el username ya está en uso", async () => {
      const usuariosAntes = await utilidades.usuariosEnBd();

      const resultado = await api
        .post("/api/users")
        .send(utilidades.usuariosInvalidos.duplicado)
        .expect(400);

      assert.ok(
        resultado.body.error.includes("El nombre de usuario ya está en uso")
      );

      const usuariosDespues = await utilidades.usuariosEnBd();
      assert.strictEqual(usuariosDespues.length, usuariosAntes.length);
    });
  });
});

after(async () => {
  await mongoose.connection.close();
});
