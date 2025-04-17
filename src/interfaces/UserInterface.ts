export interface UserInterface {
  id: number;
  nome: string;
  email: string;
  telefone: string;
}

export interface UpdateUserInterface {
  nome: string;
  email: string;
  telefone: string;
}

export interface ResetPasswordInterface {
  oldPassword: string;
  newPassword: string;
}
export default interface LoginInterface {
  email: string;
  password: string;
}

export interface RegisterInterface {
  nome: string;
  email: string;
  telefone: string;
  senha: string;
  tipo: number;
}
