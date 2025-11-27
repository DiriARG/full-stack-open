import { createSlice } from '@reduxjs/toolkit'
import servicioDeBlogs from '../services/blogs'

const initialState = []

const blogSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    agregarBlog(state, action) {
      // Mutación segura gracias a "Immer" que viene integrado a Redux Toolkit, esta forma nos simplifica la inmutabilidad (fijarse parte-6/redux-anecdotes/src/reducers/anecdoteReducer.js para ver sin Immer).
      state.push(action.payload)
    },
  },
})

export const { setBlogs, agregarBlog } = blogSlice.actions

export const inializarBlogs = () => {
  return async (dispatch) => {
    const blogs = await servicioDeBlogs.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const crearNuevoBlog = (contenido) => {
  return async (dispatch) => {
    const nuevoBlog = await servicioDeBlogs.crear(contenido)
    dispatch(agregarBlog(nuevoBlog))
  }
}

export default blogSlice.reducer
