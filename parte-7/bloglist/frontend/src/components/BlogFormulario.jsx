import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogFormulario = ({ crearBlog }) => {
  const [titulo, setTitulo] = useState('')
  const [autor, setAutor] = useState('')
  const [url, setUrl] = useState('')

  const agregarBlog = (evento) => {
    evento.preventDefault()

    crearBlog({
      title: titulo,
      author: autor,
      url: url,
    })

    setTitulo('')
    setAutor('')
    setUrl('')
  }

  return (
    <div>
      <h3>Crear nuevo blog</h3>
      <form onSubmit={agregarBlog}>
        <div>
          <label>
            Titulo:{' '}
            <input
              type="text"
              value={titulo}
              onChange={({ target }) => setTitulo(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Autor:{' '}
            <input
              type="text"
              value={autor}
              onChange={({ target }) => setAutor(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Url:{' '}
            <input
              type="url"
              value={url}
              onChange={({ target }) => setUrl(target.value)}
            />
          </label>
        </div>
        <button type="submit">Crear</button>
      </form>
    </div>
  )
}

BlogFormulario.propTypes = {
  crearBlog: PropTypes.func.isRequired,
}

export default BlogFormulario
