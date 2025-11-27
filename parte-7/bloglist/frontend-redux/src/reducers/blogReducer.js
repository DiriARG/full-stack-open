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
    actualizarBlog(state, action) {
      const blogActualizado = action.payload
      return state.map((blog) =>
        blog.id === blogActualizado.id ? blogActualizado : blog,
      )
    },
    removerBlog(state, action) {
      const id = action.payload
      // Se devuelve un nuevo array que contiene todos los blogs cuyo id no es igual al id que se quiere remover.
      return state.filter((blog) => blog.id !== id)
    },
  },
})

export const { setBlogs, agregarBlog, actualizarBlog, removerBlog } =
  blogSlice.actions

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

export const darLikeBlog = (id) => {
  return async (dispatch, getState) => {
    const estadoActual = getState().blogs
    const blogEncontrado = estadoActual.find((blog) => blog.id === id)

    const blogActualizado = {
      ...blogEncontrado,
      likes: blogEncontrado.likes + 1,
      user: blogEncontrado.user.id,
    }

    const blogRespuesta = await servicioDeBlogs.actualizar(id, blogActualizado)
    dispatch(actualizarBlog(blogRespuesta))
  }
}

export const eliminarBlog = (id) => {
  return async (dispatch) => {
    await servicioDeBlogs.eliminar(id)
    dispatch(removerBlog(id))
  }
}
export default blogSlice.reducer
