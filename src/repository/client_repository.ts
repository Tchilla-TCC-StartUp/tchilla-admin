import { UserInterface } from "../interfaces/user_interface";
import BaseRepository from "./base_repository";

const ClientRepository = () => {
    const { get } = BaseRepository();
    return {

        getAllClients: async (token: string): Promise<UserInterface[]> => {
            const response = await get("/api/Usuario/getAll", undefined, token) as { data: any };
            return response.data;
        }
    }
}

export default ClientRepository;
