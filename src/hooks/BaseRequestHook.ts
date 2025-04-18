import { create } from "zustand";
import { ApiErrorType, ApiException } from "../resource/app_exceptions";
import { useAuthStore } from "../stores/auth_store";
import { useErrorHandlerHook } from "./ErrorHandlerHook";
import NavigationHooks from "./NavigationHook";

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

const FULL_SCREEN_ERROR_TYPES: ApiErrorType[] = [
    ApiErrorType.NETWORK,
    ApiErrorType.TIMEOUT,
    ApiErrorType.NOT_FOUND,
    ApiErrorType.SERVER,
    ApiErrorType.UNKNOWN,
];

const errorMessages: Record<ApiErrorType, string> = {
    [ApiErrorType.NETWORK]: "Falha na conexão com a rede. Verifique sua internet.",
    [ApiErrorType.TIMEOUT]: "A requisição demorou muito para responder.",
    [ApiErrorType.UNAUTHORIZED]: "Sessão expirada. Faça login novamente.",
    [ApiErrorType.FORBIDDEN]: "Você não tem permissão para acessar este recurso.",
    [ApiErrorType.NOT_FOUND]: "O recurso solicitado não foi encontrado.",
    [ApiErrorType.VALIDATION]: "Os dados enviados contêm erros. Verifique e tente novamente.",
    [ApiErrorType.SERVER]: "Erro no servidor. Tente novamente mais tarde.",
    [ApiErrorType.UNKNOWN]: "Ocorreu um erro inesperado. Tente novamente.",
};

export const useBaseRequestHook = create<BaseRequestHook>((set) => ({
    isLoading: false,
    onRequest: async <R>(
        request: (token?: string) => Promise<R>,
        onSuccess?: (data: R) => void,
        onError?: (error: ApiException | Error) => void,
        checkToken: boolean = false,
        useFullScreenError: boolean = false
    ): Promise<R> => {
        const { token, clearToken } = useAuthStore.getState();
        const { setError, clearError } = useErrorHandlerHook.getState();

        clearError();

        if (checkToken && !token) {
            const message = "Sessão não autenticada. Faça login.";
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

        try {
            set({ isLoading: true });

            const response = await request(checkToken ? token : undefined);
            onSuccess?.(response);
            return response;
        } catch (error) {
            let errorType = ApiErrorType.UNKNOWN;
            let message = errorMessages[ApiErrorType.UNKNOWN];
            let status: number | undefined;
            let details: Record<string, unknown> | undefined;

            if (error instanceof ApiException) {
                errorType = error.type;
                status = error.status;
                if (error.details && typeof error.details === 'object' && !Array.isArray(error.details)) {
                    details = error.details as Record<string, unknown>;
                } else {
                    details = undefined;
                }
                message = error.message && error.message !== "Erro desconhecido"
                    ? error.message
                    : errorMessages[errorType] || message;
            } else if (error instanceof Error) {
                message = error.message || message;
                if (error.message.includes("network")) {
                    errorType = ApiErrorType.NETWORK;
                    message = errorMessages[ApiErrorType.NETWORK];
                } else if (error.message.includes("timeout")) {
                    errorType = ApiErrorType.TIMEOUT;
                    message = errorMessages[ApiErrorType.TIMEOUT];
                }
                details = undefined;
            }

            const shouldUseFullScreen =
                useFullScreenError || FULL_SCREEN_ERROR_TYPES.includes(errorType);

            if (errorType === ApiErrorType.UNAUTHORIZED) {
                clearToken();
                NavigationHooks().navigateToLogin();
            }

            setError(
                message,
                errorType,
                shouldUseFullScreen ? "fullScreen" : "snackbar",
                status,
                details,
                () =>
                    useBaseRequestHook.getState().onRequest(
                        request,
                        onSuccess,
                        onError,
                        checkToken,
                        useFullScreenError
                    )
            );


            const errorToThrow = error instanceof Error ? error : new Error(message);
            onError?.(errorToThrow);
            throw errorToThrow;
        } finally {
            set({ isLoading: false });
        }
    },
}));