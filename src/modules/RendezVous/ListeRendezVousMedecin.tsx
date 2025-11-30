import React, { useEffect, useState } from "react";
import { RendezVousDto, RendezVousService } from "./RendezVousService";
import { Box, Card, CardContent, Typography, MenuItem, Select, FormControl, InputLabel } from "@mui/material";

const ListeRendezVousMedecin: React.FC = () => {
  const [rendezVous, setRendezVous] = useState<RendezVousDto[]>([]);
  const [loading, setLoading] = useState(true);

  const medecinIdStr = localStorage.getItem("userId");
  const medecinId = medecinIdStr ? Number(medecinIdStr) : null;

  useEffect(() => {
    const fetchForMedecin = async () => {
      try {
        const all = await RendezVousService.getAll();
        const mine = all.filter((r) => r.medecinId === medecinId);
        setRendezVous(mine);
      } catch (err) {
        console.error("Erreur lors du chargement des rendez-vous :", err);
      } finally {
        setLoading(false);
      }
    };

    if (medecinId != null) fetchForMedecin();
    else setLoading(false);
  }, [medecinId]);

  const statutLabel = (s?: number | null) => {
    switch (s) {
      case 0: return "En attente";
      case 1: return "Confirmé";
      case 2: return "Annulé";
      default: return "Inconnu";
    }
  };

  const handleStatutChange = async (id: number, newStatut: number) => {
    try {
      await RendezVousService.updateStatut(id, newStatut);
      setRendezVous(prev => prev.map(r => r.id === id ? { ...r, statut: newStatut } : r));
    } catch (err) {
      console.error("Erreur lors de la mise à jour du statut :", err);
    }
  };

  if (loading) return <p className="text-center mt-4">Chargement...</p>;
  if (medecinId == null) return <p className="text-center text-danger">Médecin non identifié.</p>;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #e3f2fd, #bbdefb)",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        p: 2,
      }}
    >
      <Card sx={{ width: "100%", maxWidth: 900, mt: 5, borderRadius: 3, boxShadow: 6 }}>
        <CardContent>
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{ fontWeight: 600, color: "#1976d2" }}
          >
            🩺 Mes Rendez-vous
          </Typography>

          {rendezVous.length === 0 ? (
            <Typography align="center" color="textSecondary">
              Aucun rendez-vous trouvé pour vous.
            </Typography>
          ) : (
            <Box sx={{ overflowX: "auto" }}>
              <table className="table table-striped table-hover align-middle">
                <thead className="table-success">
                  <tr>
                    <th>#</th>
                    <th>Date & heure</th>
                    <th>Patient</th>
                    <th>Statut</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {rendezVous.map((r, i) => (
                    <tr key={r.id}>
                      <td>{i + 1}</td>
                      <td>{new Date(r.dateHeure).toLocaleString()}</td>
                      <td>{r.patientNom ?? "Inconnu"}</td>
                      <td>{statutLabel(r.statut)}</td>
                      <td>
                        <FormControl size="small" sx={{ minWidth: 140 }}>
                          <Select
                            value={r.statut ?? 0}
                            onChange={(e) => handleStatutChange(r.id, Number(e.target.value))}
                          >
                            <MenuItem value={0}>En attente</MenuItem>
                            <MenuItem value={1}>Confirmé</MenuItem>
                            <MenuItem value={2}>Annulé</MenuItem>
                          </Select>
                        </FormControl>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default ListeRendezVousMedecin;
