import create from 'zustand';

type User = {
  email: string;
};

export type AuthState = {
  user: User | null;
  login: (email: string, password: string) => void;
  register: (email: string, password: string) => void;
  logout: () => void;
};

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  login: (email) => set({ user: { email } }),
  register: (email) => set({ user: { email } }),
  logout: () => set({ user: null }),
}));

export default useAuthStore;
