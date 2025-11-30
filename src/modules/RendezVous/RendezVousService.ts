// src/modules/RendezVous/RendezVousService.ts
import axios from "axios";

const API_URL = "https://localhost:7012/api/RendezVous";

export interface RendezVousDto {
  id: number;
  dateHeure: string;
  statut?: number | null;
  patientId: number;
  patientNom?: string;
  receptionnisteId?: number | null;
  receptionnisteNom?: string;
  medecinId?: number | null;
  medecinNom?: string;
}

export interface RendezVousCreateDto {
  dateHeure: string;
  statut?: number | null;
  patientId: number;
  receptionnisteId?: number | null;
  medecinId?: number | null;
}

export const RendezVousService = {
  async getAll(): Promise<RendezVousDto[]> {
    const res = await axios.get(API_URL);
    return Array.isArray(res.data) ? res.data : res.data.$values || [];
  },

  async getById(id: number): Promise<RendezVousDto> {
    const res = await axios.get(`${API_URL}/${id}`);
    return res.data;
  },

  async create(dto: RendezVousCreateDto): Promise<any> {
    const res = await axios.post(API_URL, dto);
    return res.data;
  },

  async update(id: number, dto: RendezVousCreateDto): Promise<any> {
    const res = await axios.put(`${API_URL}/${id}`, dto);
    return res.data;
  },

  async updateStatut(id: number, statut: number): Promise<any> {
    const res = await axios.put(`${API_URL}/${id}/statut`, statut, {
      headers: { "Content-Type": "application/json" },
    });
    return res.data;
  },

  async remove(id: number): Promise<void> {
    await axios.delete(`${API_URL}/${id}`);
  },
};
