import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { router } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';


type AuthState = {
  token: string | null;
  loading: boolean;
  login: (token: string) => Promise<void>;
  logout: () => Promise<void>;
  loadToken: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  loading: true,

  login: async (token: string) => {
    if (!token) {
      console.warn("Login error: token is undefined");
      return;
    }

    set({ token });
    await AsyncStorage.setItem("token", token);
    router.replace("/(tabs)/profile");
  },

  logout: async () => {
    await AsyncStorage.removeItem("token");
    set({ token: null });
    router.replace("/login");
  },

  loadToken: async () => {
    const saved = await AsyncStorage.getItem("token");
    set({ token: saved, loading: false });
  },
}));

interface Bear {
  id: number;
  name: string;
}

interface BearStore {
  bears: Bear[];
  count: number;

  addBear: (name: string) => void;
  removeBear: (id: number) => void;
  clearBears: () => void;
  increasePopulation: () => void;
  loadFromStorage: () => Promise<void>;
}

export const useBearStore = create<BearStore>()(
  persist(
    (set, get) => ({
      bears: [],
      count: 0,

      addBear: (name) =>
        set((state) => ({
          bears: [...state.bears, { id: Date.now(), name }],
          count: state.count + 1,
        })),

      removeBear: (id) =>
        set((state) => ({
          bears: state.bears.filter((bear) => bear.id !== id),
          count: state.count - 1,
        })),

      clearBears: () => set({ bears: [], count: 0 }),

      increasePopulation: () => set((state) => ({ count: state.count + 1 })),

      loadFromStorage: async () => {
      },
    }),
    {
      name: 'bears-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);