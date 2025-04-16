import axios, { AxiosInstance, AxiosRequestConfig, AxiosError } from "axios";
import { ApiErrorType, ApiException } from "../resource/app_exceptions";
import AppConstants from "../resource/app_constants";
import setupInterceptors from "../resource/app_interceptor";

interface RequestHeaders extends Record<string, string | undefined> {
    Authorization?: string;
    "Content-Type"?: string;
}

const api: AxiosInstance = axios.create({
    baseURL: AppConstants.baseURL,
    timeout: 10000,
    headers: {

    },
});

setupInterceptors(api);

interface ApiErrorResponse {
    error?: string;
    message?: string;
    [key: string]: unknown;
}

const handleRequest = async <T>(
    config: AxiosRequestConfig,
    token?: string
): Promise<T> => {
    try {
        const requestConfig: AxiosRequestConfig = {
            ...config,
            headers: {
                ...(config.headers as RequestHeaders),
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
        };

        const response = await api.request<T>(requestConfig);
        return response.data;
    } catch (error) {
        return handleError(error as AxiosError<ApiErrorResponse>);
    }
};

const handleError = (error: AxiosError<ApiErrorResponse>): never => {
    if (axios.isAxiosError(error)) {
        const status = error.response?.status || 500;
        const data = error.response?.data || {};
        const errorMessage = data.error || data.message || "Erro desconhecido";

        const errorMap: Record<number, [string, ApiErrorType]> = {
            400: ["Erro de validação", ApiErrorType.VALIDATION],
            401: ["Não autorizado", ApiErrorType.UNAUTHORIZED],
            403: ["Acesso proibido", ApiErrorType.FORBIDDEN],
            404: ["Recurso não encontrado", ApiErrorType.NOT_FOUND],
            408: ["Tempo limite da requisição esgotado", ApiErrorType.TIMEOUT],
            500: ["Erro interno do servidor", ApiErrorType.SERVER],
        };

        const [defaultMessage, errorType] =
            errorMap[status] || ["Erro desconhecido", ApiErrorType.UNKNOWN];

        throw new ApiException(
            errorMessage !== "Erro desconhecido" ? errorMessage : defaultMessage,
            status,
            errorType,
            data
        );
    }

    throw new ApiException(
        error || "Erro de rede",
        0,
        ApiErrorType.NETWORK
    );
};

interface BaseRepositoryInterface {
    get<T>(
        url: string,
        params?: Record<string, unknown>,
        token?: string
    ): Promise<T>;
    post<T>(url: string, data?: unknown, token?: string): Promise<T>;
    put<T>(url: string, data?: unknown, token?: string): Promise<T>;
    delete<T>(url: string, token?: string): Promise<T>;
}

const BaseRepository = (): BaseRepositoryInterface => ({
    get: <T>(url: string, params?: Record<string, unknown>, token?: string) =>
        handleRequest<T>({ method: "GET", url, params }, token),

    post: <T>(url: string, data?: unknown, token?: string) =>
        handleRequest<T>({ method: "POST", url, data }, token),

    put: <T>(url: string, data?: unknown, token?: string) =>
        handleRequest<T>({ method: "PUT", url, data }, token),

    delete: <T>(url: string, token?: string) =>
        handleRequest<T>({ method: "DELETE", url }, token),
});

export default BaseRepository;