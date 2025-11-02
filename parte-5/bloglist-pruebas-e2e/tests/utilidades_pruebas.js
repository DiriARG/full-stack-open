const iniciarSesion = async (page, nombreDeUsuario, contraseña) => {
  await page.getByLabel("Nombre de usuario").fill(nombreDeUsuario);
  await page.getByLabel("Contraseña").fill(contraseña);
  await page.getByRole("button", { name: "Ingresá" }).click();
};

const crearBlog = async (page, titulo, autor, url) => {
  // Si el formulario de creación está abierto, cerrarlo (para que el botón "Crear nuevo blog" exista y sea clickeable).
  const botonCancelar = page.getByRole("button", { name: "Cancelar" });
  if (await botonCancelar.isVisible().catch(() => false)) {
    await botonCancelar.click();
    // Espera corta para que el DOM se actualice.
    await page.waitForTimeout(100);
  }

  await page.getByRole("button", { name: "Crear nuevo blog" }).click();
  await page.getByLabel("Titulo").fill(titulo);
  await page.getByLabel("Autor").fill(autor);
  await page.getByLabel("Url").fill(url);
  await page.getByRole("button", { name: "Crear" }).click();

  // Se espera explícitamente a que el nuevo blog aparezca en la lista (esto evita que el siguiente test falle).
  await page
    .locator('[data-testid="blog-item"]', { hasText: titulo })
    .waitFor({ state: "visible", timeout: 5000 });
};

const darLike = async (page, tituloBlog) => {
  // Localiza el contenedor del blog por data-testid y texto del título.
  const blogContainer = page
    .locator('[data-testid="blog-item"]')
    .filter({ hasText: tituloBlog });

  const botonMostrar = blogContainer.getByRole("button", { name: "Mostrar" });
  if (await botonMostrar.isVisible().catch(() => false)) {
    await botonMostrar.click();
    await page.waitForTimeout(100);
  }

  const botonLike = blogContainer.getByRole("button", { name: "Like" });
  await botonLike.waitFor({ state: "visible", timeout: 5000 });
  await botonLike.click();
};

const eliminarBlog = async (page, tituloBlog) => {
  const blogContainer = page.locator(".blog", { hasText: tituloBlog });

  await blogContainer.getByRole("button", { name: "Mostrar" }).click();

  /* "page.on('dialog')" captura el windows.confirm y lo acepta.
  Se coloca antes de mostrar la ventana de confirmación para eliminar el blog. */
  page.on("dialog", async (dialog) => {
    await dialog.accept();
  });

  await blogContainer.getByRole("button", { name: "Eliminar" }).click();
};

export { iniciarSesion, crearBlog, darLike, eliminarBlog };
