const { test, expect, beforeEach, describe } = require("@playwright/test");
const {
  iniciarSesion,
  crearBlog,
  darLike,
  eliminarBlog,
} = require("./utilidades_pruebas");

describe("Blog app", () => {
  beforeEach(async ({ page, request }) => {
    // Para vaciar la BD.
    await request.post("/api/testing/reset");

    // Se crea el usuario.
    await request.post("/api/users", {
      data: {
        username: "Diri",
        name: "Matías",
        password: "contrafacil",
      },
    });

    // Entrar a la app.
    await page.goto("/");
  });

  test("se muestra el formulario de inicio de sesión por defecto", async ({
    page,
  }) => {
    await expect(
      page.getByText("Inicie sesión en la aplicación")
    ).toBeVisible();

    await expect(page.getByLabel("Nombre de usuario")).toBeVisible();
    await expect(page.getByLabel("Contraseña")).toBeVisible();

    await expect(page.getByRole("button", { name: "Ingresá" })).toBeVisible();
  });

  test("inicio de sesión exitoso", async ({ page }) => {
    await iniciarSesion(page, "Diri", "contrafacil");
    await expect(page.getByText("Matías inició sesión")).toBeVisible();
  });

  test("inicio de sesión no exitoso", async ({ page }) => {
    await iniciarSesion(page, "Diri", "cewwc");

    // Se selecciona la notificación de error.
    const mensajeDeError = page.locator(".error");

    await expect(mensajeDeError).toHaveText(
      "Nombre de usuario y/o contraseña incorrectos"
    );
    await expect(mensajeDeError).toHaveCSS("border-style", "solid");
    await expect(mensajeDeError).toHaveCSS("color", "rgb(255, 0, 0)");

    // Confirma que no se muestra el mensaje de inicio de sesión (el "not" niega la condición "toBeVisible").
    await expect(page.getByText("Matías inició sesión")).not.toBeVisible();
  });

  describe("al iniciar sesión", () => {
    beforeEach(async ({ page }) => {
      await iniciarSesion(page, "Diri", "contrafacil");

      await crearBlog(
        page,
        "Blog de prueba E2E con Playwright",
        "Matías",
        "https://fullstackopen.com/es/part5/pruebas_de_extremo_a_extremo_playwright#ejercicios-5-17-5-23"
      );

    });

    test("se puede crear un nuevo blog", async ({ page }) => {
      const mensajeDeExito = page.locator(".exito");
      await expect(mensajeDeExito).toHaveText(
        "Nuevo blog añadido: Blog de prueba E2E con Playwright, por Matías"
      );
      await expect(mensajeDeExito).toHaveCSS("border-style", "solid");
      await expect(mensajeDeExito).toHaveCSS("color", "rgb(53, 156, 40)");

      await expect(
        page.getByText(
          "Nuevo blog añadido: Blog de prueba E2E con Playwright, por Matías"
        )
      ).toBeVisible();
    });

    test("se puede dar like a un blog", async ({ page }) => {
      const tituloBlog = "Blog de prueba E2E con Playwright";

      await darLike(page, tituloBlog);

      // Se ubica el blog.
      const blogContainer = page.locator(".blog", {
        hasText: tituloBlog,
      });

      // Se verifica que el contador de likes haya pasado a 1.
      await expect(blogContainer.getByTestId("contador-likes")).toHaveText("1");
    });

    test("el usuario que creó un blog puede eliminarlo", async ({ page }) => {
      /* Forzar la recarga de la página para obtener datos de usuario completos del blog del backend y renderizar el botón "Eliminar". */
      await page.reload();

      const tituloBlog = "Blog de prueba E2E con Playwright";

      await eliminarBlog(page, tituloBlog);

      await expect(page.getByText(tituloBlog)).not.toBeVisible();
    });
  });
});
