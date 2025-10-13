// Archivo donde se definen las rutas y controladores relacionados con los blogs.
const jwt = require("jsonwebtoken");
const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const Usuario = require("../models/usuario");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs);
});

// Función auxiliar que aísla el token del encabezado "authorization".
const extraerToken = (request) => {
  const cabeceraAutorizacion = request.get("authorization");
  // Se verifica si existe la cabecera y si empieza con "Bearer".
  if (cabeceraAutorizacion && cabeceraAutorizacion.startsWith("Bearer ")) {
    // Si existe, se elimina el prefijo "Bearer" y devuelve solo el token.
    return cabeceraAutorizacion.replace("Bearer ", "");
  }
  // Si no...
  return null;
};

blogsRouter.post("/", async (request, response) => {
  const nuevoBlog = request.body;

  // Con "jwt.verify", verifica si el token obtenido (extraerToken) es válido respecto a la firma del token de la clave secreta.
  const tokenDecodificado = jwt.verify(
    extraerToken(request),
    process.env.SECRET
  );
  // Se comprueba si el token decodificado contiene el id del usuario.
  if (!tokenDecodificado.id) {
    return response.status(401).json({ error: "token invalido" });
  }
  // Utiliza el id obtenido del token para buscar al usuario correspondiente en la bd.
  const usuario = await Usuario.findById(tokenDecodificado.id);

  // Si el token es valido pero el id del usuario no existe...
  if (!usuario) {
    return response
      .status(400)
      .json({ error: "ID de usuario faltante o no válido" });
  }
  const blog = new Blog({
    title: nuevoBlog.title,
    author: nuevoBlog.author,
    url: nuevoBlog.url,
    likes: nuevoBlog.likes,
    user: usuario._id, // Se utiliza "_id" porque mongoose espera un ObjectId.
  });

  const blogGuardado = await blog.save();
  // Se agrega el nuevo blog creado al array "blogs" del usuario.
  usuario.blogs = usuario.blogs.concat(blogGuardado._id);
  await usuario.save();

  response.status(201).json(blogGuardado);
});

blogsRouter.delete("/:id", async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id);
  response.status(204).end();
});

blogsRouter.put("/:id", async (request, response) => {
  const { title, author, url, likes } = request.body;

  const blog = await Blog.findById(request.params.id);
  if (!blog) {
    return response.status(404).end();
  }

  blog.title = title;
  blog.author = author;
  blog.url = url;
  blog.likes = likes;

  const blogActualizado = await blog.save();
  response.json(blogActualizado);
});

module.exports = blogsRouter;
