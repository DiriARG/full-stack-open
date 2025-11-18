import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  // Se envuelve toda la app en "BrowserRouter" porque es el componente que habilita el sistema de enrutamiento de React Router (Link, Routes, Route, etc).
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
