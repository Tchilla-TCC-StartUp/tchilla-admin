import { create } from "zustand";
import { ApiErrorType, ApiException } from "../resource/app_exceptions";
import { useAuthStore } from "../stores/auth_store";
import { useErrorHandlerHook } from "./error_handler_hook";
import NavigationHooks from "./navigation_hook";

interface BaseRequestHook {
    isLoading: boolean;
    onRequest: <R>(
        request: (token?: string) => Promise<R>,
        onSuccess?: (data: R) => void,
        onError?: (error: ApiException | Error) => void,
        checkToken?: boolean,
        useFullScreenError?: boolean
    ) => Promise<R>;
}

// Tipos de erro que devem sempre usar tela cheia
const FULL_SCREEN_ERROR_TYPES: ApiErrorType[] = [
    ApiErrorType.NETWORK,
    ApiErrorType.TIMEOUT,
    ApiErrorType.NOT_FOUND,
    ApiErrorType.SERVER,
    ApiErrorType.UNKNOWN,
];

export const useBaseRequestHook = create<BaseRequestHook>((set) => ({
    isLoading: false,
    onRequest: async <R>(
        request: (token?: string) => Promise<R>,
        onSuccess?: (data: R) => void,
        onError?: (error: ApiException | Error) => void,
        checkToken: boolean = false,
        useFullScreenError: boolean = false
    ): Promise<R> => {
        const { token } = useAuthStore.getState();
        const { setError, clearError } = useErrorHandlerHook.getState();

        if (checkToken && !token) {
            const message = "Token não encontrado.";

            setError(
                message,
                ApiErrorType.UNAUTHORIZED,
                useFullScreenError ? "fullScreen" : "snackbar",
                401,
                undefined,
                () =>
                    useBaseRequestHook.getState().onRequest(
                        request,
                        onSuccess,
                        onError,
                        checkToken,
                        useFullScreenError
                    )
            );
            throw new ApiException(message, 401, ApiErrorType.UNAUTHORIZED);
        }

        const errorMessages: Record<ApiErrorType, string> = {
            [ApiErrorType.NETWORK]: "Erro de conexão com a rede.",
            [ApiErrorType.TIMEOUT]: "Tempo limite da requisição esgotado.",
            [ApiErrorType.UNAUTHORIZED]: "Não autorizado. Faça login novamente.",
            [ApiErrorType.FORBIDDEN]: "Acesso proibido.",
            [ApiErrorType.NOT_FOUND]: "Recurso não encontrado.",
            [ApiErrorType.VALIDATION]: "Erro de validação nos dados enviados.",
            [ApiErrorType.SERVER]: "Erro interno do servidor.",
            [ApiErrorType.UNKNOWN]: "Ocorreu um erro inesperado.",
        };

        try {
            set({ isLoading: true });
            clearError();

            const response = await request(checkToken ? token : undefined);
            onSuccess?.(response);
            return response;
        } catch (error) {
            const isApiException = error instanceof ApiException;
            const errorType = isApiException ? error.type : ApiErrorType.UNKNOWN;
            const message = isApiException
                ? error.message !== "Erro desconhecido"
                    ? error.message
                    : errorMessages[errorType]
                : error instanceof Error
                    ? error.message
                    : "Erro desconhecido";

            const shouldUseFullScreen =
                useFullScreenError || FULL_SCREEN_ERROR_TYPES.includes(errorType);
            if (errorType === ApiErrorType.UNAUTHORIZED) {
                NavigationHooks().navigateToLogin();
                useAuthStore.getState().clearToken();
            }
            setError(
                message,
                errorType,
                shouldUseFullScreen ? "fullScreen" : "snackbar",
                isApiException ? error.status : undefined,
                isApiException ? error.details : undefined,
                () =>
                    useBaseRequestHook.getState().onRequest(
                        request,
                        onSuccess,
                        onError,
                        checkToken,
                        useFullScreenError
                    )
            );

            onError?.(error instanceof Error ? error : new Error(message));
            throw error;
        } finally {
            set({ isLoading: false });
        }
    },
}));