import { create } from 'zustand';

type Theme = 'light' | 'dark';

type HookCounters = {
  useState: number;
  useEffect: number;
  useMemo: number;
};

type AppState = {
  theme: Theme;
  userName: string;
  counters: HookCounters;toggleTheme: () => void;
  
  /**
   * @param name 
   */
  setUserName: (name: string) => void;
  
  /**
   * @param hookName
   */

  incrementCounter: (hookName: keyof HookCounters) => void;
  
  resetCounters: () => void;
};

const INITIAL_STATE = {
  theme: 'light' as Theme,
  userName: 'React Student',
  counters: {
    useState: 0,
    useEffect: 0,
    useMemo: 0,
  },
};

export const useAppStore = create<AppState>((set) => ({
  ...INITIAL_STATE,

  toggleTheme: () =>
    set((state) => ({
      theme: state.theme === 'light' ? 'dark' : 'light',
    })),

  setUserName: (userName) => set({ userName }),

  incrementCounter: (hookName) =>
    set((state) => ({
      counters: {
        ...state.counters,
        [hookName]: state.counters[hookName] + 1,
      },
    })),

  resetCounters: () =>
    set({
      counters: { ...INITIAL_STATE.counters },
    }),
}));