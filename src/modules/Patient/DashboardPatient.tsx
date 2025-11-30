import React from "react";
import { Box, Card, CardContent, Typography, Button } from "@mui/material";

export default function DashboardPatient() {
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
          maxWidth: 600,
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
            👋 Bienvenue !
          </Typography>
          <Typography variant="h6" sx={{ mb: 3, opacity: 0.8 }}>
            Bonjour <strong>Patient Exemple</strong>, ravi de vous revoir !
          </Typography>
          <Typography sx={{ mb: 4 }}>
            Ici, vous pourrez bientôt gérer vos rendez-vous, consulter vos ordonnances et factures.
          </Typography>
          <Button
            variant="contained"
            size="large"
            sx={{
              px: 4,
              py: 1.5,
              background: "#0d47a1",
              borderRadius: 3,
              fontWeight: 600,
              ":hover": { background: "#08306b" },
            }}
            onClick={() => window.location.href = "/patient/dashboard"}
          >
            Aller au tableau de bord
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}
