import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import servicioLogin from './services/login'
import Notificacion from './components/Notificacion'
import BlogFormulario from './components/BlogFormulario'
import AlternarContenido from './components/AlternarContenido'

const App = () => {
  const [blogs, setBlogs] = useState([])
  // Ahora, este componente muestra ambos tipos de mensaje (exito y error).
  const [notificacion, setNotificacion] = useState(null)
  const [nombreDeUsuario, setNombreDeUsuario] = useState('')
  const [contraseña, setContraseña] = useState('')
  const [usuario, setUsuario] = useState(null)

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  // La aplicación verifica si los detalles de un usuario que ha iniciado sesión ya se encuentran en el local storage.
  useEffect(() => {
    const usuarioLogueadoJSON = window.localStorage.getItem(
      'usuarioBlogListLogueado'
    )
    // Si se encuentran ahi...
    if (usuarioLogueadoJSON) {
      const usuario = JSON.parse(usuarioLogueadoJSON)
      // Los detalles se guardan en el estado de la aplicación.
      setUsuario(usuario)
      // Se restaura el token en el servicio de blogs, permitiendo al usuario seguir realizando acciones (ej: crear blogs, etc) sin necesidad de iniciar sesión nuevamente.
      blogService.setToken(usuario.token)
    }
  }, [])

  const agregarBlog = (nuevoBlog) => {
    // Se envía el nuevo blog al backend mediante el servicio.
    blogService.crear(nuevoBlog).then((blogCreado) => {
      // Si la creación es exitosa, se actualiza el estado local para mostrar el nuevo blog junto a los otros en pantalla.
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

  // Maneja el envío del formulario de inicio de sesión.
  const handleLogin = async (evento) => {
    evento.preventDefault()
    try {
      const usuario = await servicioLogin.login({
        // El post del login en el backend espera las variables username y password (parte 4), por lo tanto se los renombra.
        username: nombreDeUsuario,
        password: contraseña,
      })

      // Se guarda los datos del usuario en localStorage.
      window.localStorage.setItem(
        'usuarioBlogListLogueado',
        JSON.stringify(usuario)
      )

      // Se configura el token de autenticación en el servicio de blogs para que las futuras peticiones incluyan la autorización necesaria.
      blogService.setToken(usuario.token)
      // Se guardan los datos del usuario y su token.
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
    // Se renderiza el componente y ahora toma el siguiente valor: usuario === null, por lo tanto se muestra nuevamente el formulario de login.
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

  // Si el usuario es null (no inició sesión), se renderiza el formulario.
  if (usuario === null) {
    return (
      <div>
        <h2>Inicie sesión en la aplicación</h2>
        <Notificacion mensaje={notificacion} />
        {formularioLogin()}
      </div>
    )
  }

  /* Función para ordenar los blogs por número de "likes" de forma descendente.
  Se crea una copia del array "blogs" con el operador spread para no modificar el estado original. */
  const blogsOrdenados = [...blogs].sort((blog1, blog2) => {
    return blog2.likes - blog1.likes
  })

  // Si el usuario no es null (inicia sesión), se muestra el nombre del usuario y una lista de blogs.
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

      {/*
       Le enviamos las funciones necesarias para actualizar la lista:
       - blogs: el arreglo completo de blogs, necesario para poder actualizar la lista (por ejemplo, al hacer click a "like").
       - setBlogs: la función que actualiza el estado del listado en App.jsx.
       - usuario: el objeto del usuario logueado, crucial para verificar si el usuario actual es el autor del blog.
       Esto permite que cada componente Blog pueda modificar el listado general si se actualiza un elemento.
      */}
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
