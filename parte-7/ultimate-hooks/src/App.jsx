import { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

/* "useResource" es un hook personalizado para encapsular toda la lógica necesaria para manejar un recurso REST (como /notes o /persons) sin repetir código. 
Es totalmente reutilizable gracias a baseUrl.
*/
const useResource = (baseUrl) => {
  // Cada llamada a useResource tiene su propio estado, osea, uno para notes y otro para persons.
  const [resources, setResources] = useState([])

  // Se cargan todos los recursos. 
  useEffect(() => {
    axios.get(baseUrl).then(respuesta => {
      setResources(respuesta.data)
    })
  }, [baseUrl]) // Asegura que useEffect se re-ejecute si la URL de la API cambia.

  const create = async (resource) => {
    // Envía el recurso al backend.
    const respuesta = await axios.post(baseUrl, resource)
    // Se concatena el recurso nuevo al estado existente.
    setResources(resources.concat(respuesta.data))
  }

  const service = {
    create
  }

  /* resources: array con los elementos del recurso.
  service: objeto con funciones, en este caso, create(). */
  return [
    resources, service
  ]
}

const App = () => {
  const content = useField('text')
  const name = useField('text')
  const number = useField('text')

  /*
    Llamar useResource 2 veces crea 2 "instancias" del hook:

    1) Una para notes:
       - resources = lista de notas
       - service = { create() }

    2) Otra para persons:
       - resources = lista de personas
       - service = { create() }

    Cada instancia es independiente y tiene su propio estado.
  */
  const [notes, noteService] = useResource('http://localhost:3005/notes')
  const [persons, personService] = useResource('http://localhost:3005/persons')

  const handleNoteSubmit = (event) => {
    event.preventDefault()
    noteService.create({ content: content.value })
  }
 
  const handlePersonSubmit = (event) => {
    event.preventDefault()
    personService.create({ name: name.value, number: number.value})
  }

  return (
    <div>
      <h2>notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input {...content} />
        <button>create</button>
      </form>
      {notes.map(n => <p key={n.id}>{n.content}</p>)}

      <h2>persons</h2>
      <form onSubmit={handlePersonSubmit}>
        name <input {...name} /> <br/>
        number <input {...number} />
        <button>create</button>
      </form>
      {persons.map(n => <p key={n.id}>{n.name} {n.number}</p>)}
    </div>
  )
}

export default App