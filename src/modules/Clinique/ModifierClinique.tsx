import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCliniques, updateClinique } from "./CliniqueService";
import { toast } from "react-toastify";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
} from "@mui/material";

export default function ModifierClinique() {
  const { id } = useParams<{ id: string }>();
  const [nom, setNom] = useState("");
  const [adresse, setAdresse] = useState("");
  const [telephone, setTelephone] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loadClinique = async () => {
      try {
        const data = await getCliniques();
        const list = Array.isArray(data) ? data : data.$values || [];
        const clinique = list.find((c: any) => c.id === Number(id));
        if (clinique) {
          setNom(clinique.nom);
          setAdresse(clinique.adresse);
          setTelephone(clinique.telephone);
        }
      } catch (err) {
        console.error(err);
      }
    };
    loadClinique();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const adminId = parseInt(localStorage.getItem("userId") || "0");
      await updateClinique(Number(id), { nom, adresse, telephone, adminId });
      toast.success("Clinique mise à jour !");
      navigate("/cliniques");
    } catch (err) {
      toast.error("Erreur lors de la mise à jour !");
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
            ✏️ Modifier la Clinique
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
              {loading ? "Enregistrement..." : "Enregistrer les modifications"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}
