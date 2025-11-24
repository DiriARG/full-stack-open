import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import servicioLogin from './services/login'
import Notificacion from './components/Notificacion'
import BlogFormulario from './components/BlogFormulario'
import AlternarContenido from './components/AlternarContenido'
import servicioDeBlogs from './services/blogs'
import { useNotificacionDispatch } from './hooks'
import { useQuery } from '@tanstack/react-query'

const App = () => {
  const [nombreDeUsuario, setNombreDeUsuario] = useState('')
  const [contraseña, setContraseña] = useState('')
  const [usuario, setUsuario] = useState(null)

  // Reducer de notificaciones.
  const notificacionDispatch = useNotificacionDispatch()

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

  useEffect(() => {
    const usuarioLogueadoJSON = window.localStorage.getItem(
      'usuarioBlogListLogueado',
    )
    if (usuarioLogueadoJSON) {
      const usuario = JSON.parse(usuarioLogueadoJSON)
      setUsuario(usuario)
      blogService.setToken(usuario.token)
    }
  }, [])

  const agregarBlog = async (nuevoBlog) => {
    try {
      const blogCreado = await blogService.crear(nuevoBlog)

      mostrarNotificacion(
        `Nuevo blog añadido: ${blogCreado.title}, por ${blogCreado.author}`,
        'exito',
      )
      // Se retorna 'blogCreado' y la lista de blogs se refresca automáticamente (invalida la query 'blogs') mediante la configuración de la mutación de React Query/RTK Query.
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

      blogService.setToken(usuario.token)
      setUsuario(usuario)

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
    setUsuario(null)
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

      <AlternarContenido textoBoton="Crear nuevo blog">
        <BlogFormulario crearBlog={agregarBlog} />
      </AlternarContenido>

      {blogsOrdenados.map((blog) => (
        <Blog key={blog.id} blog={blog} blogs={blogs} usuario={usuario} />
      ))}
    </div>
  )
}

export default App
