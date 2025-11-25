import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import servicioDeUsuarios from '../services/usuarios'

const Usuario = () => {
  // Manera correcta o también: const { id } = useParams().
  const id = useParams().id

  const {
    isPending,
    isError,
    data: usuarios,
  } = useQuery({
    queryKey: ['usuarios'],
    queryFn: servicioDeUsuarios.obtenerTodo,
  })

  if (isPending) {
    return <div>Cargando usuario...</div>
  }

  if (isError) {
    return <div>No se pudo obtener la información del usuario.</div>
  }

  const usuario = usuarios.find((usuario) => usuario.id === id)

  // Para evitar el error al actualizar la página.
  if (!usuario) {
    return null
  }

  return (
    <div>
      <h2>{usuario.name}</h2>

      <h4>Blogs agregados</h4>
      <ul>
        {usuario.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default Usuario
