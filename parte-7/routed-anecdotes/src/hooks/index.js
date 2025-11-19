// Archivo para guardar los hooks personalizados.

import { useState } from "react";

// Hook que simplifica la gestión del estado (value) del formulario y la lógica de un imput (onChange).
export const useField = (type) => {
  // Estado interno del input. Cada campo que use este hook tendrá su propio "value".
  const [value, setValue] = useState("");

  // Función que actualiza el valor cuando el usuario escribe en el input.
  const onChange = (event) => {
    setValue(event.target.value);
  };

  // El hook devuelve un objeto con las props necesarias para un <input>, esto permite conectar el hook directamente al input usando {...hook}.
  return {
    type,  // Tipo del input (text, url, etc.).
    value,  // Valor actual del input.
    onChange, // Función.
  };
};
