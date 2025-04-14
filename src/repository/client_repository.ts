import { DeleteUserResponse } from "../interfaces/clients_interface";
import { UserInterface } from "../interfaces/user_interface";
import BaseRepository from "./base_repository";



const ClientRepository = () => {
    const { get, delete: del } = BaseRepository();

    return {
        getAllClients: async (token: string): Promise<UserInterface[]> => {
            const response = await get("/api/Usuario/getAll", undefined, token) as { data: UserInterface[] };
            return response.data;
        },

        deleteUser: async (token: string, id: number): Promise<DeleteUserResponse> => {
            const response = await del(`/api/Usuario/deletar/${id}`, token) as DeleteUserResponse;
            return response;
        }
    };
};

export default ClientRepository;
