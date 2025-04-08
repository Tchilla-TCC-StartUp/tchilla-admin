export interface UserInterface {
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
