import { useBaseRequestHook } from "../hooks/base_request_hook";
import { UserInterface } from "../interfaces/user_interface";
import ClientRepository from "../repository/client_repository";

interface ClientServiceInterface {
    getAllClients: () => Promise<UserInterface[]>;
}

const ClientService = (): ClientServiceInterface => {
    const { onRequest } = useBaseRequestHook();
    const { getAllClients: repositoryGetAllClients } = ClientRepository();

    const getAllClients = async (): Promise<UserInterface[]> => {
        return onRequest(
            (token?: string) => repositoryGetAllClients(token!),
            undefined,
            undefined,
            true,
            true
        );
    };

    return {
        getAllClients,
    };
};

export default ClientService;