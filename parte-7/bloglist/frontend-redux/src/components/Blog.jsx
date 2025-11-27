import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { darLikeBlog, eliminarBlog } from '../reducers/blogReducer'

const Blog = ({ blog, usuario }) => {
  const [mostrarDetalles, setMostrarDetalles] = useState(false)

  const dispatch = useDispatch()

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

  const handleLike = () => {
    // Se le pasa un id ya que el thunk lo espera.
    dispatch(darLikeBlog(blog.id))
  }

  const handleEliminar = async () => {
    const confirmacion = window.confirm(
      `¿Eliminar el blog "${blog.title}" de ${blog.author}?`,
    )

    if (confirmacion) {
      dispatch(eliminarBlog(blog.id))
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
