export interface SettingsAppEnum {
  name: string;
  values: string[];
}

 
export interface EnumOption {
  label: string;
  value: number;
}

export interface SettingsState {
  enums: Record<string, string[]>;
  setEnums: (data: SettingsAppEnum[]) => void;
  getEnum: (name: string) => string[];
}
