import { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { Button, Divider, Container, Typography } from "@mui/material";

import { apiBaseUrl } from "./constants";
import { Diagnosis, Patient } from "./types";

import patientService from "./services/patients";
import PatientListPage from "./components/PatientListPage";
import PaginaDelPaciente from "./components/PaginaDelPaciente/index";
import servicioDeDiagnosticos from "./services/diagnosticos";

const App = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [diagnosticos, setDiagnosticos] = useState<Diagnosis[]>([]);

  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      const patients = await patientService.getAll();
      setPatients(patients);
    };

    // Se realiza acá porque justamente los diagnósticos son datos globales y se usan en más de un componente.
    const obtenerDiagnosticos = async () => {
      const diagnosticos = await servicioDeDiagnosticos.obtenerTodos();
      setDiagnosticos(diagnosticos);
    };

    void fetchPatientList();
    // Se ejecuta la función; se antepone "void" para indicar que se descarta el valor devuelto (la promesa) y no se usará en este contexto.
    void obtenerDiagnosticos();
  }, []);

  return (
    <div className="App">
      <Router>
        <Container>
          <Typography variant="h3" style={{ marginBottom: "0.5em" }}>
            Patientor
          </Typography>
          <Button component={Link} to="/" variant="contained" color="primary">
            Home
          </Button>
          <Divider hidden />
          <Routes>
            <Route
              path="/"
              element={
                <PatientListPage
                  patients={patients}
                  setPatients={setPatients}
                />
              }
            />
            <Route
              path="/patients/:id"
              element={<PaginaDelPaciente diagnosticos={diagnosticos} />}
            />
          </Routes>
        </Container>
      </Router>
    </div>
  );
};

export default App;
