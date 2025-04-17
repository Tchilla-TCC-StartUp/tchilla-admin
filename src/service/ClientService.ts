import { useBaseRequestHook } from "../hooks/BaseRequestHook";
import { ClientesData, DeleteClientResponse } from "../interfaces/ClientsInterface";
import ClientRepository from "../repository/ClientRepository";
import { useSnackbarStore } from "../stores/snackbar_store";



const useClientService = () => {
    const { onRequest } = useBaseRequestHook();
    const { getAllClients: repositoryGetAllClients, deleteUser: repositoryDetelteUser } = ClientRepository();
    const { showSnackbar } = useSnackbarStore();


    return {
        getAllClients: async (): Promise<ClientesData[]> => {
            return onRequest(
                (token?: string) => repositoryGetAllClients(token!),
                undefined,
                undefined,
                true,
                true
            );
        },

        deleteUser: async (id: number): Promise<DeleteClientResponse> => {
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

export default useClientService;