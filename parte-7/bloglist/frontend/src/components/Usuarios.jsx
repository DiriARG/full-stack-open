import { useQuery } from '@tanstack/react-query'
import servicioDeUsuarios from '../services/usuarios'

const Usuarios = () => {
  const {
    isPending,
    isError,
    data: usuarios,
  } = useQuery({
    queryKey: ['usuarios'],
    queryFn: servicioDeUsuarios.obtenerTodo,
  })

  if (isPending) return <div>Cargando usuarios...</div>

  if (isError) {
    return (
      <div>
        El servicio de usuarios no está disponible debido a problemas en el
        servidor.
      </div>
    )
  }

  return (
    <div>
      <h2>Usuarios</h2>

      <table>
        <thead>
          <tr>
            <th>Usuario</th>
            <th>Blogs creados</th>
          </tr>
        </thead>

        {/* Cuerpo de la tabla donde se listan los datos. */}
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.id}>
              <td>{usuario.name}</td>
              {/* Se muestra la longitud del array "blogs" del usuario (backend/models/usuario.js), que es la cantidad de blogs que ha creado. */}
              <td>{usuario.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}


export default Usuarios
