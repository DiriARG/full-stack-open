const { test, expect, beforeEach, describe } = require("@playwright/test");
const { iniciarSesion } = require("./utilidades_pruebas");

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

    // Espera a que el mensaje de error aparezca en el DOM.
    await page.waitForSelector('.error');
    
    // Se selecciona la notificación de error.
    const mensajeDeError = page.locator('.error')
    
    await expect(mensajeDeError).toHaveText('Nombre de usuario y/o contraseña incorrectos')
    await expect(mensajeDeError).toHaveCSS('border-style', 'solid')
    await expect(mensajeDeError).toHaveCSS('color', 'rgb(255, 0, 0)')

    // Confirma que no se muestra el mensaje de inicio de sesión (el "not" niega la condición "toBeVisible").
    await expect(page.getByText('Matías inició sesión')).not.toBeVisible()
  });
});
