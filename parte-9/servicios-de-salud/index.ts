import express from 'express';
const app = express();

// "_req": el prefijo "_" indica que la variable no se usa, requerido por "noUnusedParameters" (tsconfig.json).
app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

const PUERTO = 3003;

app.listen(PUERTO, () => {
  console.log(`Servidor corriendo en http://localhost:${PUERTO}`);
});