import { create } from 'zustand';

interface UiState {
  message: string;
  counter: number;
  setMessage: (value: string) => void;
  increment: () => void;
  reset: () => void;
}

export const useUiStore = create<UiState>((set) => ({
  message: 'Привет из Zustand!',
  counter: 0,
  setMessage: (value) => set({ message: value }),
  increment: () => set((state) => ({ counter: state.counter + 1 })),
  reset: () => set({ message: 'Привет из Zustand!', counter: 0 }),
}));


