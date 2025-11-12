import { configureStore } from "@reduxjs/toolkit";

import anecdotaReducer from "./reducers/anecdoteReducer";
import filtroReducer from "./reducers/filtroReducer";

const store = configureStore({
  reducer: {
    anecdotas: anecdotaReducer,
    filtro: filtroReducer,
  },
});

export default store;
