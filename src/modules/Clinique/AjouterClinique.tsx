import React, { useState } from "react";
import { createClinique } from "./CliniqueService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
} from "@mui/material";

export default function AjouterClinique() {
  const [nom, setNom] = useState("");
  const [adresse, setAdresse] = useState("");
  const [telephone, setTelephone] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const adminId = parseInt(localStorage.getItem("userId") || "0");
      if (!adminId) {
        toast.error("Admin non connecté !");
        setLoading(false);
        return;
      }

      await createClinique({ nom, adresse, telephone, adminId });
      toast.success("Clinique ajoutée avec succès !");
      navigate("/cliniques");
    } catch (err) {
      console.error(err);
      toast.error("Erreur lors de l’ajout !");
    } finally {
      setLoading(false);
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
      <Card sx={{ width: 400, borderRadius: 3, boxShadow: 6, p: 3, backgroundColor: "#fff" }}>
        <CardContent>
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{ fontWeight: 600, color: "#1976d2" }}
          >
            ➕ Ajouter une Clinique
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              label="Nom"
              fullWidth
              margin="normal"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              required
            />
            <TextField
              label="Adresse"
              fullWidth
              margin="normal"
              value={adresse}
              onChange={(e) => setAdresse(e.target.value)}
              required
            />
            <TextField
              label="Téléphone"
              fullWidth
              margin="normal"
              value={telephone}
              onChange={(e) => setTelephone(e.target.value)}
              required
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{
                mt: 3,
                py: 1.2,
                fontSize: "1rem",
                borderRadius: "12px",
                textTransform: "none",
              }}
              disabled={loading}
            >
              {loading ? "Enregistrement..." : "Enregistrer"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}
