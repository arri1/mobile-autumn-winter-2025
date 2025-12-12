import { create } from 'zustand';

type Item = {
  id: string;
  text: string;
};

type ExampleState = {
  items: Item[];
  addItem: (text: string) => void;
  clearAll: () => void;
};

export const useExampleStore = create<ExampleState>((set) => ({
  items: [],
  addItem: (text) =>
    set((state) => ({
      items: [
        ...state.items,
        {
          id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
          text,
        },
      ],
    })),
  clearAll: () => set({ items: [] }),
}));

