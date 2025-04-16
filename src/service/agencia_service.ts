import { useBaseRequestHook } from "../hooks/base_request_hook";
import AgenciaRepository from "../repository/agencia_repository";
import { AgenciaInterface } from "../interfaces/agencia_interface";

interface AgenciaServiceInterface {
  getAllAgencias: () => Promise<AgenciaInterface[]>;
}

const AgenciaService = (): AgenciaServiceInterface => {
  const { onRequest } = useBaseRequestHook();
  const { getAllAgencias: repositoryGetAll } = AgenciaRepository();

  return {
    getAllAgencias: async (): Promise<AgenciaInterface[]> => {
      return onRequest(
        (token?: string) => repositoryGetAll(token!),
        undefined,
        undefined,
        true,
        true
      );
    }
  };
};

export default AgenciaService;