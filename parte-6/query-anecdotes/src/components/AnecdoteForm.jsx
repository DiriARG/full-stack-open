import { useMutation, useQueryClient } from '@tanstack/react-query'
import { crearAnecdota } from '../peticiones'

const AnecdoteForm = () => {
  const clienteQuery = useQueryClient()

  const nuevaAnecdotaMutacion = useMutation({
    mutationFn: crearAnecdota,
    // Cuando la creación es exitosa, se invalida la query, provocando que React Query actualice automáticamente las anécdotas.
    onSuccess: () => {
      clienteQuery.invalidateQueries({ queryKey: ['anecdotas'] })
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
