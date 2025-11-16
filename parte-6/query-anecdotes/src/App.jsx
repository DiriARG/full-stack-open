import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useContext } from 'react'
import { obtenerAnecdotas, actualizarAnecdota } from './peticiones'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import NotificacionContext from "./NotificacionContext"

const App = () => {
  const clienteQuery = useQueryClient()

  // Se extreae SOLO el dispatch del conteo. "_" indica que se ignora el primer valor (el msj actual) y solo utiliza el segundo (la función dispatch).
  const [_, notificacionDispatch] = useContext(NotificacionContext)

  const { isPending, isError, data } = useQuery({
    queryKey: ['anecdotas'],
    queryFn: obtenerAnecdotas,
    retry: false,
  })

  const votarMutacion = useMutation({
    mutationFn: actualizarAnecdota,
    onSuccess: () => {
      clienteQuery.invalidateQueries({ queryKey: ['anecdotas'] })
    },
  })

  // La consulta aún no tiene datos.
  if (isPending) {
    return <div>Cargando data...</div>
  }

  // Si hay error... (en casos, como cuando se apaga el JSON-Server).
  if (isError) {
    return (
      <div>
        El servicio de anécdotas no está disponible debido a problemas en el
        servidor.
      </div>
    )
  }

  // Se retorna los datos de la petición en la variable "data", a la cual se le da un nombre más descriptivo ("anecdotes").
  const anecdotes = data

  const handleVote = (anecdote) => {
    console.log('vote')
    votarMutacion.mutate({
      ...anecdote,
      votes: anecdote.votes + 1,
    })

    // Se muestra la notificación.
    notificacionDispatch({
      type: 'SET',
      payload: `Votaste a '${anecdote.content}'`,
    })
    
    // Se limpia a los 5 segundos.
    setTimeout(() => {
      notificacionDispatch({ type: 'LIMPIAR' })
    }, 5000)
  }

  // Si llega acá es porque "isSuccess === true".
  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App
