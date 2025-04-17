import { useBaseRequestHook } from "../hooks/BaseRequestHook";
import AgenciaRepository from "../repository/AgenciaRepository";
import { AgenciaInterface } from "../interfaces/AgenciaInterface";

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
    },
  };
};

export default AgenciaService;
