import { configureStore } from "@reduxjs/toolkit";

import anecdotaReducer from "./reducers/anecdoteReducer";
import filtroReducer from "./reducers/filtroReducer";
import notificacionReducer from "./reducers/notificacionReducer";

const store = configureStore({
  reducer: {
    anecdotas: anecdotaReducer,
    filtro: filtroReducer,
    notificacion: notificacionReducer, // --> "notificacionReducer" es export default notificacionSlice.reducer.
  },
});

export default store;
