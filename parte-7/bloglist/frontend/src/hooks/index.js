// Archivo para guardar los hooks personalizados.

import { useContext } from 'react'
import NotificacionContext from '../NotificacionContext'
import UsuarioContext from '../UsuarioContext'

/*
  Hooks personalizados para simplificar y optimizar el consumo del NotificacionContext.

  Al separar la lógica de obtención en hooks específicos, se logra:
  1. Mejor legibilidad: Se evita la desestructuración manual del array retornado por `useContext`.
  2. Mejor rendimiento: Los componentes solo se suscriben al valor que necesitan (estado o dispatch).

  SINTAXIS ANTES vs. AHORA:

  * Para obtener solo el mensaje de notificación (Estado):
  // Antes: const [notificacion] = useContext(NotificacionContext)
  // Ahora: const mensaje = useNotificacion()

  * Para obtener solo la función de dispatch (Acciones):
  // Antes: const [_, notificacionDispatch] = useContext(NotificacionContext)
  // Ahora: const dispatch = useNotificacionDispatch()
*/

export const useNotificacion = () => {
  const [notificacion] = useContext(NotificacionContext)
  return notificacion
}

export const useNotificacionDispatch = () => {
  const [, notificacionDispatch] = useContext(NotificacionContext)
  return notificacionDispatch
}

// Hook que devuelve solo el usuario logueado.
export const useUsuario = () => {
  const [usuario] = useContext(UsuarioContext)
  return usuario
}

// Hook que devuelve solo el dispatch de acciones (cambiar de usuario y salir).
export const useUsuarioDispatch = () => {
  const [, usuarioDispatch] = useContext(UsuarioContext)
  return usuarioDispatch
}
