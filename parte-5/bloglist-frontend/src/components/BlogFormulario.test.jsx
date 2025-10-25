import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogFormulario from './BlogFormulario'

describe('<BlogFormulario />', () => {
  test('llama a crearBlog con los datos correctos cuando se envía el formulario', async () => {
    const usuario = userEvent.setup()
    const crearBlog = vi.fn()

    render(<BlogFormulario crearBlog={crearBlog} />)

    // Se seleccionan los inputs.
    const inputTitulo = screen.getByLabelText(/Titulo/i)
    const inputAutor = screen.getByLabelText(/Autor/i)
    const inputUrl = screen.getByLabelText(/Url/i)

    //  El usuario escribe en los campos.
    await usuario.type(inputTitulo, 'Probando el formulario')
    await usuario.type(inputAutor, 'Matías Di Risio')
    await usuario.type(inputUrl, 'http://ejemplo.com')

    //  Se envía el formulario.
    const botonCrear = screen.getByText('Crear')
    await usuario.click(botonCrear)

    expect(crearBlog.mock.calls).toHaveLength(1)

    // Se obtiene el argumento con el que se llamó (los datos enviados).
    const datosLlamada = crearBlog.mock.calls[0][0]

    // Se comprueba que los datos coincidan con los valores ingresados.
    expect(datosLlamada).toEqual({
      title: 'Probando el formulario',
      author: 'Matías Di Risio',
      url: 'http://ejemplo.com',
    })
  })
})
