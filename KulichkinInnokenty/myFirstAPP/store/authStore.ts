import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';

// Типы для пользователя
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

// Интерфейс состояния store
interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  // Actions
  register: (userData: { name: string; email: string; password: string }) => Promise<void>;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
  loadUser: () => Promise<void>;
  clearError: () => void;
  getUsers: (params?: any) => Promise<any>;
}

// Создание Zustand store
const useAuthStore = create<AuthState>((set, get) => ({
  // Начальное состояние
  user: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  // Действие: регистрация
  register: async (userData) => {
    set({ isLoading: true, error: null });

    try {
      const response = await api.register(userData);

      if (response.success) {
        // После успешной регистрации сохраняем токены
        const { accessToken, refreshToken, user } = response.data;

        await AsyncStorage.setItem('accessToken', accessToken);
        await AsyncStorage.setItem('refreshToken', refreshToken);

        set({
          user,
          accessToken,
          refreshToken,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });
      } else {
        throw new Error(response.message || 'Ошибка регистрации');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Ошибка регистрации';
      set({
        isLoading: false,
        error: errorMessage,
      });
      throw error;
    }
  },

  // Действие: вход в систему
  login: async (credentials) => {
    set({ isLoading: true, error: null });

    try {
      const response = await api.login(credentials);

      if (response.success) {
        const { accessToken, refreshToken, user } = response.data;

        // Сохраняем токены в AsyncStorage
        await AsyncStorage.setItem('accessToken', accessToken);
        await AsyncStorage.setItem('refreshToken', refreshToken);

        set({
          user,
          accessToken,
          refreshToken,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });
      } else {
        throw new Error(response.message || 'Неверные учетные данные');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Ошибка входа';
      set({
        isLoading: false,
        error: errorMessage,
      });
      throw error;
    }
  },

  // Действие: выход из системы
  logout: async () => {
    set({ isLoading: true });

    try {
      const { accessToken } = get();
      if (accessToken) {
        await api.logout(accessToken);
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Очищаем токены из AsyncStorage
      await AsyncStorage.multiRemove(['accessToken', 'refreshToken']);

      set({
        user: null,
        accessToken: null,
        refreshToken: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      });
    }
  },

  // Действие: загрузить пользователя (при запуске приложения)
  loadUser: async () => {
    set({ isLoading: true });

    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      const refreshToken = await AsyncStorage.getItem('refreshToken');

      if (accessToken) {
        const response = await api.getProfile(accessToken);

        if (response.success) {
          set({
            user: response.data,
            accessToken,
            refreshToken,
            isAuthenticated: true,
            isLoading: false,
          });
        } else {
          throw new Error('Failed to load user');
        }
      } else {
        set({ isLoading: false });
      }
    } catch (error) {
      console.error('Load user error:', error);
      // Если токен невалиден, очищаем хранилище
      await AsyncStorage.multiRemove(['accessToken', 'refreshToken']);
      set({
        user: null,
        accessToken: null,
        refreshToken: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  },

  // Действие: очистка ошибки
  clearError: () => {
    set({ error: null });
  },

  // Действие: получить список пользователей (для админа)
  getUsers: async (params = {}) => {
    const { accessToken } = get();
    if (!accessToken) {
      throw new Error('Not authenticated');
    }

    try {
      const response = await api.getUsers(accessToken, params);
      return response;
    } catch (error) {
      throw error;
    }
  },
}));

export default useAuthStore;
