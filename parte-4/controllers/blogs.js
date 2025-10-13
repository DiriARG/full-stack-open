// Archivo donde se definen las rutas y controladores relacionados con los blogs.
const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const Usuario = require("../models/usuario");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.post("/", async (request, response) => {
  const nuevoBlog = request.body;
  
  // Por ahora, se elije al primer usuario existente.
  const usuario = await Usuario.findOne();
  
  const blog = new Blog({
    title: nuevoBlog.title,
    author: nuevoBlog.author,
    url: nuevoBlog.url,
    likes: nuevoBlog.likes,
    user: usuario._id // Se utiliza "_id" porque mongoose espera un ObjectId.
  });

  const blogGuardado = await blog.save();
  // Se agrega el nuevo blog creado al array "blogs" del usuario.
  usuario.blogs = usuario.blogs.concat(blogGuardado._id)
  await usuario.save()

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
