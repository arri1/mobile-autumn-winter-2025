import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';

// Types
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  register: (userData: RegisterData) => Promise<void>;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
  loadUser: () => Promise<void>;
  clearError: () => void;
  getUsers: (params?: { page?: number; limit?: number; role?: string }) => Promise<any>;
}

const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  // Регистрация
  register: async (userData: RegisterData) => {
    set({ isLoading: true, error: null });

    try {
      const response = await api.register(userData);

      if (response.success) {
        // Сохраняем токены в AsyncStorage
        await AsyncStorage.setItem('accessToken', response.data.accessToken);
        await AsyncStorage.setItem('refreshToken', response.data.refreshToken);

        set({
          user: response.data.user,
          accessToken: response.data.accessToken,
          refreshToken: response.data.refreshToken,
          isAuthenticated: true,
          isLoading: false,
          error: null
        });
      } else {
        throw new Error(response.message || 'Ошибка регистрации');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Ошибка регистрации';
      set({
        isLoading: false,
        error: errorMessage,
        isAuthenticated: false
      });
      throw error;
    }
  },

  // Вход в систему
  login: async (credentials: LoginCredentials) => {
    set({ isLoading: true, error: null });

    try {
      const response = await api.login(credentials);

      if (response.success) {
        // Сохраняем токены в AsyncStorage
        await AsyncStorage.setItem('accessToken', response.data.accessToken);
        await AsyncStorage.setItem('refreshToken', response.data.refreshToken);

        set({
          user: response.data.user,
          accessToken: response.data.accessToken,
          refreshToken: response.data.refreshToken,
          isAuthenticated: true,
          isLoading: false,
          error: null
        });
      } else {
        throw new Error(response.message || 'Ошибка входа');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Ошибка входа';
      set({
        isLoading: false,
        error: errorMessage,
        isAuthenticated: false
      });
      throw error;
    }
  },

  // Выход из системы
  logout: async () => {
    const { accessToken } = get();

    try {
      if (accessToken) {
        await api.logout(accessToken);
      }
    } catch (error) {
      console.error('Ошибка при выходе:', error);
    } finally {
      // Удаляем токены из AsyncStorage
      await AsyncStorage.multiRemove(['accessToken', 'refreshToken']);

      set({
        user: null,
        accessToken: null,
        refreshToken: null,
        isAuthenticated: false,
        error: null
      });
    }
  },

  // Загрузка пользователя (при запуске приложения)
  loadUser: async () => {
    set({ isLoading: true });

    try {
      const accessToken = await AsyncStorage.getItem('accessToken');

      if (accessToken) {
        const response = await api.getProfile(accessToken);

        if (response.success) {
          set({
            user: response.data,
            accessToken,
            isAuthenticated: true,
            isLoading: false,
            error: null
          });
        } else {
          throw new Error('Не удалось загрузить профиль');
        }
      } else {
        set({ isLoading: false });
      }
    } catch (error) {
      console.error('Ошибка загрузки пользователя:', error);

      // Если не удалось загрузить пользователя - очищаем токены
      await AsyncStorage.multiRemove(['accessToken', 'refreshToken']);

      set({
        user: null,
        accessToken: null,
        refreshToken: null,
        isAuthenticated: false,
        isLoading: false,
        error: null
      });
    }
  },

  // Очистка ошибки
  clearError: () => {
    set({ error: null });
  },

  // Получение списка пользователей (для админа)
  getUsers: async (params?: { page?: number; limit?: number; role?: string }) => {
    const { accessToken } = get();

    if (!accessToken) {
      throw new Error('Необходима авторизация');
    }

    try {
      const response = await api.getUsers(accessToken, params);
      return response;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Ошибка загрузки пользователей';
      set({ error: errorMessage });
      throw error;
    }
  }
}));

export default useAuthStore;
