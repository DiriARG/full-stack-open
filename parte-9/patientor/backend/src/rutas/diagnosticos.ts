import express from "express";
import servicioDiagnostico from "../servicios/servicioDiagnostico";

const router = express.Router();

router.get("/", (_req, res) => {
  res.json(servicioDiagnostico.obtenerDiagnosticos());
});

export default router;
