export type CategoryModel = {
    id: number;
    nome: string;
    descricao: string;
    foto: string;
}

export interface deleteCategoryResponse {
    isSuccess?: boolean;
    message?: string;
    errorMessage?: string;
    data?: any;
}