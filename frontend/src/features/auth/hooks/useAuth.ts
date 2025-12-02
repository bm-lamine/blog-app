import type { User } from "@/features/auth/schema/auth";
import { createStore } from "zustand";
import { persist } from "zustand/middleware";

type AuthStore = {
  user: User | null;
  accessToken: string | null;
  setUser(user: User): void;
  setToken: (accessToken: string) => void;
  isAuth: () => boolean;
};

const authStore = createStore<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,

      setUser(user) {
        set({ user });
      },

      setToken(accessToken) {
        set({ accessToken });
      },

      isAuth() {
        return Boolean(get().accessToken && get().user);
      },
    }),
    { name: "auth_store" }
  )
);

export { authStore, type AuthStore };
