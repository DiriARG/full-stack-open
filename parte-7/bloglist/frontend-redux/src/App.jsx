import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Blog from './components/Blog'
import Notificacion from './components/Notificacion'
import BlogFormulario from './components/BlogFormulario'
import AlternarContenido from './components/AlternarContenido'
import {
  setNotificacion,
  limpiarNotificacion,
} from './reducers/notificacionReducer'
import { inializarBlogs, crearNuevoBlog } from './reducers/blogReducer'
import {
  inicializarUsuario,
  loginUsuario,
  salirUsuario,
} from './reducers/usuarioReducer'

const App = () => {
  const [nombreDeUsuario, setNombreDeUsuario] = useState('')
  const [contraseña, setContraseña] = useState('')

  const dispatch = useDispatch()

  // Función para mostrar notificaciones durante 5 segundos.
  const mostrarNotificacion = (texto, tipo = 'exito') => {
    /* Dispatch de la acción: Establece el estado de la notificación en el store de Redux. El reducer `setNotificacion` (en el slice 'notificacion') sobrescribe el estado
  actual con el nuevo objeto { texto: string, tipo: 'exito' | 'error' }.*/
    dispatch(setNotificacion({ texto, tipo }))
    setTimeout(() => dispatch(limpiarNotificacion()), 5000)
  }

  // Los blogs y el usuario vienen de Redux (store), no de useState.
  const blogs = useSelector((state) => state.blogs)
  const usuario = useSelector((state) => state.usuario)

  useEffect(() => {
    dispatch(inializarBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(inicializarUsuario())
  }, [dispatch])

  const agregarBlog = async (nuevoBlog) => {
    try {
      await dispatch(crearNuevoBlog(nuevoBlog))

      mostrarNotificacion(
        `Nuevo blog añadido: ${nuevoBlog.title}, por ${nuevoBlog.author}`,
        'exito',
      )
    } catch (error) {
      console.log(error)
      mostrarNotificacion('Error al crear el blog', 'error')
    }
  }

  const handleLogin = async (evento) => {
    evento.preventDefault()
    try {
      await dispatch(
        loginUsuario({
          username: nombreDeUsuario,
          password: contraseña,
        }),
      )

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
    dispatch(salirUsuario())
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
        <Blog key={blog.id} blog={blog} usuario={usuario} />
      ))}
    </div>
  )
}

export default App
