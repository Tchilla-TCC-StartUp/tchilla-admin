import { create } from "zustand";
import AppConstants from "../resource/app_constants";

interface AuthStore {
    token?: string;
    setToken: (token: string) => void;
    clearToken: () => void;
}

export const useAuthStore = create<AuthStore>((set) => {
    const storedToken = localStorage.getItem(AppConstants.keyToken);

    return {
        token: storedToken ?? undefined,
        setToken: (token: string) => {
            localStorage.setItem(AppConstants.keyToken, token);
            set({ token });
        },
        clearToken: () => {
            localStorage.removeItem(AppConstants.keyToken);
            set({ token: undefined });
        },
    };
});
