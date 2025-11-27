import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import servicioDeUsuarios from '../services/usuarios'
import styled from 'styled-components'

const Contenedor = styled.div`
  max-width: 700px;
`

const Titulo = styled.h2`
  margin-bottom: 20px;
`

const Tabla = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 1rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  background-color: #FFFFFF;
  
`

const Encabezado = styled.th`
  background: #FFFFFF;
  padding: 12px;
  text-align: left;
  font-weight: 700;
  border-bottom: 2px solid #ddd;
`

const Fila = styled.tr`
  &:nth-child(even) {
    background: #fafafa;
  }

  &:hover {
    background: #ececec;
  }
`

const Celda = styled.td`
  padding: 12px;
  border-bottom: 1px solid #e0e0e0;
`

const EnlaceUsuario = styled(Link)`
  text-decoration: none;
  color: #007bff;
  font-weight: 600;

  &:hover {
    text-decoration: underline;
  }
`

const Usuarios = () => {
  const {
    isPending,
    isError,
    data: usuarios,
  } = useQuery({
    queryKey: ['usuarios'],
    queryFn: servicioDeUsuarios.obtenerTodo,
  })

  if (isPending) {
    return <div>Cargando usuarios...</div>
  }

  if (isError) {
    return (
      <div>
        El servicio de usuarios no está disponible debido a problemas en el
        servidor.
      </div>
    )
  }

  return (
    <Contenedor>
      <Titulo>Usuarios</Titulo>

      <Tabla>
        <thead>
          <tr>
            <Encabezado>Usuario</Encabezado>
            <Encabezado>Blogs creados</Encabezado>
          </tr>
        </thead>

        {/* Cuerpo de la tabla donde se listan los datos. */}
        <tbody>
          {usuarios.map((usuario) => (
            <Fila key={usuario.id}>
              <Celda>
                <EnlaceUsuario to={`/users/${usuario.id}`}>
                  {usuario.name}
                </EnlaceUsuario>
              </Celda>
              {/* Se muestra la longitud del array "blogs" del usuario (backend/models/usuario.js), que es la cantidad de blogs que ha creado. */}
              <Celda>{usuario.blogs.length}</Celda>
            </Fila>
          ))}
        </tbody>
      </Tabla>
    </Contenedor>
  )
}

export default Usuarios
