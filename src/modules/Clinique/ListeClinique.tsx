import React, { useEffect, useState } from "react";
import { Clinique, getCliniques, deleteClinique } from "./CliniqueService";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Stack,
} from "@mui/material";

export default function ListeClinique() {
  const [cliniques, setCliniques] = useState<Clinique[]>([]);
  const navigate = useNavigate();

  const loadData = async () => {
    try {
      const data = await getCliniques();
      const list = Array.isArray(data) ? data : data.$values || [];
      setCliniques(list);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Supprimer cette clinique ?")) return;
    await deleteClinique(id);
    loadData();
  };

  useEffect(() => {
    loadData();
  }, []);

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
          <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 600, color: "#1976d2" }}>
            🏥 Liste des Cliniques
          </Typography>

          <Table>
            <TableHead sx={{ backgroundColor: "#1976d2" }}>
              <TableRow>
                <TableCell sx={{ color: "white" }}>#</TableCell>
                <TableCell sx={{ color: "white" }}>Nom</TableCell>
                <TableCell sx={{ color: "white" }}>Adresse</TableCell>
                <TableCell sx={{ color: "white" }}>Téléphone</TableCell>
                <TableCell sx={{ color: "white" }}>Admin</TableCell>
                <TableCell sx={{ color: "white" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cliniques.map((c) => (
                <TableRow key={c.id}>
                  <TableCell>{c.id}</TableCell>
                  <TableCell>{c.nom}</TableCell>
                  <TableCell>{c.adresse}</TableCell>
                  <TableCell>{c.telephone}</TableCell>
                  <TableCell>{c.adminNom}</TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1}>
                      <Button
                        variant="contained"
                        color="error"
                        size="small"
                        onClick={() => handleDelete(c.id)}
                      >
                        🗑️ Supprimer
                      </Button>
                      <Button
                        variant="contained"
                        color="warning"
                        size="small"
                        onClick={() => navigate(`/admin/modifier-clinique/${c.id}`)}
                      >
                        ✏️ Modifier
                      </Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
            <Button
              variant="contained"
              color="success"
              onClick={() => navigate("/admin/ajouter-clinique")}
            >
              ➕ Ajouter une Clinique
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
