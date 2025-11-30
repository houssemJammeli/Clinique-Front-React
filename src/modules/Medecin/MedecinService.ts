import axios from "axios";

const API_URL = "https://localhost:7012/api/Medecin";

export interface MedecinDto {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  specialite: string;
  salaire: number;
  cliniqueId?: number;
  cliniqueNom?: string;
}

export interface MedecinCreateDto {
  nom: string;
  prenom: string;
  email: string;
  password: string;
  specialite: string;
  salaire: number;
  cliniqueId?: number;
}

export interface MedecinUpdateDto {
  nom: string;
  prenom: string;
  email: string;
  specialite: string;
  salaire: number;
  cliniqueId?: number;
}

const getAll = async (): Promise<MedecinDto[]> => {
  const res = await axios.get(API_URL);
  const data = res.data;

  // Si .NET renvoie $values, on les extrait
  if (data && data.$values) {
    return data.$values as MedecinDto[];
  }

  // Sinon, on renvoie directement (au cas où ce soit déjà un tableau)
  return data as MedecinDto[];
};

const getById = async (id: number) => {
  const res = await axios.get<MedecinDto>(`${API_URL}/${id}`);
  return res.data;
};

const create = async (dto: MedecinCreateDto) => {
  const res = await axios.post(API_URL, dto);
  return res.data;
};

const update = async (id: number, dto: MedecinUpdateDto) => {
  const res = await axios.put(`${API_URL}/${id}`, dto);
  return res.data;
};

const remove = async (id: number) => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
};

export const MedecinService = { getAll, getById, create, update, remove };
