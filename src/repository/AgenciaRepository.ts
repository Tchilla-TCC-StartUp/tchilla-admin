import { AgenciaInterface } from "../interfaces/AgenciaInterface";
import BaseRepository from "./BaseRepository";

const AgenciaRepository = () => {
  const { get } = BaseRepository();

  return {
    getAllAgencias: async (token: string): Promise<AgenciaInterface[]> => {
      const response = (await get("/api/Agencia/getAll", undefined, token)) as {
        data: AgenciaInterface[];
      };
      return response.data;
    },
  };
};

export default AgenciaRepository;
