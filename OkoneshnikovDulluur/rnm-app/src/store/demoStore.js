import { create } from 'zustand';

function makeId() {
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export const useDemoStore = create((set) => ({
  count: 0,
  history: [],

  inc: () =>
    set((s) => ({
      count: s.count + 1,
      history: [{ id: makeId(), text: `+1 → ${s.count + 1}` }, ...s.history],
    })),

  dec: () =>
    set((s) => ({
      count: s.count - 1,
      history: [{ id: makeId(), text: `-1 → ${s.count - 1}` }, ...s.history],
    })),

  reset: () =>
    set(() => ({
      count: 0,
      history: [{ id: makeId(), text: `reset → 0` }],
    })),

  addMessage: (message) =>
    set((s) => {
      const m = String(message || '').trim();
      if (!m) return s;

      return {
        history: [{ id: makeId(), text: `msg: ${m}` }, ...s.history],
      };
    }),

  clearHistory: () => set(() => ({ history: [] })),
}));
