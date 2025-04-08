export interface UserInterface {
    nome: string;
    email: string;
    telefone: string;
}

export interface UpdateUserInterface {
    nome: string;
    email: string;
    telefone: string;
    token: string;
}

export interface ResetPasswordInterface {
    token: string;
    oldPassword: string;
    newPassword: string;
}
