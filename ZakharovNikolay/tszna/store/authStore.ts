import { create } from 'zustand';

interface User {
  email: string;
  name?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  register: (email: string, password: string, name: string) => Promise<{ ok: boolean; error?: string }>;
  logout: () => void;
}

// Базовый URL бекенда. По документации swagger, чаще всего это что‑то вроде
// https://cloud.kit-imi.info/api или https://cloud.kit-imi.info/api/v1
// При необходимости обновите строку ниже под точный basePath из /api-docs.
const API_BASE_URL = 'https://cloud.kit-imi.info/api';

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  
  login: async (email: string, password: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const text = await response.text().catch(() => '');
        console.log('Login failed:', response.status, text);
        return { ok: false, error: text || `Ошибка входа (${response.status})` };
      }

      const data: any = await response.json();

      set({
        user: {
          email: data.user?.email ?? email,
          name: data.user?.name,
        },
        token: data.token ?? data.accessToken ?? null,
        isAuthenticated: true,
      });

      return { ok: true };
    } catch (error) {
      console.error('Login error:', error);
      return { ok: false, error: 'Сетевая ошибка при входе' };
    }
  },
  
  register: async (email: string, password: string, name: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({ email, password, name }),
      });

      if (!response.ok) {
        const text = await response.text().catch(() => '');
        console.log('Register failed:', response.status, text);
        return { ok: false, error: text || `Ошибка регистрации (${response.status})` };
      }

      const data: any = await response.json();

      set({
        user: {
          email: data.user?.email ?? email,
          name: data.user?.name ?? name,
        },
        token: data.token ?? data.accessToken ?? null,
        isAuthenticated: true,
      });

      return { ok: true };
    } catch (error) {
      console.error('Register error:', error);
      return { ok: false, error: 'Сетевая ошибка при регистрации' };
    }
  },
  
  logout: () => {
    set({ 
      user: null,
      token: null,
      isAuthenticated: false,
    });
  },
}));


