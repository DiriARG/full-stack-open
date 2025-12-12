import express from "express";
import { calculateBmi } from "./bmiCalculator";

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

const PUERTO = 3003;

app.listen(PUERTO, () => {
  console.log(`Servidor corriendo en http://localhost:${PUERTO}`);
});
