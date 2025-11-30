import React, { useState } from "react";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  MenuItem,
  Box,
} from "@mui/material";
import { register } from "./auth.service";
import { toast } from "react-toastify";

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    password: "",
    role: "Patient",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const message = await register(formData);
      toast.success(message);
      setFormData({
        nom: "",
        prenom: "",
        email: "",
        password: "",
        role: "Patient",
      });
    } catch (err: any) {
      toast.error(err.response?.data || "Erreur lors de l'inscription");
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
      <Card
        sx={{
          width: 400,
          borderRadius: 3,
          boxShadow: 6,
          p: 3,
          backgroundColor: "#fff",
        }}
      >
        <CardContent>
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{ fontWeight: 600, color: "#1976d2" }}
          >
            Créer un compte
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
              required
            />

            <TextField
              select
              label="Rôle"
              name="role"
              value={formData.role}
              onChange={handleChange}
              fullWidth
              margin="normal"
            >
              <MenuItem value="Patient">Patient</MenuItem>
              <MenuItem value="Medecin">Médecin</MenuItem>
              <MenuItem value="Receptionniste">Réceptionniste</MenuItem>
              <MenuItem value="Admin">Admin</MenuItem>
            </TextField>

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
            >
              S'inscrire
            </Button>
          </form>

          <Typography
            variant="body2"
            align="center"
            sx={{ mt: 3, color: "gray" }}
          >
            Déjà un compte ?{" "}
            <a href="/login" style={{ color: "#1976d2", textDecoration: "none" }}>
              Se connecter
            </a>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Register;
