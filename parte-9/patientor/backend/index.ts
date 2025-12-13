import express from "express";
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

const PUERTO = 3001;

app.get("/api/ping", (_req, res) => {
  res.send("pong");
});

app.listen(PUERTO, () => {
  console.log(`Servidor corriendo en http://localhost:${PUERTO}`);
});
