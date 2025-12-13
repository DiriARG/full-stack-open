import express from 'express';
const app = express();
app.use(express.json());

const PUERTO = 3000;

app.get('/ping', (_req, res) => {
  res.send('pong');
});

app.listen(PUERTO, () => {
  console.log(`Servidor corriendo en http://localhost:${PUERTO}`);
});