const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('se muestra el formulario de inicio de sesión por defecto', async ({ page }) => {
    // Comprueba que el encabezado está visible.
    await expect(page.getByText('Inicie sesión en la aplicación')).toBeVisible()

    // Busca los inputs por su label.
    await expect(page.getByLabel('Nombre de usuario')).toBeVisible()
    await expect(page.getByLabel('Contraseña')).toBeVisible()

    // El botón para enviar el formulario.
    await expect(page.getByRole('button', { name: 'Ingresá' })).toBeVisible()
  })
})
