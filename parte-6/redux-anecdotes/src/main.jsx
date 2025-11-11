import ReactDOM from "react-dom/client";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";

import App from "./App";
import anecdotaReducer from "./reducers/anecdoteReducer";
import filtroReducer from "./reducers/filtroReducer";

// Se combinan los reducers.
const reducer = combineReducers({
  anecdotas: anecdotaReducer,
  filtro: filtroReducer,
});

// El store se crea con el reducer combinado.
const store = createStore(reducer);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
