import { useBaseRequestHook } from "../hooks/BaseRequestHook";
import { SettingsAppEnum } from "../interfaces/ SettingsInterface";
import SettingsRepository from "../repository/SettingsRepository";

const SettingsService = () => {
  const { getAllEnumsApp: repositoryGetAllEnumsApp } = SettingsRepository();
  const { onRequest } = useBaseRequestHook();
  return {
    getAllEnumsApp: async (): Promise<SettingsAppEnum[]> => {
      return onRequest(
        () => repositoryGetAllEnumsApp(),
        undefined,
        undefined,
        false
      );
    },
  };
};
export default SettingsService;
