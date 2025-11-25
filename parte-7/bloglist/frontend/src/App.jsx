import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import servicioLogin from './services/login'
import Notificacion from './components/Notificacion'
import BlogFormulario from './components/BlogFormulario'
import AlternarContenido from './components/AlternarContenido'
import servicioDeBlogs from './services/blogs'
import {
  useNotificacionDispatch,
  useUsuario,
  useUsuarioDispatch,
} from './hooks'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Link, Routes, Route } from 'react-router-dom'
import Usuarios from './components/Usuarios'

const App = () => {
  const [nombreDeUsuario, setNombreDeUsuario] = useState('')
  const [contraseña, setContraseña] = useState('')

  // Reducer de notificaciones.
  const notificacionDispatch = useNotificacionDispatch()

  // El estado de 'usuario' se gestiona de forma global usando Context + useReducer.
  const usuario = useUsuario()
  const usuarioDispatch = useUsuarioDispatch()

  const clienteQuery = useQueryClient()

  // Función para mostrar notificaciones.  "exito" es valor por defecto cuando no se especifica.
  const mostrarNotificacion = (texto, tipo = 'exito') => {
    notificacionDispatch({
      type: 'SET',
      payload: { texto, tipo },
    })

    setTimeout(() => {
      notificacionDispatch({ type: 'LIMPIAR' })
    }, 5000)
  }

  const {
    isPending,
    isError,
    data: blogs,
  } = useQuery({
    queryKey: ['blogs'],
    queryFn: servicioDeBlogs.getAll,
  })

  const likeMutacion = useMutation({
    mutationFn: servicioDeBlogs.actualizar,
    onSuccess: () => {
      clienteQuery.invalidateQueries({ queryKey: ['blogs'] })
    },
  })

  const eliminarMutacion = useMutation({
    mutationFn: servicioDeBlogs.eliminar,
    onSuccess: () => {
      clienteQuery.invalidateQueries({ queryKey: ['blogs'] })
    },
  })

  useEffect(() => {
    const usuarioLogueadoJSON = window.localStorage.getItem(
      'usuarioBlogListLogueado',
    )
    if (usuarioLogueadoJSON) {
      const usuario = JSON.parse(usuarioLogueadoJSON)
      servicioDeBlogs.setToken(usuario.token)

      // Se actualiza el estado global del usuario usando el reducer.
      usuarioDispatch({
        type: 'SET_USUARIO',
        payload: usuario,
      })
    }
  }, [usuarioDispatch]) // Se coloca porque al utilizar una variable creada fuera de useEffect, debe ir en el array de dependencias.

  const agregarBlog = async (nuevoBlog) => {
    try {
      const blogCreado = await servicioDeBlogs.crear(nuevoBlog)

      mostrarNotificacion(
        `Nuevo blog añadido: ${blogCreado.title}, por ${blogCreado.author}`,
        'exito',
      )
      // Se retorna 'blogCreado' y la lista de blogs se refresca automáticamente (invalida la query 'blogs') mediante la configuración de la mutación de React Query.
      return blogCreado
    } catch (error) {
      console.log(error)
      mostrarNotificacion('Error al crear el blog', 'error')
    }
  }

  const handleLogin = async (evento) => {
    evento.preventDefault()
    try {
      const usuario = await servicioLogin.login({
        username: nombreDeUsuario,
        password: contraseña,
      })

      window.localStorage.setItem(
        'usuarioBlogListLogueado',
        JSON.stringify(usuario),
      )

      servicioDeBlogs.setToken(usuario.token)
      usuarioDispatch({
        type: 'SET_USUARIO',
        payload: usuario,
      })

      setNombreDeUsuario('')
      setContraseña('')
    } catch (error) {
      console.log('Error en login: ', error)
      mostrarNotificacion(
        'Nombre de usuario y/o contraseña incorrectos',
        'error',
      )
    }
  }

  const handleCerrarSesion = () => {
    window.localStorage.removeItem('usuarioBlogListLogueado')
    // Se quita el token del servicio HTTP.
    servicioDeBlogs.setToken(null)
    // Y el estado global del usuario vuelve a null.
    usuarioDispatch({ type: 'SALIR' })
    mostrarNotificacion('Sesión cerrada', 'exito')
  }

  const formularioLogin = () => (
    <form onSubmit={handleLogin}>
      <div>
        <label>
          Nombre de usuario{' '}
          <input
            type="text"
            value={nombreDeUsuario}
            onChange={({ target }) => setNombreDeUsuario(target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Contraseña{' '}
          <input
            type="password"
            value={contraseña}
            onChange={({ target }) => setContraseña(target.value)}
          />
        </label>
      </div>
      <button type="submit">Ingresá</button>
    </form>
  )

  if (usuario === null) {
    return (
      <div>
        <h2>Inicie sesión en la aplicación</h2>
        <Notificacion />
        {formularioLogin()}
      </div>
    )
  }

  if (isPending) {
    return <div>Cargando data...</div>
  }

  if (isError) {
    return (
      <div>
        El servicio de blogs no está disponible debido a problemas en el
        servidor.
      </div>
    )
  }

  const blogsOrdenados = [...blogs].sort((blog1, blog2) => {
    return blog2.likes - blog1.likes
  })

  return (
    <div>
      <h2>blogs</h2>
      <Notificacion />

      <p>
        {usuario.name} inició sesión{' '}
        <button onClick={handleCerrarSesion}>Salir</button>
      </p>

      <Routes>
        <Route
          path="/"
          element={
            <>
              <AlternarContenido textoBoton="Crear nuevo blog">
                <BlogFormulario crearBlog={agregarBlog} />
              </AlternarContenido>

              {/* "onLike" y "onEliminar" al ser una prop que representan eventos, osea una acción, comienzan con "on". */}
              {blogsOrdenados.map((blog) => (
                <Blog
                  key={blog.id}
                  blog={blog}
                  usuario={usuario}
                  onLike={likeMutacion.mutate}
                  onEliminar={eliminarMutacion.mutate}
                />
              ))}
            </>
          }
        />

        <Route path="/users" element={<Usuarios />} />
      </Routes>
    </div>
  )
}

export default App
