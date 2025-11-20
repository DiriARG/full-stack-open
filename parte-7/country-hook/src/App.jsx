import React, { useState, useEffect } from 'react'
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

const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    // Solo se intenta buscar si "name" tiene un valor.
    if (name) {
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`)
        .then(respuesta => {
          // Si la solicitud es exitosa (código 200), se construye el objeto de estado final.
          const dataDelPais = {
            // "found: true" indica éxito. Luego el componente 'Country' usará esta propiedad para mostrar los datos.
            found: true,
            // Se agrupan solo los detalles que queremos ver.
            data: {
              name: respuesta.data.name.common,
              capital: respuesta.data.capital[0],
              population: respuesta.data.population,
              flag: respuesta.data.flags.png
            }
          }
          // Actualiza el estado, lo que dispara un re-renderizado para mostrar los detalles del país.
          setCountry(dataDelPais)
        })
        .catch(error => {
          // Si no se encuentra el país.
          if (error.respuesta && error.respuesta.status === 404) {
            setCountry({ found: false, data: null })
          } else {
            // Manejo de otros errores(red, sv, etc).
            console.error('Error al buscar el país:', error)
            setCountry({ found: false, data: null })
          }
        })
    } else {
      // Se limpia el estado del país si el nombre está vacío.
      setCountry(null)
    }
  }, [name]) // --> Array de dependencias: useEffect se re-ejecuta cuando "name" cambia de valor.

  return country
}

const Country = ({ country }) => {
  if (!country) {
    return null
  }

  if (!country.found) {
    return (
      <div>
        not found...
      </div>
    )
  }

  return (
    <div>
      <h3>{country.data.name} </h3>
      <div>capital {country.data.capital} </div>
      <div>population {country.data.population}</div> 
      <img src={country.data.flag} height='100' alt={`flag of ${country.data.name}`}/>  
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  // "useCountry" reacciona cuando "name" cambia.
  const country = useCountry(name) 

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value) 
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App