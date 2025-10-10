// Archivo donde se definen las rutas y controladores relacionados con los blogs.
const blogsRouter = require("express").Router();
const { response } = require("express");
const Blog = require("../models/blog");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogsRouter.post("/", async (request, response) => {
  const nuevoBlog = request.body;

  const blog = new Blog({
    title: nuevoBlog.title,
    author: nuevoBlog.author,
    url: nuevoBlog.url,
    likes: nuevoBlog.likes,
  });

  const blogGuardado = await blog.save();
  response.status(201).json(blogGuardado);
});

blogsRouter.delete("/:id", async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id);
  response.status(204).end();
});

module.exports = blogsRouter;
