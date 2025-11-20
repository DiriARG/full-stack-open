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

  const reset = () => {
    setValue("");
  };

  /* El hook devuelve un objeto, donde "propsDelInput" contiene las props necesarias para un <input>. Esto permite conectar el hook al input usando {...propsDelInput}. 
  Se devuelve "reset" separado de las props del input para evitar un warning de React, ya que el elemento <input> no reconoce "reset" como un atributo DOM válido al usar el spread operator. */
  return {
    propsDelInput: {
      type, // Tipo del input (text, url, etc.).
      value, // Valor actual del input.
      onChange, // Función.
    },
    reset,
  };
};
