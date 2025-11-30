import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  CircularProgress,
  Box,
} from "@mui/material";

interface RendezVous {
  id: number;
  dateHeure: string;
  statut: number;
  medecinNom: string;
  medecinPrenom: string;
}

const statutMap: { [key: number]: string } = {
  0: "En attente",
  1: "Confirmé",
  2: "Annulé",
};

const statutColor: { [key: number]: "warning" | "success" | "error" } = {
  0: "warning",
  1: "success",
  2: "error",
};

export default function ListeRendezVousPatient() {
  const patientId = Number(localStorage.getItem("userId"));
  const [rendezVous, setRendezVous] = useState<RendezVous[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRendezVous();
  }, []);

  const fetchRendezVous = async () => {
    try {
      const response = await axios.get(
        `https://localhost:7012/api/RendezVous/patient/${patientId}`
      );

      const data = response.data?.$values || response.data;
      setRendezVous(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("❌ Erreur API :", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <Box
        sx={{
          minHeight: "60vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
        <Typography sx={{ mt: 2 }}>Chargement des rendez-vous...</Typography>
      </Box>
    );

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #e3f2fd, #bbdefb)",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        p: 4,
      }}
    >
      <Card
        sx={{
          width: "100%",
          maxWidth: 900,
          borderRadius: 3,
          boxShadow: 6,
          p: 2,
          backgroundColor: "#fff",
        }}
      >
        <CardContent>
          <Typography
            variant="h4"
            align="center"
            sx={{ mb: 3, fontWeight: 600, color: "#1976d2" }}
          >
            📅 Mes Rendez-vous
          </Typography>

          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>Date</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Médecin</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Statut</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {rendezVous.length > 0 ? (
                rendezVous.map((rv) => (
                  <TableRow key={rv.id}>
                    <TableCell>
                      {new Date(rv.dateHeure).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      {rv.medecinNom} {rv.medecinPrenom}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={statutMap[rv.statut]}
                        color={statutColor[rv.statut]}
                        variant="filled"
                        sx={{ fontWeight: 600 }}
                      />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} align="center">
                    <Typography variant="body1" color="gray">
                      Aucun rendez-vous trouvé.
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </Box>
  );
}
