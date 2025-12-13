import { create } from 'zustand'

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  
  register: (name, password) => set(() => ({ user: { name }, isAuthenticated: true })),
  login: (name, password) => set(() => ({ user: { name }, isAuthenticated: true })),
  logout: () => set(() => ({ user: null, isAuthenticated: false })),
}))
