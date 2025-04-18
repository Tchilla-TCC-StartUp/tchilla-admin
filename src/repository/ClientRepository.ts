import {
  ClientesData,
  DeleteClientResponse,
} from "../interfaces/ClientsInterface";
import BaseRepository from "./BaseRepository";

const ClientRepository = () => {
  const { get, delete: del } = BaseRepository();

  return {
    getAllClients: async (token: string): Promise<ClientesData[]> => {
      const response = (await get("/api/Usuario/getAll", undefined, token)) as {
        data: ClientesData[];
      };
      return response.data;
    },

    deleteUser: async (
      token: string,
      id: number
    ): Promise<DeleteClientResponse> => {
      const response = (await del(
        `/api/Usuario/deletar/${id}`,
        token
      )) as DeleteClientResponse;
      return response;
    },
  };
};

export default ClientRepository;
