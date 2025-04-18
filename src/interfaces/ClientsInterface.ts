export interface DeleteClientResponse {
    isSuccess?: boolean;
    message?: string;
    errorMessage?: string;
    data?: any;
}

export interface ClientesData {
    id: number
    nome: string;
    email: string;
    telefone: string;
}