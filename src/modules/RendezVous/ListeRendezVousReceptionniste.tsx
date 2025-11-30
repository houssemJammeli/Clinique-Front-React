import React, { useEffect, useState } from "react";
import { RendezVousDto, RendezVousService } from "./RendezVousService";
import { Link } from "react-router-dom";

import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  CircularProgress,
  Paper,
} from "@mui/material";

export default function ListeRendezVousReceptionniste() {
  const [rendezVous, setRendezVous] = useState<RendezVousDto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const data = await RendezVousService.getAll();
        setRendezVous(data);
      } catch (err) {
        console.error("Erreur chargement :", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  const handleDelete = async (id: number) => {
    if (!window.confirm("Supprimer ce rendez-vous ?")) return;
    try {
      await RendezVousService.remove(id);
      setRendezVous((prev) => prev.filter((r) => r.id !== id));
    } catch (err) {
      console.error("Erreur suppression :", err);
    }
  };

  const statutChip = (s?: number | null) => {
    switch (s) {
      case 0:
        return <Chip label="En attente" color="warning" />;
      case 1:
        return <Chip label="Confirmé" color="success" />;
      case 2:
        return <Chip label="Annulé" color="error" />;
      default:
        return <Chip label="Inconnu" />;
    }
  };

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
          width: "95%",
          maxWidth: 1100,
          borderRadius: 3,
          boxShadow: 6,
          p: 2,
          backgroundColor: "#fff",
        }}
      >
        <CardContent>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 3,
            }}
          >
            <Typography variant="h4" sx={{ fontWeight: 600, color: "#1976d2" }}>
              📅 Rendez-vous — Réceptionniste
            </Typography>

            <Button
              variant="contained"
              component={Link}
              to="/receptionniste/ajouter-rendezvous"
              sx={{ borderRadius: 2, textTransform: "none" }}
            >
              ➕ Ajouter Rendez-vous
            </Button>
          </Box>

          {loading ? (
            <Box sx={{ textAlign: "center", py: 4 }}>
              <CircularProgress />
              <Typography sx={{ mt: 2 }}>Chargement...</Typography>
            </Box>
          ) : rendezVous.length === 0 ? (
            <Typography align="center" color="gray" sx={{ py: 4 }}>
              Aucun rendez-vous trouvé.
            </Typography>
          ) : (
            <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
              <Table>
                <TableHead sx={{ backgroundColor: "#1976d2" }}>
                  <TableRow>
                    <TableCell sx={{ color: "white" }}>#</TableCell>
                    <TableCell sx={{ color: "white" }}>Date & heure</TableCell>
                    <TableCell sx={{ color: "white" }}>Patient</TableCell>
                    <TableCell sx={{ color: "white" }}>Médecin</TableCell>
                    <TableCell sx={{ color: "white" }}>Statut</TableCell>
                    <TableCell sx={{ color: "white" }}>Actions</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {rendezVous.map((r, i) => (
                    <TableRow key={r.id}>
                      <TableCell>{i + 1}</TableCell>
                      <TableCell>{new Date(r.dateHeure).toLocaleString()}</TableCell>
                      <TableCell>{r.patientNom ?? "Inconnu"}</TableCell>
                      <TableCell>{r.medecinNom ?? "Non assigné"}</TableCell>
                      <TableCell>{statutChip(r.statut)}</TableCell>

                      <TableCell>
                        <Button
                          variant="contained"
                          color="error"
                          size="small"
                          sx={{ borderRadius: 2, textTransform: "none" }}
                          onClick={() => handleDelete(r.id)}
                        >
                          🗑 Supprimer
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}
