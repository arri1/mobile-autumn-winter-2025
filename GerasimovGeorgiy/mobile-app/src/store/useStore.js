import { create } from 'zustand';

// Shared Zustand store
export const useStore = create((set) => ({
  // Counter state
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),

  // User state
  name: '',
  setName: (name) => set({ name }),

  // Theme state
  theme: 'dark',
  toggleTheme: () => set((state) => ({ theme: state.theme === 'dark' ? 'light' : 'dark' })),

  // Toggle state
  enabled: false,
  setEnabled: (enabled) => set({ enabled }),

  // Additional state for useState lab
  inputValue: '',
  setInputValue: (value) => set({ inputValue: value }),
}));
