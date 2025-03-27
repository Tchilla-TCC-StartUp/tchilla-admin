import axios from "axios";

const API_URL = "https://ecotrack-udd9.onrender.com/api/Auth"; // Base da API

interface RegisterData {
  nome: string;
  email: string;
  telefone: string;
  senha: string;
  tipo: number;
}

const register = async (userData: RegisterData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData, {
      headers: { "Content-Type": "application/json" },
    });

    return response.data;
  } catch (error: any) {
    throw error.response?.data || "Erro ao registrar.";
  }
};

export default { register };