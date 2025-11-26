const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const middleware = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
  const nuevoBlog = request.body
  const usuario = request.user

  const blog = new Blog({
    title: nuevoBlog.title,
    author: nuevoBlog.author,
    url: nuevoBlog.url,
    likes: nuevoBlog.likes,
    user: usuario._id,
  })

  const blogGuardado = await blog.save()
  usuario.blogs = usuario.blogs.concat(blogGuardado._id)
  await usuario.save()

  response.status(201).json(blogGuardado)
})

blogsRouter.delete(
  '/:id',
  middleware.userExtractor,
  async (request, response) => {
    const usuario = request.user

    const blog = await Blog.findById(request.params.id)

    if (!blog) {
      return response.status(404).json({ error: 'Blog no encontrado' })
    }
    if (!blog.user) {
      return response
        .status(400)
        .json({ error: 'El blog no tiene un usuario asignado' })
    }

    if (blog.user.toString() !== usuario.id.toString()) {
      return response
        .status(403)
        .json({ error: 'No tienes los permisos para eliminar este blog' })
    }

    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  },
)

blogsRouter.put('/:id', async (request, response) => {
  const { title, author, url, likes, user } = request.body

  const blog = await Blog.findById(request.params.id)
  if (!blog) {
    return response.status(404).end()
  }

  blog.title = title
  blog.author = author
  blog.url = url
  blog.likes = likes

  if (user) {
    blog.user = typeof user === 'object' ? user.id || user._id : user
  }

  const blogActualizado = await blog.save()
  response.json(blogActualizado)
})

blogsRouter.post('/:id/comments', async (request, response) => {
  const { comment } = request.body
  const blog = await Blog.findById(request.params.id)

  if (!blog) {
    return response.status(404).json({ error: 'Blog no encontrado' })
  }

  blog.comments = blog.comments.concat(comment)
  const blogActualizado = await blog.save()

  response.status(201).json(blogActualizado)
})

module.exports = blogsRouter
