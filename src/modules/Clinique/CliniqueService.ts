import axios from "axios";

const API_URL = "https://localhost:7012/api/Clinique"; // adapte ton port

export interface Clinique {
  id: number;
  nom: string;
  adresse: string;
  telephone: string;
  adminNom: string;
}

export interface CreateClinique {
  nom: string;
  adresse: string;
  telephone: string;
  adminId: number;
}

export const getCliniques = async (): Promise<any> => {
  const res = await axios.get(API_URL);
  return res.data;
};


export const createClinique = async (data: CreateClinique): Promise<any> => {
  const res = await axios.post(API_URL, data);
  return res.data;
};

export const updateClinique = async (id: number, data: CreateClinique): Promise<any> => {
  const res = await axios.put(`${API_URL}/${id}`, data);
  return res.data;
};

export const deleteClinique = async (id: number): Promise<any> => {
  await axios.delete(`${API_URL}/${id}`);
};
