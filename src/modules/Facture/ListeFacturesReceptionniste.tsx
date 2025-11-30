import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Chip,
  CircularProgress,
  Typography,
  Box,
} from "@mui/material";
import { toast } from "react-toastify";

interface Facture {
  id: number;
  montant: number;
  statutPaiement: string | number;
  patientNom: string;
  patientPrenom: string;
  medecinNom: string;
  medecinPrenom: string;
  dateConsultation: string;
  paiementDate?: string | null;
}

const ListeFacturesReceptionniste: React.FC = () => {
  const [factures, setFactures] = useState<Facture[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState<number | null>(null);

  useEffect(() => {
    fetchFactures();
  }, []);

  // 🔄 Charger les factures
  const fetchFactures = async () => {
    try {
      const response = await axios.get("https://localhost:7012/api/Facture");
      const data = response.data.$values ?? response.data;
      setFactures(data);
    } catch (error) {
      console.error("Erreur lors du chargement :", error);
      toast.error("Erreur lors du chargement des factures");
    } finally {
      setLoading(false);
    }
  };

  // 💰 Valider Paiement
  const handleValiderPaiement = async (factureId: number, montant: number) => {
    const confirm = window.confirm("Confirmer le paiement ?");
    if (!confirm) return;

    setProcessingId(factureId);

    try {
      await axios.post(
        `https://localhost:7012/api/Paiement/${factureId}`,
        { montant },
        { headers: { "Content-Type": "application/json" } }
      );

      toast.success("💰 Paiement validé !");
      fetchFactures();
    } catch (error) {
      console.error(error);
      toast.error("Erreur lors de la validation");
    } finally {
      setProcessingId(null);
    }
  };

  if (loading)
    return (
      <Box
        minHeight="50vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <CircularProgress />
        <Typography mt={2}>Chargement des factures…</Typography>
      </Box>
    );

  return (
    <Box p={4}>
      <Typography
        variant="h4"
        align="center"
        fontWeight={600}
        color="primary"
        mb={4}
      >
        🧾 Liste des Factures
      </Typography>

      <TableContainer component={Paper} elevation={4} sx={{ borderRadius: 3 }}>
        <Table>
          <TableHead sx={{ backgroundColor: "#1976d2" }}>
            <TableRow>
              <TableCell sx={{ color: "#fff", fontWeight: 600 }}>Patient</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: 600 }}>Médecin</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: 600 }}>Consultation</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: 600 }}>Montant</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: 600 }}>Statut</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: 600 }}>Paiement</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: 600 }}>Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {factures.map((facture) => {
              const isPaid =
                facture.statutPaiement === 1 ||
                facture.statutPaiement === "Payé" ||
                facture.statutPaiement === "Payee";

              return (
                <TableRow key={facture.id}>
                  <TableCell>
                    {facture.patientNom} {facture.patientPrenom}
                  </TableCell>

                  <TableCell>
                    {facture.medecinNom} {facture.medecinPrenom}
                  </TableCell>

                  <TableCell>
                    {new Date(facture.dateConsultation).toLocaleString()}
                  </TableCell>

                  <TableCell>{facture.montant.toFixed(2)} DT</TableCell>

                  <TableCell>
                    <Chip
                      label={isPaid ? "Payé" : "Non payé"}
                      color={isPaid ? "success" : "warning"}
                      variant="filled"
                    />
                  </TableCell>

                  <TableCell>
                    {facture.paiementDate
                      ? new Date(facture.paiementDate).toLocaleString()
                      : "—"}
                  </TableCell>

                  <TableCell>
                    {!isPaid ? (
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        disabled={processingId === facture.id}
                        onClick={() =>
                          handleValiderPaiement(facture.id, facture.montant)
                        }
                      >
                        {processingId === facture.id
                          ? "Validation..."
                          : "Valider"}
                      </Button>
                    ) : (
                      <Chip label="Déjà payé" color="default" />
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ListeFacturesReceptionniste;
