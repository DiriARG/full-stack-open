import { createSlice } from '@reduxjs/toolkit'

/* El estado inicial del filtro es un string vacío, esto significa que al inicio, no se aplica ningún filtro y se muestran todas las anécdotas. 
La propiedad debe llamarse "initialState" NO "estadoInicial" porque Redux Toolkit no la reconoce y devuelve "undefined" --> en "notificacionReducer" se muestra como hacerlo. */
const initialState = ""

/* Creación del slice para el filtro. 
Un "slice" combina el reducer y sus actions creators en una sola definición. */
const filtroSlice = createSlice({
  name: "filtro",
  initialState,
  reducers: {
    // Reducer que actualiza el texto del filtro según lo que el usuario escribe.
    setFiltro(state, action) {
      // "action.payload" contiene el texto ingresado en el campo del filtro. Se retorna ese texto, reemplazando el valor anterior del estado.
      return action.payload
    }
  }
})

// Exportación del action creator.
export const { setFiltro } = filtroSlice.actions;

// Exportación del reducer.
export default filtroSlice.reducer;

