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

export { iniciarSesion, crearBlog };
