import { create } from "zustand";
import { ApiErrorType, ApiException } from "../resource/app_exceptions";
import { useSnackbarStore } from "../stores/snackbar_store";

interface BaseRequestHook {
    isLoading: boolean;
    isError: boolean;
    errorMessage: string;
    errorDetails?: Record<string, unknown>;
    errorStatus?: number;
    errorType?: ApiErrorType;
    onRequest: <R>(
        request: () => Promise<R>,
        onSuccess?: (data: R) => void,
        onError?: (error: ApiException | Error) => void
    ) => Promise<R>;
}

export const useBaseRequestHook = create<BaseRequestHook>(() => ({
    isLoading: false,
    isError: false,
    errorMessage: "",
    errorDetails: undefined,
    errorStatus: undefined,
    errorType: undefined,

    onRequest: async <R>(
        request: () => Promise<R>,
        onSuccess?: (data: R) => void,
        onError?: (error: ApiException | Error) => void
    ): Promise<R> => {
        try {
            useBaseRequestHook.setState({
                isLoading: true,
                isError: false,
                errorMessage: "",
                errorDetails: undefined,
                errorStatus: undefined,
                errorType: undefined,
            });

            const response = await request();
            onSuccess?.(response);
            return response;
        } catch (error) {
            const { showSnackbar } = useSnackbarStore.getState();

            if (error instanceof ApiException) {
                useBaseRequestHook.setState({
                    isError: true,
                    errorMessage: error.message,
                    errorDetails: error.details,
                    errorStatus: error.status,
                    errorType: error.type,
                });

                onError?.(error);

                // Mapeando mensagens de erro
                const errorMessages: Record<ApiErrorType, string> = {
                    [ApiErrorType.NETWORK]: error.message,
                    [ApiErrorType.TIMEOUT]: error.message,
                    [ApiErrorType.UNAUTHORIZED]: error.message,
                    [ApiErrorType.FORBIDDEN]: error.message,
                    [ApiErrorType.NOT_FOUND]: error.message,
                    [ApiErrorType.VALIDATION]: error.message,
                    [ApiErrorType.SERVER]: error.message,
                    [ApiErrorType.UNKNOWN]: "Ocorreu um erro inesperado.",
                };

                showSnackbar(errorMessages[error.type] ?? "Erro desconhecido.", "error");
            } else {
                const genericError = error instanceof Error ? error.message : "Erro desconhecido";
                useBaseRequestHook.setState({
                    isError: true,
                    errorMessage: genericError,
                    errorType: ApiErrorType.UNKNOWN,
                });

                onError?.(error instanceof Error ? error : new Error("Erro desconhecido"));

                showSnackbar("Erro desconhecido ocorrido.", "error");
            }

            throw error;
        } finally {
            useBaseRequestHook.setState({ isLoading: false });
        }
    },
}));
