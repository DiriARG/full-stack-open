import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, blogs, setBlogs, usuario, handleLikeProp }) => {
  const [mostrarDetalles, setMostrarDetalles] = useState(false)

  const estiloDeBlog = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const alternarDetalles = () => {
    setMostrarDetalles(!mostrarDetalles)
  }

  const handleLike = async () => {
    if (handleLikeProp) {
      handleLikeProp(blog)
      return
    }

    const blogActualizado = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id || blog.user,
    }

    const respuesta = await blogService.actualizar(blog.id, blogActualizado)

    const blogConUsuario = {
      ...respuesta,
      user: blog.user,
    }

    setBlogs(blogs.map((b) => (b.id === blog.id ? blogConUsuario : b)))
  }

  const handleEliminar = async () => {
    const confirmacion = window.confirm(
      `¿Eliminar el blog "${blog.title}" de ${blog.author}?`,
    )

    if (confirmacion) {
      try {
        await blogService.eliminar(blog.id)
        setBlogs(blogs.filter((b) => b.id !== blog.id))
      } catch (error) {
        console.error('Error al eliminar el blog: ', error)
      }
    }
  }

  const mostrarBotonEliminar = blog.user?.username === usuario?.username

  return (
    <div style={estiloDeBlog} className="blog" data-testid="blog-item">
      {' '}
      <div className="blogResumen">
        {blog.title} {blog.author}{' '}
        <button onClick={alternarDetalles}>
          {mostrarDetalles ? 'Ocultar' : 'Mostrar'}
        </button>
      </div>
      {mostrarDetalles && (
        <div className="blogDetalles">
          <div>{blog.url}</div>
          <div>
            Likes <span data-testid="contador-likes">{blog.likes}</span>{' '}
            <button onClick={handleLike}>Like</button>
          </div>
          <div>{blog.user?.name}</div>

          {mostrarBotonEliminar && (
            <button onClick={handleEliminar}>Eliminar</button>
          )}
        </div>
      )}
    </div>
  )
}

export default Blog
