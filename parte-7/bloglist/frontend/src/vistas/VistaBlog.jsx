import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import servicioDeBlogs from '../services/blogs'

const VistaBlog = ({ onLike, onEliminar, usuario }) => {
  const id = useParams().id

  const {
    isPending,
    isError,
    data: blogs,
  } = useQuery({
    queryKey: ['blogs'],
    queryFn: servicioDeBlogs.getAll,
  })

  if (isPending) {
    return <div>Cargando blog...</div>
  }

  if (isError) {
    return <div>No se pudo cargar el blog.</div>
  }

  const blog = blogs.find((blog) => blog.id === id)

  if (!blog) {
    return null
  }

  // Se envia el blog ya actualizado.
  const handleLike = () => {
    onLike({
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id, // El backend requiere solo el id del usuario.
    })
  }

  const handleEliminar = () => {
    const confirmacion = window.confirm(
      `¿Eliminar el blog "${blog.title}" de ${blog.author}?`,
    )
    // Si el usuario acepta...
    if (confirmacion) {
      // Se llama al prop "onEliminar" que realmente es "eliminarMutacion.mutate", mutate recibe el id del blog y React Query ejecuta "mutationFn(id)".
      onEliminar(blog.id)
    }
  }

  const puedeEliminar = blog.user?.username === usuario?.username

  return (
    <div>
      <h2>
        {blog.title} {blog.author}
      </h2>

      <a href={blog.url}>{blog.url}</a>

      <div>
        {blog.likes} likes {''}
        <button onClick={handleLike}>Like</button>
      </div>

      <div>Añadido por {blog.user?.name}</div>

      <h3>Comentarios</h3>
      {/*
       - comentario → el texto de cada comentario.
       - i → índice de cada comentario (se usa como key porque los comentarios no tienen ID).
       El operador ?. evita errores si el array comments es undefined.
      */}
      <ul>
        {blog.comments?.map((comentario, i) => (
          <li key={i}>{comentario}</li>
        ))}
      </ul>

      {puedeEliminar && <button onClick={handleEliminar}>Eliminar</button>}
    </div>
  )
}

export default VistaBlog
