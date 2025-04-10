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
        message,
        type,
        screenType = "snackbar",
        status,
        details,
        lastRequestCallback
    ) => {
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

    clearError: () =>
        set({
            isError: false,
            errorMessage: "",
            errorType: undefined,
            errorStatus: undefined,
            errorDetails: undefined,
            screenType: "snackbar",
            lastRequestCallback: undefined,
        }),

    retryLastRequest: async () => {
        const { lastRequestCallback, clearError } = get();
        if (!lastRequestCallback) {
            set({
                errorMessage: "Nenhuma requisição anterior para tentar novamente.",
            });
            return;
        }

        try {
            const result = await lastRequestCallback();
            clearError();
            return result;
        } catch (error) {
            const message =
                error instanceof Error ? error.message : "Erro ao tentar novamente";
            set({
                errorMessage: message,
                errorType: error instanceof ApiException ? error.type : ApiErrorType.UNKNOWN,
            });
        }
    },
}));