import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { ApiErrorType, ApiException } from "../resource/app_exceptions";
import AppConstants from "../resource/app_constants";
import setupInterceptors from "../resource/app_interceptor";

const api: AxiosInstance = axios.create({
    baseURL: AppConstants.baseURL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});


setupInterceptors(api);

const handleRequest = async <T>(config: AxiosRequestConfig, token?: string): Promise<T> => {
    try {
        if (token) {
            config.headers = {
                ...(config.headers || {}),
                Authorization: `Bearer ${token}`,
            };
        }

        const response = await api.request<T>(config);
        return response.data;
    } catch (error) {
        return handleError(error);
    }
};


const handleError = (error: unknown): never => {
    if (axios.isAxiosError(error)) {
        const status = error.response?.status || 500;
        const data = error.response?.data;

        switch (status) {
            case 400:
                throw new ApiException(data['error'] ?? data?.message ?? "Erro de validação", status, ApiErrorType.VALIDATION, data);
            case 401:
                throw new ApiException(data['error'] ?? data?.message ?? "Não autorizado", status, ApiErrorType.UNAUTHORIZED);
            case 403:
                throw new ApiException(data['error'] ?? data?.message ?? "Acesso proibido", status, ApiErrorType.FORBIDDEN);
            case 404:
                throw new ApiException(data['error'] ?? data?.message ?? "Recurso não encontrado", status, ApiErrorType.NOT_FOUND);
            case 408:
                throw new ApiException(data['error'] ?? data?.message ?? "Tempo limite da requisição esgotado", status, ApiErrorType.TIMEOUT);
            case 500:
                throw new ApiException(data['error'] ?? data?.message ?? "Erro interno do servidor", status, ApiErrorType.SERVER);
            default:
                throw new ApiException(data['error'] ?? data?.message ?? "Erro desconhecido", status, ApiErrorType.UNKNOWN);
        }
    }

    throw new ApiException("Erro de rede", 0, ApiErrorType.NETWORK);
};


const BaseRepository = () => {
    return {
        get: <T>(url: string, params?: Record<string, unknown>, token?: string) => {
            return handleRequest<T>({ method: "GET", url, params }, token);
        },

        post: <T>(url: string, data?: unknown, token?: string) => {
            return handleRequest<T>({ method: "POST", url, data }, token);
        },

        put: <T>(url: string, data?: unknown, token?: string) => {
            return handleRequest<T>({ method: "PUT", url, data }, token);
        },

        delete: <T>(url: string, token?: string) => {
            return handleRequest<T>({ method: "DELETE", url }, token);
        },
    };
};


export default BaseRepository;

