import { authApi } from "@/api/auth/authApi";
import { tokenStorage } from "@/storage/tokenStorage";
import { create } from "zustand";

const KEY_ACCESS = "accessToken";
const KEY_REFRESH = "refreshToken";

export const useAuthStore = create((set, get) => ({
  accessToken: "",
  refreshToken: "",
  user: null,

  isReady: false,
  isLoading: false,
  error: "",

  hydrate: async () => {
    const accessToken = await tokenStorage.get(KEY_ACCESS);
    const refreshToken = await tokenStorage.get(KEY_REFRESH);
    set({ accessToken, refreshToken, isReady: true });

    if (accessToken) {
      try {
        const res = await authApi.profile();
        set({ user: res?.data?.user ?? null });
      } catch {
      }
    }
  },

  login: async ({ email, password }) => {
    set({ isLoading: true, error: "" });
    try {
      const res = await authApi.login({ email, password });
      const { user, accessToken, refreshToken } = res.data;

      await tokenStorage.set(KEY_ACCESS, accessToken);
      await tokenStorage.set(KEY_REFRESH, refreshToken);

      set({ user, accessToken, refreshToken, isLoading: false });
    } catch (e) {
      set({ error: e.message || "Ошибка входа", isLoading: false });
    }
  },

  register: async ({ name, email, password }) => {
    set({ isLoading: true, error: "" });
    try {
      const res = await authApi.register({ name, email, password });
      const { user, accessToken, refreshToken } = res.data;

      await tokenStorage.set(KEY_ACCESS, accessToken);
      await tokenStorage.set(KEY_REFRESH, refreshToken);

      set({ user, accessToken, refreshToken, isLoading: false });
    } catch (e) {
      set({ error: e.message || "Ошибка регистрации", isLoading: false });
    }
  },

  refreshAccessToken: async () => {
    const rt = get().refreshToken;
    if (!rt) throw new Error("Нет refreshToken");

    const res = await authApi.refresh(rt);
    const { accessToken, refreshToken } = res.data;

    await tokenStorage.set(KEY_ACCESS, accessToken);
    await tokenStorage.set(KEY_REFRESH, refreshToken);

    set({ accessToken, refreshToken });
    return accessToken;
  },

  loadProfile: async () => {
    const at = get().accessToken;
    if (!at) throw new Error("Нет accessToken");

    try {
      const res = await authApi.profile(at);
      set({ user: res?.data?.user ?? null });
    } catch (e) {
      if (e.status === 401 && get().refreshToken) {
        const newAt = await get().refreshAccessToken();
        const res2 = await authApi.profile(newAt);
        set({ user: res2?.data || null });
        return;
      }
      throw e;
    }
  },

  logout: async () => {
    const rt = get().refreshToken;
    try {
      if (rt) await authApi.logout(rt);
    } catch {
    }

    await tokenStorage.remove(KEY_ACCESS);
    await tokenStorage.remove(KEY_REFRESH);

    set({ accessToken: "", refreshToken: "", user: null });
  },
}));
