import { create } from 'zustand';

type Theme = 'light' | 'dark';

type AppState = {
  // Состояние
  theme: Theme;
  userName: string;
  counters: {
    useState: number;
    useEffect: number;
    useMemo: number;
  };
  
  // Действия
  toggleTheme: () => void;
  setUserName: (name: string) => void;
  incrementCounter: (hookName: keyof AppState['counters']) => void;
  resetCounters: () => void;
};

export const useAppStore = create<AppState>((set) => ({
  // Начальное состояние
  theme: 'light',
  userName: 'React Student',
  counters: {
    useState: 0,
    useEffect: 0,
    useMemo: 0,
  },

  toggleTheme: () => set((state) => ({ 
    theme: state.theme === 'light' ? 'dark' : 'light'
  })),

  setUserName: (userName) => set({ userName }),

  incrementCounter: (hookName) => set((state) => ({
    counters: {
      ...state.counters,
      [hookName]: state.counters[hookName] + 1
    }
  })),

  resetCounters: () => set({
    counters: { useState: 0, useEffect: 0, useMemo: 0 }
  }),
}));