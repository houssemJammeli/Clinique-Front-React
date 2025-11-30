import axios from "axios";

const API_URL = "https://localhost:7012/api/Consultation";

export interface OrdonnanceDto {
  id?: number;
  date?: string;
  contenu: string;
}

export interface FactureDto {
  id?: number;
  montant: number;
  statutPaiement: number; // 0 = Payé, 1 = NonPayé selon ton enum C#
}

export interface ConsultationDto {
  id: number;
  rendezVousId: number;
  rapport: string;
  ordonnance?: OrdonnanceDto | null;
  facture?: FactureDto | null;
}

export const ConsultationService = {
  // 🔹 Récupérer toutes les consultations
  async getAll(): Promise<ConsultationDto[]> {
    const res = await axios.get(API_URL);
    return Array.isArray(res.data) ? res.data : res.data.$values || [];
  },

  // 🔹 Récupérer une consultation par ID
  async getById(id: number): Promise<ConsultationDto> {
    const res = await axios.get(`${API_URL}/${id}`);
    return res.data;
  },

  // 🔹 Mettre à jour le rapport de la consultation
  async updateRapport(id: number, rapport: string): Promise<any> {
    const res = await axios.put(`${API_URL}/${id}/rapport`, rapport, {
      headers: { "Content-Type": "application/json" },
    });
    return res.data;
  },

  // 🔹 Créer une ordonnance
  async createOrdonnance(id: number, dto: OrdonnanceDto): Promise<any> {
    const res = await axios.post(`${API_URL}/${id}/ordonnance`, dto);
    return res.data;
  },

  // 🔹 Créer une facture
  async createFacture(id: number, dto: { montant: number }): Promise<any> {
    const res = await axios.post(`${API_URL}/${id}/facture`, dto);
    return res.data;
  },
};
