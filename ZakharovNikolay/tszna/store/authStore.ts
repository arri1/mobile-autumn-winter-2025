import { create } from 'zustand';

interface User {
  email: string;
  name?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  
  login: async (email: string, password: string) => {
    // Имитация проверки логина
    if (email && password.length >= 6) {
      set({ 
        user: { email },
        isAuthenticated: true 
      });
      return true;
    }
    return false;
  },
  
  register: async (email: string, password: string, name: string) => {
    // Имитация регистрации
    if (email && password.length >= 6 && name) {
      set({ 
        user: { email, name },
        isAuthenticated: true 
      });
      return true;
    }
    return false;
  },
  
  logout: () => {
    set({ 
      user: null,
      isAuthenticated: false 
    });
  },
}));


