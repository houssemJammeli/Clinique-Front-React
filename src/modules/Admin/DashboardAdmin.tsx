import React from "react";
import { Box, Card, CardContent, Typography, Button } from "@mui/material";
import { FaHospitalAlt, FaUserMd, FaUserTie } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function DashboardAdmin() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #e3f2fd, #90caf9)",
        p: 3,
      }}
    >
      <Card
        sx={{
          maxWidth: 650,
          width: "100%",
          borderRadius: 4,
          boxShadow: 6,
          p: 4,
          textAlign: "center",
          backdropFilter: "blur(6px)",
        }}
      >
        <CardContent>
          <Typography variant="h3" fontWeight={700} color="primary" sx={{ mb: 2 }}>
            ⚙️ Tableau de bord Admin
          </Typography>

          <Typography variant="h6" sx={{ mb: 2, opacity: 0.8 }}>
            Bienvenue administrateur 👋
          </Typography>

          <Typography sx={{ mb: 4 }}>
            Gérez facilement les cliniques, médecins et réceptionnistes depuis votre espace d’administration.
          </Typography>

          {/* BOUTONS RAPIDES */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Button
              variant="contained"
              sx={{ py: 1.5, borderRadius: 3 }}
              startIcon={<FaHospitalAlt />}
              onClick={() => navigate("/admin/cliniques")}
            >
              Gérer les cliniques
            </Button>

            <Button
              variant="contained"
              sx={{ py: 1.5, borderRadius: 3 }}
              startIcon={<FaUserMd />}
              onClick={() => navigate("/admin/medecins")}
            >
              Gérer les médecins
            </Button>

            <Button
              variant="contained"
              sx={{ py: 1.5, borderRadius: 3 }}
              startIcon={<FaUserTie />}
              onClick={() => navigate("/admin/receptionnistes")}
            >
              Gérer les réceptionnistes
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
