import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  MenuItem,
  Alert,
  CircularProgress,
} from "@mui/material";

import { RendezVousService } from "./RendezVousService";
import { MedecinService } from "../Medecin/MedecinService";
import { PatientService } from "../Patient/PatientService";

export default function AjouterRendezVous() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    date: "",
    heure: "",
    patientId: "",
    medecinId: "",
  });

  const [medecins, setMedecins] = useState<any[]>([]);
  const [patients, setPatients] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadData, setLoadData] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Charger patients + médecins
  useEffect(() => {
    const fetchData = async () => {
      try {
        const medData = await MedecinService.getAll();
        const patData = await PatientService.getAll();
        setMedecins(medData);
        setPatients(patData);
      } catch {
        setError("Erreur lors du chargement des données.");
      } finally {
        setLoadData(false);
      }
    };
    fetchData();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const dateHeure = new Date(`${formData.date}T${formData.heure}`).toISOString();
      const receptionnisteId = Number(localStorage.getItem("userId"));

      await RendezVousService.create({
        dateHeure,
        patientId: Number(formData.patientId),
        medecinId: Number(formData.medecinId),
        receptionnisteId,
        statut: 0,
      });

      navigate("/receptionniste/rendezvous");
    } catch (err) {
      setError("Erreur lors de l’ajout du rendez-vous.");
    } finally {
      setLoading(false);
    }
  };

  if (loadData) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #e3f2fd, #bbdefb)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 2,
      }}
    >
      <Card
        sx={{
          width: 450,
          borderRadius: 3,
          boxShadow: 6,
          p: 3,
          backgroundColor: "#fff",
        }}
      >
        <CardContent>
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{ fontWeight: 600, color: "#1976d2" }}
          >
            Ajouter un Rendez-vous
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <TextField
              label="Date"
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
              required
            />

            <TextField
              label="Heure"
              type="time"
              name="heure"
              value={formData.heure}
              onChange={handleChange}
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
              required
            />

            <TextField
              select
              label="Patient"
              name="patientId"
              value={formData.patientId}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            >
              {patients.map((p) => (
                <MenuItem key={p.id} value={p.id}>
                  {p.nom} {p.prenom}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              select
              label="Médecin"
              name="medecinId"
              value={formData.medecinId}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            >
              {medecins.map((m) => (
                <MenuItem key={m.id} value={m.id}>
                  Dr. {m.nom} {m.prenom}
                </MenuItem>
              ))}
            </TextField>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{
                mt: 3,
                py: 1.2,
                fontSize: "1rem",
                borderRadius: "12px",
                textTransform: "none",
              }}
              disabled={loading}
            >
              {loading ? "Ajout en cours..." : "Ajouter"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}
