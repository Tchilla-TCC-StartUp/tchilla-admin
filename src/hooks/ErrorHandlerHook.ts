import { create } from "zustand";
import { ApiErrorType, ApiException } from "../resource/app_exceptions";
import { useSnackbarStore } from "../stores/snackbar_store";

type ErrorScreenType = "snackbar" | "fullScreen";

interface ErrorHandlerState {
    isError: boolean;
    errorMessage: string;
    errorType?: ApiErrorType;
    errorStatus?: number;
    errorDetails?: Record<string, unknown>;
    screenType: ErrorScreenType;
    lastRequestCallback?: () => Promise<unknown>;
    setError: (
        message: string,
        type: ApiErrorType,
        screenType?: ErrorScreenType,
        status?: number,
        details?: Record<string, unknown>,
        lastRequestCallback?: () => Promise<unknown>
    ) => void;
    clearError: () => void;
    retryLastRequest: () => Promise<unknown> | void;
}

export const useErrorHandlerHook = create<ErrorHandlerState>((set, get) => ({
    isError: false,
    errorMessage: "",
    errorType: undefined,
    errorStatus: undefined,
    errorDetails: undefined,
    screenType: "snackbar",
    lastRequestCallback: undefined,

    setError: (
        message: string,
        type: ApiErrorType,
        screenType: ErrorScreenType = "snackbar",
        status?: number,
        details?: Record<string, unknown>,
        lastRequestCallback?: () => Promise<unknown>
    ) => {
        if (!message) {
            console.warn("Tentativa de definir erro com mensagem vazia.");
            return;
        }

        set({
            isError: true,
            errorMessage: message,
            errorType: type,
            errorStatus: status,
            errorDetails: details,
            screenType,
            lastRequestCallback,
        });

        if (screenType === "snackbar") {
            useSnackbarStore.getState().showSnackbar(message, "error", 3000);
        }
    },

    clearError: () => {
        set({
            isError: false,
            errorMessage: "",
            errorType: undefined,
            errorStatus: undefined,
            errorDetails: undefined,
            screenType: "snackbar",
            lastRequestCallback: undefined,
        });
    },

    retryLastRequest: async () => {
        const { lastRequestCallback, clearError } = get();

        if (!lastRequestCallback) {
            set({
                isError: true,
                errorMessage: "Nenhuma requisição anterior para tentar novamente.",
                errorType: ApiErrorType.UNKNOWN,
                screenType: "snackbar",
            });
            useSnackbarStore.getState().showSnackbar(
                "Nenhuma requisição anterior para tentar novamente.",
                "error",
                3000
            );
            return;
        }

        try {
            clearError();
            const result = await lastRequestCallback();
            return result;
        } catch (error) {
            const isApiException = error instanceof ApiException;
            const errorType = isApiException ? error.type : ApiErrorType.UNKNOWN;
            const message = isApiException
                ? error.message || "Erro ao tentar novamente"
                : error instanceof Error
                    ? error.message || "Erro desconhecido"
                    : "Erro desconhecido";

            set({
                isError: true,
                errorMessage: message,
                errorType,
                errorStatus: isApiException ? error.status : undefined,
                errorDetails: isApiException ? error.details : undefined,
                screenType: "snackbar",
            });

            useSnackbarStore.getState().showSnackbar(message, "error", 3000);
        }
    },
}));