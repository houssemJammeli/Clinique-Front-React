import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Card,
  CardContent,
  Typography,
  Box,
  SelectChangeEvent,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Clinique, getCliniques } from "../Clinique/CliniqueService";
import { MedecinCreateDto, MedecinService } from "./MedecinService";

const AjouterMedecin: React.FC = () => {
  const navigate = useNavigate();

  const [cliniques, setCliniques] = useState<Clinique[]>([]);
  const [formData, setFormData] = useState<MedecinCreateDto>({
    nom: "",
    prenom: "",
    email: "",
    password: "",
    specialite: "",
    salaire: 0,
    cliniqueId: undefined,
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCliniques = async () => {
      try {
        const data = await getCliniques();
        const cliList: Clinique[] = Array.isArray(data)
          ? data
          : (data as any)?.$values ?? [];
        setCliniques(cliList);
      } catch (error) {
        console.error("Erreur lors du chargement des cliniques :", error);
        setCliniques([]);
      }
    };
    fetchCliniques();
  }, []);

  // 🔹 Handle TextField changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "salaire" ? Number(value) : value,
    }));
  };

  // 🔹 Handle Select changes (fix TS)
  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const value = e.target.value;
    setFormData((prev) => ({
      ...prev,
      cliniqueId: value === "" ? undefined : Number(value),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await MedecinService.create(formData);
      toast.success("Médecin ajouté avec succès ✅");
      navigate("/admin/liste-medecin");
    } catch (error) {
      console.error("Erreur lors de l’ajout :", error);
      toast.error("❌ Échec lors de l’ajout du médecin");
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
      <Card sx={{ maxWidth: 600, width: "100%", borderRadius: 3, boxShadow: 6 }}>
        <CardContent>
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{ color: "#1976d2", fontWeight: 600 }}
          >
            ➕ Ajouter un Médecin
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              label="Nom"
              name="nom"
              value={formData.nom}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Prénom"
              name="prenom"
              value={formData.prenom}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Mot de passe"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Spécialité"
              name="specialite"
              value={formData.specialite}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Salaire (DT)"
              name="salaire"
              type="number"
              value={formData.salaire}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />

            <FormControl fullWidth margin="normal">
              <InputLabel id="clinique-select-label">Clinique</InputLabel>
              <Select
                labelId="clinique-select-label"
                value={formData.cliniqueId?.toString() || ""}
                onChange={handleSelectChange}
                label="Clinique"
              >
                <MenuItem value="">
                  <em>-- Aucune clinique --</em>
                </MenuItem>
                {cliniques.map((cli) => (
                  <MenuItem key={cli.id} value={cli.id.toString()}>
                    {cli.nom}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
              <Button type="submit" variant="contained" color="success" disabled={loading}>
                {loading ? "Enregistrement..." : "💾 Enregistrer"}
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => navigate("/admin/medecins")}
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

export default AjouterMedecin;
