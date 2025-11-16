import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useContext } from 'react'
import { crearAnecdota } from '../peticiones'
import NotificacionContext from '../NotificacionContext'

const AnecdoteForm = () => {
  const clienteQuery = useQueryClient()

  const [_, notificacionDispatch] = useContext(NotificacionContext)

  const nuevaAnecdotaMutacion = useMutation({
    mutationFn: crearAnecdota,
    // Cuando la creación es exitosa, se invalida la query, provocando que React Query actualice automáticamente las anécdotas.
    onSuccess: (nuevaAnecdota) => {
      clienteQuery.invalidateQueries({ queryKey: ['anecdotas'] })

      notificacionDispatch({
        type: 'SET',
        payload: `Anécdota creada: '${nuevaAnecdota.content}'`,
      })

      setTimeout(() => {
        notificacionDispatch({ type: 'LIMPIAR' })
      }, 5000)
    },

    // Cuando el servidor devuelve error (contenido < 5 caracteres).
    onError: (error) => {
      // Mensaje del servidor --> error.response.data.error.
      const mensaje = error.response?.data?.error || 'Error inesperado'

      notificacionDispatch({
        type: 'SET',
        payload: mensaje,
      })

      setTimeout(() => {
        notificacionDispatch({ type: 'LIMPIAR' })
      }, 5000)
    },
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    console.log('new anecdote')
    // Se envia el objeto con el formato que el backend espera.
    nuevaAnecdotaMutacion.mutate({
      content,
      votes: 0,
    })
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
