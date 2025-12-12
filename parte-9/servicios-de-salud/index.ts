import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";

const app = express();
app.use(express.json());

// "_req": el prefijo "_" indica que la variable no se usa, requerido por "noUnusedParameters" (tsconfig.json).
app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const { altura, peso } = req.query;

  const alturaNumero = Number(altura);
  const pesoNumero = Number(peso);

  if (!altura || !peso || isNaN(alturaNumero) || isNaN(pesoNumero)) {
    return res.status(400).json({ error: "parámetros con formato incorrecto" });
  }

  const imc = calculateBmi(alturaNumero, pesoNumero);

  return res.json({
    peso: pesoNumero,
    altura: alturaNumero,
    imc: imc,
  });
});

app.post("/exercises", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target }: any = req.body;

  // Verificar si faltan parámetros.
  if (daily_exercises === undefined || target === undefined) {
    return res.status(400).json({ error: "parameters missing" });
  }

  // Verificacion de tipos: "daily_exercises" es un array y "target" un número.
  if (!Array.isArray(daily_exercises) || typeof target !== "number") {
    return res.status(400).json({ error: "malformatted parameters" });
  }

  // Se revisa que cada elemento dentro de la lista sea un número válido y no un NaN.
  /* El ".some()" nos dirá "true" si encuentra al menos un elemento que rompa las reglas: 
  1er prueba: typeof valor !== "number": ¿El valor es algo diferente a un número?. 
  2da prueba: Number.isNaN(valor): ¿Es el valor "Nan"?. */
  const valoresInvalidos = daily_exercises.some(
    (valor) => typeof valor !== "number" || Number.isNaN(valor)
  );

  // Si el some encontró valores invalidos salta el error...
  if (valoresInvalidos) {
    return res.status(400).json({ error: "malformatted parameters" });
  }

  try {
    // Si se llega acá es porque los datos son completamente seguros para la función.
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const resultado = calculateExercises(daily_exercises, target);
    return res.json(resultado);
  } catch {
    return res.status(400).json({ error: "something went wrong" });
  }
});

const PUERTO = 3002;

app.listen(PUERTO, () => {
  console.log(`Servidor corriendo en http://localhost:${PUERTO}`);
});
