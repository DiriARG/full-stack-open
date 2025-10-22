import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
  test('muestra título y autor pero no URL ni likes por defecto', () => {
    // Se simula un objeto de blog, exactamente igual al que el componente <Blog /> recibiría si la app estuviera funcionando normalmente.
    const blog = {
      title: 'Aprendiendo React Testing',
      author: 'Matías Di Risio',
      url: 'http://ejemplo.com',
      likes: 10,
      user: { username: 'DiriARG' },
      id: '123',
    }

    /* Monta el componente React en un entorno de prueba (gracias a jsdom) y devuelve métodos para interactuar y hacer queries sobre el DOM renderizado.
    Se pasan props con valores simulados para que el test funcione. */
    render(
      <Blog
        blog={blog} // Blog actual que va a mostrar.
        blogs={[]} // Lista de todos los blogs (vacía).
        setBlogs={() => {}} // Una función vacía, porque en el test no queremos modificar nada real.
        usuario={{ username: 'DiriARG' }} // Usuario logueado, necesario para permisos.
      />
    )

    // El título y el autor deben mostrarse; "getByText" busca texto que debe existir.
    expect(screen.getByText(/Aprendiendo React Testing/i)).toBeDefined()
    expect(screen.getByText(/Matías Di Risio/i)).toBeDefined()

    // La URL y los likes NO deben mostrarse al inicio; "queryByText" busca texto que no debería existir (devuelve null si no está).
    const url = screen.queryByText('http://ejemplo.com')
    expect(url).toBeNull()

    const likes = screen.queryByText('Likes 10')
    expect(likes).toBeNull()
  })
  test('muestra la URL y los likes cuando se hace clic en el botón "Mostrar"', async () => {
    const blog = {
      title: 'Aprendiendo React Testing',
      author: 'Matías Di Risio',
      url: 'http://ejemplo.com',
      likes: 10,
      user: { username: 'DiriARG' },
      id: '123',
    }

    render(
      <Blog
        blog={blog}
        blogs={[]}
        setBlogs={() => {}}
        usuario={{ username: 'DiriARG' }}
      />
    )

    // Creación de una instancia de userEvent (para simular interacciones de usuario).
    const usuario = userEvent.setup()

    const botonMostrar = screen.getByText('Mostrar')
    // Simula un clic real.
    await usuario.click(botonMostrar)

    // Ahora, tras hacer clic, deberían aparecer la URL y los likes; toBeVisible() verifica la visibilidad de un elemento para el ususario.
    expect(screen.getByText('http://ejemplo.com')).toBeVisible()
    expect(screen.getByText('Likes 10')).toBeVisible()

  })
})
