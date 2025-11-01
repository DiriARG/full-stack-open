const iniciarSesion = async (page, nombreDeUsuario, contraseña) => {
  await page.getByLabel("Nombre de usuario").fill(nombreDeUsuario);
  await page.getByLabel("Contraseña").fill(contraseña);
  await page.getByRole("button", { name: "Ingresá" }).click();
};

const crearBlog = async (page, titulo, autor, url) => {
  await page.getByRole("button", { name: "Crear nuevo blog" }).click();
  await page.getByLabel("Titulo").fill(titulo);
  await page.getByLabel("Autor").fill(autor);
  await page.getByLabel("Url").fill(url);
  await page.getByRole("button", { name: "Crear" }).click();
};

const darLike = async (page, tituloBlog) => {
  // Localiza el contenedor HTML del blog que contenga el texto del título (".blog" es la clase raíz del componente blog).
  const blogContainer = page.locator(".blog", { hasText: tituloBlog });

  await blogContainer.getByRole("button", { name: "Mostrar" }).click();
  await blogContainer.getByRole("button", { name: "Like" }).click();
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
