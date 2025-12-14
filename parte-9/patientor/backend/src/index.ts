import express from "express";
import cors from "cors";
import rutaDiagnosticos from "./rutas/diagnosticos";
import rutaPacientes from "./rutas/pacientes";

const app = express();

app.use(cors());
app.use(express.json());

const PUERTO = 3001;

app.get("/api/ping", (_req, res) => {
  res.send("pong");
});

app.use("/api/diagnoses", rutaDiagnosticos);

app.use("/api/patients", rutaPacientes);

app.listen(PUERTO, () => {
  console.log(`Servidor corriendo en http://localhost:${PUERTO}`);
});
