import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import servicioDeBlogs from '../services/blogs'
import styled from 'styled-components'

const Contenedor = styled.div`
  max-width: 700px;
`

const Titulo = styled.h2`
  margin-bottom: 10px;
`

const Link = styled.a`
  color: #007bff;
  font-size: 1.1rem;
  &:hover {
    text-decoration: underline;
  }
`

const Likes = styled.div`
  margin: 10px 0;
  font-size: 1.1rem;
`

const Boton = styled.button`
  padding: 6px 12px;
  margin-left: 8px;
  border: none;
  background: #007bff;
  color: white;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background: #0066d3;
  }
`

// Texto "Añadido por...".
const Autor = styled.div`
  margin: 10px 0 20px 0;
  font-style: italic;
  color: #555;
`

// Título de la sección comentarios.
const Subtitulo = styled.h3`
  margin-top: 25px;
  margin-bottom: 10px;
`

const Formulario = styled.form`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`

const CampoInput = styled.input`
  flex-grow: 1;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
`

const ListaComentarios = styled.ul`
  list-style: disc inside;
  padding-left: 10px;
  margin-top: 10px;
`

const Comentario = styled.li`
  padding: 6px 0;
  border-bottom: 1px solid #eee;
`

const VistaBlog = ({ onLike, onEliminar, usuario, onComentar }) => {
  const [nuevoComentario, setNuevoComentario] = useState('')
  const id = useParams().id

  const {
    isPending,
    isError,
    data: blogs,
  } = useQuery({
    queryKey: ['blogs'],
    queryFn: servicioDeBlogs.getAll,
  })

  if (isPending) {
    return <div>Cargando blog...</div>
  }

  if (isError) {
    return <div>No se pudo cargar el blog.</div>
  }

  const blog = blogs.find((blog) => blog.id === id)

  if (!blog) {
    return null
  }

  // Se envia el blog ya actualizado.
  const handleLike = () => {
    onLike({
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id, // El backend requiere solo el id del usuario.
    })
  }

  const handleEliminar = () => {
    const confirmacion = window.confirm(
      `¿Eliminar el blog "${blog.title}" de ${blog.author}?`,
    )
    // Si el usuario acepta...
    if (confirmacion) {
      // Se llama al prop "onEliminar" que realmente es "eliminarMutacion.mutate", mutate recibe el id del blog y React Query ejecuta "mutationFn(id)".
      onEliminar(blog.id)
    }
  }

  const puedeEliminar = blog.user?.username === usuario?.username

  const handleAgregarComentario = (evento) => {
    evento.preventDefault()

    onComentar({
      id: blog.id,
      comentario: nuevoComentario,
    })

    setNuevoComentario('')
  }

  return (
    <Contenedor>
      <Titulo>
        {blog.title} {blog.author}
      </Titulo>

      <Link href={blog.url}>{blog.url}</Link>

      <Likes>
        {blog.likes} likes
        <Boton onClick={handleLike}>Like</Boton>
      </Likes>

      <Autor>Añadido por {blog.user?.name}</Autor>

      <Subtitulo>Comentarios</Subtitulo>

      <Formulario onSubmit={handleAgregarComentario}>
        <CampoInput
          type="text"
          value={nuevoComentario}
          placeholder="Escribe un comentario..."
          onChange={(evento) => setNuevoComentario(evento.target.value)}
        />
        <Boton type="submit">Agregar</Boton>
      </Formulario>

      {/*
       - comentario → el texto de cada comentario.
       - i → índice de cada comentario (se usa como key porque los comentarios no tienen ID).
       El operador ?. evita errores si el array comments es undefined.
      */}
      <ListaComentarios>
        {blog.comments?.map((comentario, i) => (
          <Comentario key={i}>{comentario}</Comentario>
        ))}
      </ListaComentarios>

      {puedeEliminar && (
        <Boton style={{ background: '#ec782bff' }} onClick={handleEliminar}>
          Eliminar
        </Boton>
      )}
    </Contenedor>
  )
}

export default VistaBlog
