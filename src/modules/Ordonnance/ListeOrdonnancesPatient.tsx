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
  CircularProgress,
  Box,
} from "@mui/material";

interface Ordonnance {
  id: number;
  date: string;
  contenu: string;
  medecinNom: string;
}

export default function ListeOrdonnancesPatient() {
  const patientId = Number(localStorage.getItem("userId"));

  const [ordonnances, setOrdonnances] = useState<Ordonnance[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrdonnances();
  }, []);

  const fetchOrdonnances = async () => {
    try {
      const response = await axios.get(
        `https://localhost:7012/api/Ordonnance/patient/${patientId}`
      );

      const data = response.data?.$values;
      setOrdonnances(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("❌ Erreur API :", error);
      setOrdonnances([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <Box
        sx={{
          minHeight: "70vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
        <Typography sx={{ mt: 2 }}>Chargement des ordonnances...</Typography>
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
            💊 Mes Ordonnances
          </Typography>

          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>Date</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Médecin</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Contenu</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {ordonnances.length > 0 ? (
                ordonnances.map((o) => (
                  <TableRow key={o.id}>
                    <TableCell>
                      {new Date(o.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell>{o.medecinNom}</TableCell>
                    <TableCell>{o.contenu}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} align="center">
                    <Typography variant="body1" color="gray">
                      Aucune ordonnance trouvée.
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
