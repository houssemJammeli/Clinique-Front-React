import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Clinique, getCliniques } from "../Clinique/CliniqueService";
import { MedecinDto, MedecinService } from "./MedecinService";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import { toast } from "react-toastify";

const ListeMedecin: React.FC = () => {
  const [medecins, setMedecins] = useState<MedecinDto[]>([]);
  const [cliniques, setCliniques] = useState<Clinique[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const medsData = await MedecinService.getAll();
        const clisData = await getCliniques();

        const medList: MedecinDto[] = Array.isArray(medsData)
          ? medsData
          : (medsData as any)?.$values ?? [];
        const cliList: Clinique[] = Array.isArray(clisData)
          ? clisData
          : (clisData as any)?.$values ?? [];

        setMedecins(medList);
        setCliniques(cliList);
      } catch (err) {
        console.error("Erreur lors du chargement :", err);
        toast.error("Erreur lors du chargement des données");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id: number) => {
    if (window.confirm("Voulez-vous vraiment supprimer ce médecin ?")) {
      try {
        await MedecinService.remove(id);
        setMedecins((prev) => prev.filter((m) => m.id !== id));
        toast.success("Médecin supprimé !");
      } catch (err) {
        console.error(err);
        toast.error("Erreur lors de la suppression !");
      }
    }
  };

  const handleEdit = (id: number) => {
    navigate(`/admin/modifier-medecin/${id}`);
  };

  const handleAdd = () => {
    navigate("/admin/ajouter-medecin");
  };

  if (loading)
    return (
      <Box textAlign="center" mt={5}>
        Chargement...
      </Box>
    );

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #e3f2fd, #bbdefb)",
        p: 3,
      }}
    >
      <Card sx={{ p: 3, maxWidth: "95%", mx: "auto", boxShadow: 6 }}>
        <CardContent>
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{ fontWeight: 600, color: "#1976d2", mb: 3 }}
          >
            👩‍⚕️ Liste des Médecins
          </Typography>

          <Box textAlign="right" mb={2}>
            <Button variant="contained" color="primary" onClick={handleAdd}>
              ➕ Ajouter un médecin
            </Button>
          </Box>

          <TableContainer component={Paper}>
            <Table>
              <TableHead sx={{ backgroundColor: "#1976d2" }}>
                <TableRow>
                  <TableCell sx={{ color: "white" }}>#</TableCell>
                  <TableCell sx={{ color: "white" }}>Nom</TableCell>
                  <TableCell sx={{ color: "white" }}>Prénom</TableCell>
                  <TableCell sx={{ color: "white" }}>Email</TableCell>
                  <TableCell sx={{ color: "white" }}>Spécialité</TableCell>
                  <TableCell sx={{ color: "white" }}>Salaire (DT)</TableCell>
                  <TableCell sx={{ color: "white" }}>Clinique</TableCell>
                  <TableCell sx={{ color: "white" }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {medecins.length > 0 ? (
                  medecins.map((m, index) => (
                    <TableRow key={m.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{m.nom}</TableCell>
                      <TableCell>{m.prenom}</TableCell>
                      <TableCell>{m.email}</TableCell>
                      <TableCell>{m.specialite}</TableCell>
                      <TableCell>{m.salaire}</TableCell>
                      <TableCell>
                        {cliniques.find((c) => c.id === m.cliniqueId)?.nom || (
                          <Typography variant="body2" color="text.secondary">
                            Non affecté
                          </Typography>
                        )}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="outlined"
                          color="warning"
                          size="small"
                          sx={{ mr: 1 }}
                          onClick={() => handleEdit(m.id)}
                        >
                          ✏️ Modifier
                        </Button>
                        <Button
                          variant="outlined"
                          color="error"
                          size="small"
                          onClick={() => handleDelete(m.id)}
                        >
                          🗑️ Supprimer
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} align="center">
                      Aucun médecin trouvé.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ListeMedecin;
