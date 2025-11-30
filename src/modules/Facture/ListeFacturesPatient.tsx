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

interface Facture {
  id: number;
  montant: number;
  statutPaiement: number;
  medecinNom: string;
  dateConsultation: string;
  paiementDate?: string | null;
}

const statutPMap: { [key: number]: string } = {
  0: "Non payé",
  1: "Payé",
};

const statutColor: { [key: number]: "error" | "success" } = {
  0: "error",
  1: "success",
};

export default function ListeFacturesPatient() {
  const patientId = Number(localStorage.getItem("userId"));
  const [factures, setFactures] = useState<Facture[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFactures();
  }, []);

  const fetchFactures = async () => {
    try {
      const response = await axios.get(
        `https://localhost:7012/api/Facture/patient/${patientId}`
      );

      const data = response.data?.$values || response.data;
      setFactures(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("❌ Erreur API :", error);
      setFactures([]);
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
        <Typography sx={{ mt: 2 }}>Chargement des factures...</Typography>
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
            🧾 Mes Factures
          </Typography>

          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>Date Consultation</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Médecin</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Montant</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Statut</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Date Paiement</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {factures.length > 0 ? (
                factures.map((f) => (
                  <TableRow key={f.id}>
                    <TableCell>
                      {new Date(f.dateConsultation).toLocaleString()}
                    </TableCell>

                    <TableCell>{f.medecinNom}</TableCell>

                    <TableCell>{f.montant.toFixed(2)} TND</TableCell>

                    <TableCell>
                      <Chip
                        label={statutPMap[f.statutPaiement]}
                        color={statutColor[f.statutPaiement]}
                        variant="filled"
                        sx={{ fontWeight: 600 }}
                      />
                    </TableCell>

                    <TableCell>
                      {f.paiementDate
                        ? new Date(f.paiementDate).toLocaleString()
                        : "-"}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    <Typography variant="body1" color="gray">
                      Aucune facture trouvée.
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
