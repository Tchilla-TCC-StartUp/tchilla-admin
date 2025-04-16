import { AgenciaInterface } from "../interfaces/agencia_interface";
import BaseRepository from "./base_repository";

const AgenciaRepository = () => {
  const { get } = BaseRepository();

  return {
    getAllAgencias: async (token: string): Promise<AgenciaInterface[]> => {
      const response = await get("/api/Agencia/getAll", undefined, token) as { data: AgenciaInterface[] };
      return response.data;
    }
  };
};

export default AgenciaRepository;