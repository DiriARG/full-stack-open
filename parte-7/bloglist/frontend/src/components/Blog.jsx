import { useState } from 'react'

const Blog = ({ blog, usuario, onLike, onEliminar }) => {
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

  // Se envia el blog ya actualizado.
  const handleLike = async () => {
    onLike({
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id, // El backend requiere solo el id del usuario.
    })
  }

  const handleEliminar = async () => {
    const confirmacion = window.confirm(
      `¿Eliminar el blog "${blog.title}" de ${blog.author}?`,
    )

    // Si el usuario acepta...
    if (confirmacion) {
      // Se llama al prop "onEliminar" que realmente es "eliminarMutacion.mutate", mutate recibe el id del blog y React Query ejecuta "mutationFn(id)".
      onEliminar(blog.id)
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
