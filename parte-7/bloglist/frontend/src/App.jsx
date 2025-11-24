import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import servicioLogin from './services/login'
import Notificacion from './components/Notificacion'
import BlogFormulario from './components/BlogFormulario'
import AlternarContenido from './components/AlternarContenido'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notificacion, setNotificacion] = useState(null)
  const [nombreDeUsuario, setNombreDeUsuario] = useState('')
  const [contraseña, setContraseña] = useState('')
  const [usuario, setUsuario] = useState(null)

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const usuarioLogueadoJSON = window.localStorage.getItem(
      'usuarioBlogListLogueado'
    )
    if (usuarioLogueadoJSON) {
      const usuario = JSON.parse(usuarioLogueadoJSON)
      setUsuario(usuario)
      blogService.setToken(usuario.token)
    }
  }, [])

  const agregarBlog = (nuevoBlog) => {
    blogService.crear(nuevoBlog).then((blogCreado) => {
      setBlogs(blogs.concat(blogCreado))

      setNotificacion({
        texto: `Nuevo blog añadido: ${blogCreado.title}, por ${blogCreado.author}`,
        tipo: 'exito',
      })
      setTimeout(() => {
        setNotificacion(null)
      }, 5000)
    })
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
        JSON.stringify(usuario)
      )

      blogService.setToken(usuario.token)
      setUsuario(usuario)

      setNombreDeUsuario('')
      setContraseña('')
    } catch (error) {
      console.log('Error en login: ', error)
      setNotificacion({
        texto: 'Nombre de usuario y/o contraseña incorrectos',
        tipo: 'error',
      })
      setTimeout(() => {
        setNotificacion(null)
      }, 5000)
    }
  }

  const handleCerrarSesion = () => {
    window.localStorage.removeItem('usuarioBlogListLogueado')
    setUsuario(null)
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
        <Notificacion mensaje={notificacion} />
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
      <Notificacion mensaje={notificacion} />
      <p>
        {usuario.name} inició sesión{' '}
        <button onClick={handleCerrarSesion}>Salir</button>
      </p>

      <AlternarContenido textoBoton="Crear nuevo blog">
        <BlogFormulario crearBlog={agregarBlog} />
      </AlternarContenido>

      {blogsOrdenados.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          blogs={blogs}
          setBlogs={setBlogs}
          usuario={usuario}
        />
      ))}
    </div>
  )
}

export default App
