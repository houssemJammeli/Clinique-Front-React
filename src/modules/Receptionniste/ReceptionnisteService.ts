import axios from "axios";

const API_URL = "https://localhost:7012/api/Receptionniste";

export interface ReceptionnisteDto {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  salaire: number;
  cliniqueId?: number | null;
  cliniqueNom?: string | null;
}

export interface ReceptionnisteCreateDto {
  nom: string;
  prenom: string;
  email: string;
  password: string;
  salaire: number;
  cliniqueId?: number | null;
}

export const ReceptionnisteService = {
  async getAll(): Promise<ReceptionnisteDto[]> {
    const res = await axios.get(API_URL);
    return Array.isArray(res.data) ? res.data : res.data.$values || [];
  },

  async getById(id: number): Promise<ReceptionnisteDto> {
    const res = await axios.get(`${API_URL}/${id}`);
    return res.data;
  },

  async create(data: ReceptionnisteCreateDto): Promise<any> {
    const res = await axios.post(API_URL, data);
    return res.data;
  },

  async update(id: number, data: ReceptionnisteCreateDto): Promise<any> {
    const res = await axios.put(`${API_URL}/${id}`, data);
    return res.data;
  },

  async remove(id: number): Promise<void> {
    await axios.delete(`${API_URL}/${id}`);
  },
};
