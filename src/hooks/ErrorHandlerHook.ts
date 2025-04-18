import { create } from "zustand";
import { ApiErrorType, ApiException } from "../resource/app_exceptions";
import { useSnackbarStore } from "../stores/snackbar_store";

type ErrorScreenType = "snackbar" | "fullScreen";

interface ErrorHandlerState {
  isError: boolean;
  isRetrying: boolean;
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
  isRetrying: false,
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
      isRetrying: false,
      errorMessage: "",
      errorType: undefined,
      errorStatus: undefined,
      errorDetails: undefined,
      screenType: "snackbar",
      lastRequestCallback: undefined,
    });
  },

  retryLastRequest: async () => {
    const { lastRequestCallback, clearError, isRetrying } = get();

    if (isRetrying) return;

    if (!lastRequestCallback) {
      set({
        isError: true,
        errorMessage: "Nenhuma requisição anterior para tentar novamente.",
        errorType: ApiErrorType.UNKNOWN,
        screenType: "snackbar",
      });

      useSnackbarStore
        .getState()
        .showSnackbar(
          "Nenhuma requisição anterior para tentar novamente.",
          "error",
          3000
        );
      return;
    }

    set({ isRetrying: true });

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
        isRetrying: false,
        errorMessage: message,
        errorType,
        errorStatus: isApiException ? error.status : undefined,
        errorDetails: isApiException ? error.details : undefined,
        screenType: "fullScreen",
      });

      useSnackbarStore.getState().showSnackbar(message, "error", 3000);
    } finally {
      set({ isRetrying: false });
    }
  },
}));
