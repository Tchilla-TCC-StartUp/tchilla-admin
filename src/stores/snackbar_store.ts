import { create } from "zustand";

type SnackbarType = "info" | "success" | "warning" | "error";

interface SnackbarState {
    isVisible: boolean;
    message: string;
    type: SnackbarType;
    showSnackbar: (message: string, type?: SnackbarType, duration?: number) => void;
    hideSnackbar: () => void;
}

export const useSnackbarStore = create<SnackbarState>((set) => ({
    isVisible: false,
    message: "",
    type: "info",

    showSnackbar: (message, type = "info", duration = 3000) => {
        set({ isVisible: true, message, type });
        setTimeout(() => set({ isVisible: false }), duration);
    },

    hideSnackbar: () => set({ isVisible: false }),
}));
