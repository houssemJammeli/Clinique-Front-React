import React, { useEffect, useState } from "react";
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
  Paper,
} from "@mui/material";
import { Link } from "react-router-dom";
import { ReceptionnisteDto, ReceptionnisteService } from "./ReceptionnisteService";

const ListeReceptionniste: React.FC = () => {
  const [receptionnistes, setReceptionnistes] = useState<ReceptionnisteDto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await ReceptionnisteService.getAll();
        setReceptionnistes(data);
      } catch (error) {
        console.error("Erreur lors du chargement :", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id: number) => {
    if (window.confirm("Supprimer ce réceptionniste ?")) {
      await ReceptionnisteService.remove(id);
      setReceptionnistes((prev) => prev.filter((x) => x.id !== id));
    }
  };

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
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
            <Typography variant="h4" sx={{ fontWeight: 600, color: "#1976d2" }}>
              Liste des Réceptionnistes
            </Typography>
            <Button
              component={Link}
              to="/admin/ajouter-receptionniste"
              variant="contained"
              color="primary"
            >
              ➕ Ajouter
            </Button>
          </Box>

          {loading ? (
            <Typography align="center" sx={{ mt: 3 }}>
              Chargement...
            </Typography>
          ) : receptionnistes.length === 0 ? (
            <Typography align="center" sx={{ mt: 3, color: "gray" }}>
              Aucun réceptionniste trouvé.
            </Typography>
          ) : (
            <TableContainer component={Paper}>
              <Table>
                <TableHead sx={{ backgroundColor: "#1976d2" }}>
                  <TableRow>
                    <TableCell sx={{ color: "#fff" }}>Nom</TableCell>
                    <TableCell sx={{ color: "#fff" }}>Prénom</TableCell>
                    <TableCell sx={{ color: "#fff" }}>Email</TableCell>
                    <TableCell sx={{ color: "#fff" }}>Salaire</TableCell>
                    <TableCell sx={{ color: "#fff" }}>Clinique</TableCell>
                    <TableCell sx={{ color: "#fff" }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {receptionnistes.map((r) => (
                    <TableRow key={r.id}>
                      <TableCell>{r.nom}</TableCell>
                      <TableCell>{r.prenom}</TableCell>
                      <TableCell>{r.email}</TableCell>
                      <TableCell>{r.salaire} TND</TableCell>
                      <TableCell>{r.cliniqueNom || "Non assignée"}</TableCell>
                      <TableCell>
                        <Button
                          component={Link}
                          to={`/admin/modifier-receptionniste/${r.id}`}
                          variant="contained"
                          color="warning"
                          size="small"
                          sx={{ mr: 1 }}
                        >
                          Modifier
                        </Button>
                        <Button
                          variant="contained"
                          color="error"
                          size="small"
                          onClick={() => handleDelete(r.id)}
                        >
                          Supprimer
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
};

export default ListeReceptionniste;
