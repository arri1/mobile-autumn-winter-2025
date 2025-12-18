import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiService, { User, LoginCredentials, RegisterData } from '../service/api';

// ============================================
// ТИПЫ
// ============================================

/** Состояние авторизации */
interface AuthState {
  // ========== СОСТОЯНИЕ ==========
  
  /** Текущий пользователь */
  user: User | null;
  
  /** Флаг авторизации */
  isAuthenticated: boolean;
  
  /** Флаг загрузки */
  isLoading: boolean;
  
  /** Ошибка */
  error: string | null;
  
  /** Токен доступа */
  accessToken: string | null;
  
  // ========== ДЕЙСТВИЯ ==========
  
  /**
   * Вход пользователя
   * @param credentials - Учетные данные
   */
  login: (credentials: LoginCredentials) => Promise<void>;
  
  /**
   * Регистрация пользователя
   * @param userData - Данные пользователя
   */
  register: (userData: RegisterData) => Promise<void>;
  
  /**
   * Выход пользователя
   */
  logout: () => Promise<void>;
  
  /**
   * Проверка токена и восстановление сессии
   */
  checkAuth: () => Promise<void>;
  
  /**
   * Очистка ошибки
   */
  clearError: () => void;
}

// ============================================
// КОНСТАНТЫ
// ============================================

/** Ключи для AsyncStorage */
const STORAGE_KEYS = {
  ACCESS_TOKEN: 'accessToken',
  REFRESH_TOKEN: 'refreshToken',
  USER: 'user',
} as const;

// ============================================
// STORE
// ============================================

/**
 * Store для управления авторизацией
 * 
 * Функционал:
 * - Вход и регистрация
 * - Сохранение токенов
 * - Автоматическая проверка авторизации
 * - Выход из системы
 */
export const useAuthStore = create<AuthState>((set, get) => ({
  // ========== НАЧАЛЬНОЕ СОСТОЯНИЕ ==========
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  accessToken: null,

  // ========== ДЕЙСТВИЯ ==========

  /**
   * Вход пользователя
   */
  login: async (credentials: LoginCredentials) => {
    set({ isLoading: true, error: null });

    try {
      // Отправляем запрос на вход
      const response = await apiService.login(credentials);

      if (response.success && response.data) {
        const { user, accessToken, refreshToken } = response.data;

        // Сохраняем токены в AsyncStorage
        await AsyncStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, accessToken);
        await AsyncStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
        await AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));

        // Обновляем состояние
        set({
          user,
          accessToken,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });
      } else {
        throw new Error(response.message || 'Ошибка входа');
      }
    } catch (error: any) {
      set({
        error: error.message || 'Не удалось войти',
        isLoading: false,
      });
      throw error;
    }
  },

  /**
   * Регистрация пользователя
   */
  register: async (userData: RegisterData) => {
    set({ isLoading: true, error: null });

    try {
      // Отправляем запрос на регистрацию
      const response = await apiService.register(userData);

      if (response.success && response.data) {
        const { user, accessToken, refreshToken } = response.data;

        // Сохраняем токены в AsyncStorage
        await AsyncStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, accessToken);
        await AsyncStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
        await AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));

        // Обновляем состояние
        set({
          user,
          accessToken,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });
      } else {
        throw new Error(response.message || 'Ошибка регистрации');
      }
    } catch (error: any) {
      set({
        error: error.message || 'Не удалось зарегистрироваться',
        isLoading: false,
      });
      throw error;
    }
  },

  /**
   * Выход пользователя
   */
  logout: async () => {
    const { accessToken } = get();

    try {
      // Отправляем запрос на выход (если есть токен)
      if (accessToken) {
        await apiService.logout(accessToken);
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Очищаем AsyncStorage
      await AsyncStorage.multiRemove([
        STORAGE_KEYS.ACCESS_TOKEN,
        STORAGE_KEYS.REFRESH_TOKEN,
        STORAGE_KEYS.USER,
      ]);

      // Сбрасываем состояние
      set({
        user: null,
        accessToken: null,
        isAuthenticated: false,
        error: null,
      });
    }
  },

  /**
   * Проверка авторизации при запуске приложения
   */
  checkAuth: async () => {
    set({ isLoading: true });

    try {
      // Получаем токен из AsyncStorage
      const accessToken = await AsyncStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
      const userJson = await AsyncStorage.getItem(STORAGE_KEYS.USER);

      if (accessToken && userJson) {
        const user = JSON.parse(userJson);

        // Проверяем токен на сервере
        try {
          const profileResponse = await apiService.getProfile(accessToken);
          
          if (profileResponse.success && profileResponse.data) {
            // Токен валиден
            set({
              user: profileResponse.data,
              accessToken,
              isAuthenticated: true,
              isLoading: false,
            });
            return;
          }
        } catch (error) {
          // Токен невалиден - очищаем
          await AsyncStorage.multiRemove([
            STORAGE_KEYS.ACCESS_TOKEN,
            STORAGE_KEYS.REFRESH_TOKEN,
            STORAGE_KEYS.USER,
          ]);
        }
      }

      // Нет токена или он невалиден
      set({
        user: null,
        accessToken: null,
        isAuthenticated: false,
        isLoading: false,
      });
    } catch (error) {
      console.error('Check auth error:', error);
      set({
        user: null,
        accessToken: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  },

  /**
   * Очистка ошибки
   */
  clearError: () => {
    set({ error: null });
  },
}));

export default useAuthStore;