import { create } from "zustand"

interface BaseEventHook {
    isLoading: boolean,
    onEvent: (event: () => Promise<void>) => Promise<void>
}


export const useBaseEventHook = create<BaseEventHook>((set) => ({
    isLoading: false,
    onEvent: async (event) => {
        set({ isLoading: true });
        try {
            await event();
        } finally {
            set({ isLoading: false })
        }
    },
}))