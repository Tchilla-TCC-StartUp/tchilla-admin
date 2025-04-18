import { create } from "zustand";
import { SettingsState, SettingsAppEnum } from "../interfaces/ SettingsInterface";


export const useSettings = create<SettingsState>((set, get) => ({
  enums: {},
  setEnums: (data: SettingsAppEnum[]) => {
    const mappedEnums: Record<string, string[]> = {};

    data.forEach((item) => {
      mappedEnums[item.name] = item.values;
    });

    set({ enums: mappedEnums });
  },
  getEnum: (name) => {
    const enums = get().enums;
    return enums[name] || [];
  },
}));
