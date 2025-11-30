// src/modules/Auth/auth.service.ts
import axios from "axios";

const API_URL = "https://localhost:7012/api/Auth"; 

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  id: number;
  token: string;
  role: string;
  nom: string;
  prenom: string;
}

export interface RegisterRequest {
  nom: string;
  prenom: string;
  email: string;
  password: string;
  role: string;
}

export const login = async (data: LoginRequest): Promise<AuthResponse> => {
  const response = await axios.post(`${API_URL}/login`, data);
  return response.data;
};

export const register = async (data: RegisterRequest): Promise<string> => {
  const response = await axios.post(`${API_URL}/register`, data);
  return response.data; // le backend renvoie "Utilisateur créé avec succès"
};

export const logout = () => {
  localStorage.clear(); // supprime token, role, userId, etc.
};
