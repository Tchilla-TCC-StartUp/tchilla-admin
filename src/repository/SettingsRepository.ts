import { SettingsAppEnum } from "../interfaces/ SettingsInterface";
import BaseRepository from "./BaseRepository";

const SettingsRepository = () => {
  const { get } = BaseRepository();

  return {
    getAllEnumsApp: async (): Promise<SettingsAppEnum[]> => {
      const response = (await get("/api/Enum/enums")) as SettingsAppEnum[];
      return response;
    },
  };
};

export default SettingsRepository;
