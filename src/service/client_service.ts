import { useBaseRequestHook } from "../hooks/base_request_hook";
import { DeleteUserResponse } from "../interfaces/clients_interface";
import { UserInterface } from "../interfaces/user_interface";
import ClientRepository from "../repository/client_repository";
import { useSnackbarStore } from "../stores/snackbar_store";

interface ClientServiceInterface {
    getAllClients: () => Promise<UserInterface[]>;
    deleteUser: (id: number) => Promise<DeleteUserResponse>
}

const ClientService = (): ClientServiceInterface => {
    const { onRequest } = useBaseRequestHook();
    const { getAllClients: repositoryGetAllClients, deleteUser: repositoryDetelteUser } = ClientRepository();
    const { showSnackbar } = useSnackbarStore();


    return {
        getAllClients: async (): Promise<UserInterface[]> => {
            return onRequest(
                (token?: string) => repositoryGetAllClients(token!),
                undefined,
                undefined,
                true,
                true
            );
        },

        deleteUser: async (id: number): Promise<DeleteUserResponse> => {
            return onRequest(
                (token?: string) => repositoryDetelteUser(token!, id),
                (response) => showSnackbar(response.message ?? "", "success"),
                undefined,
                true,
                true
            )
        }
    };
};

export default ClientService;