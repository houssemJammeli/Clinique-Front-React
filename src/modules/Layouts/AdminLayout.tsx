import React from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
} from "@mui/material";

import { FaHome, FaHospitalAlt, FaUserMd, FaUserTie, FaSignOutAlt } from "react-icons/fa";
import { logout } from "../Auth/auth.service";

const menuItems = [
  { label: "Tableau de bord", icon: <FaHome />, to: "/admin/dashboard" },
  { label: "Cliniques", icon: <FaHospitalAlt />, to: "/admin/cliniques" },
  { label: "Médecins", icon: <FaUserMd />, to: "/admin/medecins" },
  { label: "Réceptionnistes", icon: <FaUserTie />, to: "/admin/receptionnistes" },
];

const AdminLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();           // supprime token, role, userId
    navigate("/login"); // redirige vers la page de connexion
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      {/* SIDEBAR */}
      <Drawer
        variant="permanent"
        sx={{
          width: 250,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: 250,
            boxSizing: "border-box",
            background: "linear-gradient(180deg, #1b5e20, #2e7d32)",
            color: "white",
            p: 2,
            border: "none",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          },
        }}
      >
        <Box>
          <Typography
            variant="h5"
            sx={{ fontWeight: 700, mb: 4, textAlign: "center" }}
          >
            ⚙️ Espace Admin
          </Typography>

          <List>
            {menuItems.map((item) => {
              const active = location.pathname === item.to;
              return (
                <ListItem disablePadding key={item.to}>
                  <ListItemButton
                    component={Link}
                    to={item.to}
                    sx={{
                      borderRadius: "12px",
                      mb: 1,
                      transition: "0.2s",
                      backgroundColor: active ? "rgba(255,255,255,0.15)" : "transparent",
                      "&:hover": { backgroundColor: "rgba(255,255,255,0.25)" },
                    }}
                  >
                    <ListItemIcon sx={{ color: "white" }}>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.label} />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Box>

        {/* BOUTON DECONNEXION EN BAS */}
        <Box>
          <Divider sx={{ backgroundColor: "rgba(255,255,255,0.3)", mb: 1 }} />
          <List>
            <ListItem disablePadding>
              <ListItemButton
                onClick={handleLogout}
                sx={{
                  borderRadius: "12px",
                  "&:hover": { backgroundColor: "rgba(255,255,255,0.25)" },
                }}
              >
                <ListItemIcon sx={{ color: "white" }}>
                  <FaSignOutAlt />
                </ListItemIcon>
                <ListItemText primary="Déconnexion" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>

      {/* MAIN CONTENT */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 4,
          background: "linear-gradient(135deg, #e3f2fd, #bbdefb)",
          minHeight: "100vh",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default AdminLayout;
