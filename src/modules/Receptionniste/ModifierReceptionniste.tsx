import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
  ReceptionnisteCreateDto,
  ReceptionnisteService,
} from "./ReceptionnisteService";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  MenuItem,
} from "@mui/material";

interface Clinique {
  id: number;
  nom: string;
}

const ModifierReceptionniste: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [cliniques, setCliniques] = useState<Clinique[]>([]);
  const [formData, setFormData] = useState<ReceptionnisteCreateDto>({
    nom: "",
    prenom: "",
    email: "",
    password: "",
    salaire: 0,
    cliniqueId: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const receptionniste = await ReceptionnisteService.getById(Number(id));
        setFormData({
          nom: receptionniste.nom,
          prenom: receptionniste.prenom,
          email: receptionniste.email,
          password: "",
          salaire: receptionniste.salaire,
          cliniqueId: receptionniste.cliniqueId || null,
        });

        const res = await axios.get("https://localhost:7012/api/Clinique");
        const cliList: Clinique[] = Array.isArray(res.data)
          ? res.data
          : res.data.$values ?? [];
        setCliniques(cliList);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | { name?: string; value: unknown }
    >
  ) => {
    const name = e.target.name as string;
    const value =
      name === "salaire" ? Number(e.target.value) : e.target.value;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await ReceptionnisteService.update(Number(id), formData);
      navigate("/admin/liste-receptionniste");
    } catch (err) {
      console.error("Erreur lors de la modification :", err);
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
      <Card sx={{ width: "100%", maxWidth: 500, mt: 5, borderRadius: 3, boxShadow: 6 }}>
        <CardContent>
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{ fontWeight: 600, color: "#1976d2" }}
          >
            ✏️ Modifier un Réceptionniste
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              label="Nom"
              name="nom"
              value={formData.nom}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Prénom"
              name="prenom"
              value={formData.prenom}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Mot de passe"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Salaire"
              name="salaire"
              type="number"
              value={formData.salaire}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              select
              label="Clinique"
              name="cliniqueId"
              value={formData.cliniqueId ?? ""}
              onChange={handleChange}
              fullWidth
              margin="normal"
            >
              <MenuItem value="">-- Choisir une clinique --</MenuItem>
              {cliniques.map((c) => (
                <MenuItem key={c.id} value={c.id}>
                  {c.nom}
                </MenuItem>
              ))}
            </TextField>

            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
              <Button
                type="submit"
                variant="contained"
                color="success"
                sx={{ py: 1.2, fontSize: "1rem", borderRadius: "12px" }}
              >
                💾 Enregistrer
              </Button>
              <Button
                variant="contained"
                color="secondary"
                sx={{ py: 1.2, fontSize: "1rem", borderRadius: "12px" }}
                onClick={() => navigate("/admin/liste-receptionniste")}
              >
                ↩️ Annuler
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ModifierReceptionniste;
