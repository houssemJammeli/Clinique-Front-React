import React, { useEffect, useState } from "react";
import { ConsultationService, ConsultationDto } from "./ConsultationService";
import { Button, Card, CardContent, Typography, Box, TextField } from "@mui/material";
import { toast } from "react-toastify";

const ListeConsultationsMedecin: React.FC = () => {
  const [consultations, setConsultations] = useState<ConsultationDto[]>([]);
  const [selectedConsultation, setSelectedConsultation] = useState<ConsultationDto | null>(null);
  const [openModal, setOpenModal] = useState<"rapport" | "ordonnance" | "facture" | null>(null);
  const [rapport, setRapport] = useState("");
  const [ordonnanceContenu, setOrdonnanceContenu] = useState("");
  const [montantFacture, setMontantFacture] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await ConsultationService.getAll();
        setConsultations(data);
      } catch {
        toast.error("Erreur lors du chargement des consultations.");
      }
    };
    fetchData();
  }, []);

  const handleSaveRapport = async () => {
    if (!selectedConsultation) return;
    try {
      await ConsultationService.updateRapport(selectedConsultation.id, rapport);
      toast.success("Rapport mis à jour !");
      setOpenModal(null);
    } catch {
      toast.error("Erreur lors de la mise à jour du rapport.");
    }
  };

  const handleSaveOrdonnance = async () => {
    if (!selectedConsultation) return;
    try {
      await ConsultationService.createOrdonnance(selectedConsultation.id, { contenu: ordonnanceContenu });
      toast.success("Ordonnance créée !");
      setOpenModal(null);
    } catch {
      toast.error("Erreur lors de la création de l’ordonnance.");
    }
  };

  const handleSaveFacture = async () => {
    if (!selectedConsultation) return;
    try {
      await ConsultationService.createFacture(selectedConsultation.id, { montant: montantFacture });
      toast.success("Facture créée !");
      setOpenModal(null);
    } catch {
      toast.error("Erreur lors de la création de la facture.");
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
      <Card sx={{ width: "90%", maxWidth: 900, borderRadius: 3, boxShadow: 6, p: 3, backgroundColor: "#fff" }}>
        <CardContent>
          <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 600, color: "#1976d2" }}>
            📋 Mes Consultations
          </Typography>

          {consultations.length === 0 ? (
            <Typography align="center" color="textSecondary" sx={{ mt: 3 }}>
              Aucun rendez-vous trouvé
            </Typography>
          ) : (
            consultations.map((c) => (
              <Card key={c.id} sx={{ mb: 2, p: 2, backgroundColor: "#f5f5f5" }}>
                <Typography>ID: {c.id}</Typography>
                <Typography>Rendez-vous: {c.rendezVousId}</Typography>
                <Typography>Rapport: {c.rapport || <i>Non rédigé</i>}</Typography>
                <Box sx={{ mt: 1 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    sx={{ mr: 1 }}
                    onClick={() => {
                      setSelectedConsultation(c);
                      setRapport(c.rapport || "");
                      setOpenModal("rapport");
                    }}
                  >
                    ✍️ Rapport
                  </Button>
                  <Button
                    variant="contained"
                    color="success"
                    size="small"
                    sx={{ mr: 1 }}
                    onClick={() => {
                      setSelectedConsultation(c);
                      setOrdonnanceContenu("");
                      setOpenModal("ordonnance");
                    }}
                  >
                    💊 Ordonnance
                  </Button>
                  <Button
                    variant="contained"
                    color="warning"
                    size="small"
                    onClick={() => {
                      setSelectedConsultation(c);
                      setMontantFacture(0);
                      setOpenModal("facture");
                    }}
                  >
                    💰 Facture
                  </Button>
                </Box>
              </Card>
            ))
          )}

          {/* ---------- MODALS ---------- */}
          {openModal === "rapport" && selectedConsultation && (
            <Card sx={{ mt: 3, p: 2 }}>
              <Typography variant="h6">Éditer le rapport</Typography>
              <TextField
                fullWidth
                multiline
                rows={5}
                value={rapport}
                onChange={(e) => setRapport(e.target.value)}
                sx={{ my: 2 }}
              />
              <Box sx={{ textAlign: "right" }}>
                <Button variant="outlined" sx={{ mr: 1 }} onClick={() => setOpenModal(null)}>
                  Fermer
                </Button>
                <Button variant="contained" color="primary" onClick={handleSaveRapport}>
                  Enregistrer
                </Button>
              </Box>
            </Card>
          )}

          {openModal === "ordonnance" && selectedConsultation && (
            <Card sx={{ mt: 3, p: 2 }}>
              <Typography variant="h6">Nouvelle Ordonnance</Typography>
              <TextField
                fullWidth
                multiline
                rows={5}
                value={ordonnanceContenu}
                onChange={(e) => setOrdonnanceContenu(e.target.value)}
                sx={{ my: 2 }}
              />
              <Box sx={{ textAlign: "right" }}>
                <Button variant="outlined" sx={{ mr: 1 }} onClick={() => setOpenModal(null)}>
                  Fermer
                </Button>
                <Button variant="contained" color="success" onClick={handleSaveOrdonnance}>
                  Créer
                </Button>
              </Box>
            </Card>
          )}

          {openModal === "facture" && selectedConsultation && (
            <Card sx={{ mt: 3, p: 2 }}>
              <Typography variant="h6">Créer une Facture</Typography>
              <TextField
                fullWidth
                type="number"
                value={montantFacture}
                onChange={(e) => setMontantFacture(parseFloat(e.target.value))}
                sx={{ my: 2 }}
              />
              <Box sx={{ textAlign: "right" }}>
                <Button variant="outlined" sx={{ mr: 1 }} onClick={() => setOpenModal(null)}>
                  Fermer
                </Button>
                <Button variant="contained" color="warning" onClick={handleSaveFacture}>
                  Créer
                </Button>
              </Box>
            </Card>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default ListeConsultationsMedecin;
