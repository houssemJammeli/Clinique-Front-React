import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Clinique, getCliniques } from "../Clinique/CliniqueService";
import { MedecinDto, MedecinService } from "./MedecinService";

const ModifierMedecin: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [medecin, setMedecin] = useState<MedecinDto | null>(null);
  const [cliniques, setCliniques] = useState<Clinique[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const medData = await MedecinService.getById(Number(id));
        const cliData = await getCliniques();
        const cliList: Clinique[] = Array.isArray(cliData)
          ? cliData
          : (cliData as any)?.$values ?? [];

        setMedecin(medData);
        setCliniques(cliList);
      } catch (error) {
        console.error("Erreur lors du chargement :", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setMedecin((prev) =>
      prev ? { ...prev, [name]: name === "salaire" ? Number(value) : value } : prev
    );
  };

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const value = e.target.value;
    setMedecin((prev) =>
      prev ? { ...prev, cliniqueId: value === "" ? undefined : Number(value) } : prev
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!medecin) return;

    setSaving(true);
    try {
      await MedecinService.update(Number(id), medecin);
      toast.success("Médecin modifié avec succès ✅");
      navigate("/admin/liste-medecin");
    } catch (error) {
      console.error(error);
      toast.error("❌ Erreur lors de la modification");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-center mt-4">Chargement...</p>;
  if (!medecin) return <p className="text-center text-danger">Médecin introuvable ❌</p>;

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
      <Card sx={{ maxWidth: 500, width: "100%", borderRadius: 3, boxShadow: 6 }}>
        <CardContent>
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{ fontWeight: 600, color: "#1976d2" }}
          >
            ✏️ Modifier Médecin
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              label="Nom"
              name="nom"
              value={medecin.nom || ""}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Prénom"
              name="prenom"
              value={medecin.prenom || ""}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Email"
              name="email"
              type="email"
              value={medecin.email || ""}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Spécialité"
              name="specialite"
              value={medecin.specialite || ""}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Salaire (DT)"
              name="salaire"
              type="number"
              value={medecin.salaire ?? 0}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />

            <FormControl fullWidth margin="normal">
              <InputLabel id="clinique-select-label">Clinique</InputLabel>
              <Select
                labelId="clinique-select-label"
                value={medecin.cliniqueId?.toString() || ""}
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
              <Button type="submit" variant="contained" color="success" disabled={saving}>
                {saving ? "Enregistrement..." : "💾 Enregistrer"}
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => navigate("/admin/liste-medecin")}
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

export default ModifierMedecin;
