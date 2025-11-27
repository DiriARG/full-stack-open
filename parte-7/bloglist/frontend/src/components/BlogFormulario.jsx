import { useState } from 'react'
import PropTypes from 'prop-types'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import styled from 'styled-components'

const Formulario = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 20px;
  background: #679ad4ff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-width: 1000px;
`

// Una fila con label + input.
const Grupo = styled.div`
  display: flex;
  flex-direction: column;
`

const EtiquetaLabel = styled.label`
  font-weight: 600;
  margin-bottom: 5px;
`

const CampoInput = styled.input`
  padding: 10px;
  border: 1px solid #bbb;
  border-radius: 6px;
  font-size: 1rem;
  transition: border 0.2s ease;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`

const BotonCrear = styled.button`
  background: #1c599bff;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  font-weight: 600;
  margin-top: 10px;
  transition: background 0.2s ease;

  &:hover {
    background: #0056b3;
  }
`

const BlogFormulario = ({ crearBlog }) => {
  const [titulo, setTitulo] = useState('')
  const [autor, setAutor] = useState('')
  const [url, setUrl] = useState('')

  const clienteQuery = useQueryClient()

  const crearBlogMutacion = useMutation({
    mutationFn: crearBlog,
    onSuccess: () => {
      clienteQuery.invalidateQueries({ queryKey: ['blogs'] })
    },
  })

  const agregarBlog = (evento) => {
    evento.preventDefault()

    crearBlogMutacion.mutate({
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

      <Formulario onSubmit={agregarBlog}>
        <Grupo>
          <EtiquetaLabel>Título</EtiquetaLabel>
          <CampoInput
            type="text"
            value={titulo}
            onChange={({ target }) => setTitulo(target.value)}
          />
        </Grupo>

        <Grupo>
          <EtiquetaLabel>Autor</EtiquetaLabel>
          <CampoInput
            type="text"
            value={autor}
            onChange={({ target }) => setAutor(target.value)}
          />
        </Grupo>

        <Grupo>
          <EtiquetaLabel>URL</EtiquetaLabel>
          <CampoInput
            type="url"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </Grupo>

        <BotonCrear type="submit">Crear</BotonCrear>
      </Formulario>
    </div>
  )
}

BlogFormulario.propTypes = {
  crearBlog: PropTypes.func.isRequired,
}

export default BlogFormulario
