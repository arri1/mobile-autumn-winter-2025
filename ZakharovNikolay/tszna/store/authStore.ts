import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface User {
  id?: number;
  email: string;
  name?: string;
}

const TOKEN_KEY = '@auth_token';
const USER_KEY = '@auth_user';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  register: (email: string, password: string, name: string) => Promise<{ ok: boolean; error?: string }>;
  logout: () => Promise<void>;
  setAuthState: (state: { user: User | null; token: string | null; isAuthenticated: boolean }) => void;
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
      
      console.log('Login response data:', JSON.stringify(data, null, 2));

      const envelope = data?.data || data;
      const user = {
        id: envelope?.user?.id ?? data.user?.id,
        email: envelope?.user?.email ?? data.user?.email ?? email,
        name: envelope?.user?.name ?? data.user?.name,
      };
      const token = envelope?.accessToken
        ?? envelope?.token
        ?? data.accessToken
        ?? data.token
        ?? data.access_token
        ?? null;

      console.log('Extracted token:', token ? 'Token exists' : 'No token');
      console.log('User data:', user);

      // Сохраняем в AsyncStorage
      if (token) {
        await AsyncStorage.setItem(TOKEN_KEY, token);
        await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
        console.log('Token saved to AsyncStorage');
      } else {
        console.error('No token to save!');
      }

      set({
        user,
        token,
        isAuthenticated: true,
      });
      
      console.log('Auth state updated in store');

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
      
      console.log('Register response data:', JSON.stringify(data, null, 2));

      const envelope = data?.data || data;
      const user = {
        id: envelope?.user?.id ?? data.user?.id,
        email: envelope?.user?.email ?? data.user?.email ?? email,
        name: envelope?.user?.name ?? data.user?.name ?? name,
      };
      const token = envelope?.accessToken
        ?? envelope?.token
        ?? data.accessToken
        ?? data.token
        ?? data.access_token
        ?? null;

      console.log('Extracted token:', token ? 'Token exists' : 'No token');
      console.log('User data:', user);

      // Сохраняем в AsyncStorage
      if (token) {
        await AsyncStorage.setItem(TOKEN_KEY, token);
        await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
        console.log('Token saved to AsyncStorage');
      } else {
        console.error('No token to save!');
      }

      set({
        user,
        token,
        isAuthenticated: true,
      });
      
      console.log('Auth state updated in store');

      return { ok: true };
    } catch (error) {
      console.error('Register error:', error);
      return { ok: false, error: 'Сетевая ошибка при регистрации' };
    }
  },
  
  logout: async () => {
    // Очищаем AsyncStorage
    await AsyncStorage.multiRemove([TOKEN_KEY, USER_KEY]);
    
    set({ 
      user: null,
      token: null,
      isAuthenticated: false,
    });
  },
  
  setAuthState: (state: { user: User | null; token: string | null; isAuthenticated: boolean }) => {
    set(state);
  },
}));


