import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

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