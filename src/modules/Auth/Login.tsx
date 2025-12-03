import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "./auth.service";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Box,
} from "@mui/material";
import { toast } from "react-toastify";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await login({ email, password });
      localStorage.setItem("token", response.token);
      localStorage.setItem("role", response.role);
      localStorage.setItem("userId", response.id.toString());

      toast.success(`Bienvenue ${response.prenom} 👋`);

      switch (response.role) {
        case "Admin":
          navigate("/admin/dashboard");
          break;
        case "Medecin":
          navigate("/medecin/rendezvous");
          break;
        case "Receptionniste":
          navigate("/receptionniste/rendezvous");
          break;
        case "Patient":
          navigate("/patient/rendezvous");
          break;
        default:
          navigate("/");
      }
    } catch (error: any) {
      toast.error(error.response?.data || "Erreur de connexion");
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
            Connexion
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              label="Email"
              type="email"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <TextField
              label="Mot de passe"
              type="password"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
            >
              Se connecter
            </Button>
          </form>

          <Typography
            variant="body2"
            align="center"
            sx={{ mt: 3, color: "gray" }}
          >
            Pas encore de compte ?{" "}
            <a href="/register" style={{ color: "#1976d2", textDecoration: "none" }}>
              S'inscrire
            </a>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
