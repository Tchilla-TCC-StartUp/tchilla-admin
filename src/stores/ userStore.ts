import { create } from "zustand";
import { UserInterface } from "../interfaces/UserInterface";

interface UserStore {
  user: UserInterface | null;
  setUser: (user: UserInterface) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));
