import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'https://cloud.kit-imi.info/api';
const ACCESS_TOKEN_KEY = '@accessToken';
const REFRESH_TOKEN_KEY = '@refreshToken';
const USER_DATA_KEY = '@userData';

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

interface AuthState {
  currentUser: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  getProfile: () => Promise<boolean>;
  getUsers: () => Promise<User[]>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  refreshToken: () => Promise<boolean>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  currentUser: null,
  isAuthenticated: false,
  isLoading: false,

  checkAuth: async () => {
    set({ isLoading: true });
    try {
      const token = await AsyncStorage.getItem(ACCESS_TOKEN_KEY);
      const userData = await AsyncStorage.getItem(USER_DATA_KEY);

      if (token && userData) {
        set({
          currentUser: JSON.parse(userData),
          isAuthenticated: true,
        });

        await get().getProfile();
      }
    } catch (err) {
      console.error('Ошибка проверки авторизации:', err);
    }
  },

  login: async (email: string, password: string) => {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        await AsyncStorage.setItem(ACCESS_TOKEN_KEY, data.data.accessToken);
        await AsyncStorage.setItem(REFRESH_TOKEN_KEY, data.data.refreshToken);
        await AsyncStorage.setItem(USER_DATA_KEY, JSON.stringify(data.data.user));
        set({ currentUser: data.data.user, isAuthenticated: true, isLoading: false });
        return true;
      } else {
        set({ isLoading: false });
        console.error('Ошибка с сервера:', data.message);
        return false;
      }
    } catch (err) {
      console.error('Ошибка входа:', err);
      set({ isLoading: false });
      return false;
    }
  },

  register: async (name: string, email: string, password: string) => {
    try {
      set({ isLoading: true});
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
          await AsyncStorage.setItem(ACCESS_TOKEN_KEY, data.data.accessToken);
          await AsyncStorage.setItem(REFRESH_TOKEN_KEY, data.data.refreshToken);
          await AsyncStorage.setItem(USER_DATA_KEY, JSON.stringify(data.data.user));
          set({
              currentUser: data.data.user,
              isAuthenticated: true,
              isLoading: false
          });
          return true;
      } else {
          set({isLoading: false});
          console.error("Ошибка с сервера:", data.message);
          return false;
      }
    } catch (error) {
      console.error("Ошибка регистрации:", error);
      return false;
    }
  },

  getProfile: async () => {
    try {
      const token = await AsyncStorage.getItem(ACCESS_TOKEN_KEY);

      let response = await fetch(`${API_URL}/auth/profile`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 401) {
        const refreshed = await get().refreshToken();
        if (refreshed) {
          const newToken = await AsyncStorage.getItem(ACCESS_TOKEN_KEY);
          response = await fetch(`${API_URL}/auth/profile`, {
            method: "GET",
            headers: { Authorization: `Bearer ${newToken}` },
          });
        } else {
          await get().logout();
          return false;
        }
      }

      const data = await response.json();

      if (response.ok) {
        const user = data.data.user;
        await AsyncStorage.setItem(USER_DATA_KEY, JSON.stringify(user));
        set({ currentUser: user });
        return true;
      }
      return false;
    } catch (err) {
      console.error('getProfile error:', err);
      return false;
    }
  },

  getUsers: async () => {
    try {
      const token = await AsyncStorage.getItem(ACCESS_TOKEN_KEY);

      const url = `${API_URL}/auth/users?page=1&limit=100`;
      let response = await fetch(url, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 401) {
        const refreshed = await get().refreshToken();
        if (refreshed) {
          const newToken = await AsyncStorage.getItem(ACCESS_TOKEN_KEY);
          response = await fetch(url, {
            headers: { Authorization: `Bearer ${newToken}` },
          });
        } else {
          await get().logout();
          return null;
        }
      }

      const data = await response.json();
      if (response.ok && data.success) {
        return data.data.users;
      }
      return null;
    } catch (err) {
      console.error('getUsers error:', err);
      return null;
    }
  },

  refreshToken: async () => {
    try {
      const refreshToken = await AsyncStorage.getItem(REFRESH_TOKEN_KEY);

      const response = await fetch(`${API_URL}/auth/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken }),
      });

      const data = await response.json();

      if (response.ok) {
        await AsyncStorage.setItem(ACCESS_TOKEN_KEY, data.data.accessToken);
        await AsyncStorage.setItem(REFRESH_TOKEN_KEY, data.data.refreshToken);
        return true;
      }
      return false;
    } catch (err) {
      console.error('Refresh token error:', err);
      return false;
    }
  },

  logout: async () => {
    try {
      const refreshToken = await AsyncStorage.getItem(REFRESH_TOKEN_KEY);

      await fetch(`${API_URL}/auth/logout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken }),
      });

      await AsyncStorage.multiRemove([
        ACCESS_TOKEN_KEY,
        REFRESH_TOKEN_KEY,
        USER_DATA_KEY,
      ]);

      set({ currentUser: null, isAuthenticated: false, isLoading: false });
    } catch (err) {
      console.error('Logout error:', err);
    }
  },
}));