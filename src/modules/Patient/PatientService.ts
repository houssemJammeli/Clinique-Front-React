import axios from "axios";

const API_URL = "https://localhost:7012/api/Patient";

export interface PatientDto {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  password?: string;
  dateNaissance?: string;
  telephone?: string;
}

export interface PatientCreateDto {
  nom: string;
  prenom: string;
  email: string;
  password: string;
  dateNaissance?: string;
  telephone?: string;
}

export const PatientService = {
  // 🔹 Récupérer tous les patients
  async getAll(): Promise<PatientDto[]> {
    const res = await axios.get(API_URL);
    // Gérer la structure avec ou sans $values (cas .NET)
    return Array.isArray(res.data) ? res.data : res.data.$values || [];
  },

  // 🔹 Récupérer un patient par ID
  async getById(id: number): Promise<PatientDto> {
    const res = await axios.get(`${API_URL}/${id}`);
    return res.data;
  },

  // 🔹 Créer un nouveau patient
  async create(data: PatientCreateDto): Promise<any> {
    const res = await axios.post(API_URL, data);
    return res.data;
  },

  // 🔹 Modifier un patient
  async update(id: number, data: PatientCreateDto): Promise<any> {
    const res = await axios.put(`${API_URL}/${id}`, data);
    return res.data;
  },

  // 🔹 Supprimer un patient
  async remove(id: number): Promise<void> {
    await axios.delete(`${API_URL}/${id}`);
  },
};
