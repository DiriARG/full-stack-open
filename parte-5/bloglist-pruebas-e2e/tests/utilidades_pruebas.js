const iniciarSesion = async (page, nombreDeUsuario, contraseña) => {
  await page.getByLabel("Nombre de usuario").fill(nombreDeUsuario);
  await page.getByLabel("Contraseña").fill(contraseña);
  await page.getByRole("button", { name: "Ingresá" }).click();
};

export { iniciarSesion };
