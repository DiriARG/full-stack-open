// El estado inicial del filtro es un string vacío, esto significa que al inicio, no se aplica ningún filtro y se muestran todas las anécdotas.
const filtroReducer = (state = '', action) => {
  switch (action.type) {
    case 'ESTABLECER_FILTRO':  
    // Cuando se ejecuta esta acción, el nuevo valor del filtro se encuentra en "action.payload", entonces, el estado del filtro se reemplaza por ese valor.
    return action.payload
    default:
      return state
  }
}

export const setFiltro = (filter) => {
  return {
    type: 'ESTABLECER_FILTRO',
    payload: filter
  }
}

export default filtroReducer
