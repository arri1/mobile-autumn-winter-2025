import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = 'https://cloud.kit-imi.info/api';

export const useAuthStore = create((set, get) => ({
  // Состояние
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  accessToken: null,
  refreshToken: null,
  activeScreen: 'home',
  
  // Инициализация при запуске приложения
  initialize: async () => {
    try {
      const storedToken = await AsyncStorage.getItem('accessToken');
      const storedUser = await AsyncStorage.getItem('user');
      const storedScreen = await AsyncStorage.getItem('activeScreen') || 'home';
      
      if (storedToken && storedUser) {
        set({
          accessToken: storedToken,
          user: JSON.parse(storedUser),
          isAuthenticated: true,
          activeScreen: storedScreen,
        });
        
        // Проверяем актуальность токена
        await get().checkAuth();
      }
    } catch (error) {
      console.error('Ошибка инициализации:', error);
    }
  },
  
  // Регистрация
  register: async (username, password, email) => {
    set({ isLoading: true, error: null });
    
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
          email,
          name: username,
        }),
      });
      
      const data = await response.json();
      
      if (response.status === 201 || response.status === 200) {
        // Сохраняем данные
        await AsyncStorage.setItem('accessToken', data.data.accessToken);
        await AsyncStorage.setItem('refreshToken', data.data.refreshToken);
        await AsyncStorage.setItem('user', JSON.stringify(data.data.user));
        
        set({
          user: data.data.user,
          accessToken: data.data.accessToken,
          refreshToken: data.data.refreshToken,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });
        
        return { success: true, data: data.data };
      } else {
        set({
          error: data.message || 'Ошибка регистрации',
          isLoading: false,
        });
        return { success: false, error: data.message };
      }
    } catch (error) {
      set({
        error: error.message || 'Ошибка сети',
        isLoading: false,
      });
      return { success: false, error: error.message };
    }
  },
  
  // Вход
  login: async (username, password) => {
    set({ isLoading: true, error: null });
    
    try {
      // Определяем поле для логина (email или username)
      const loginField = username.includes('@') ? 'email' : 'username';
      
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          [loginField]: username,
          password,
        }),
      });
      
      const data = await response.json();
      
      if (response.status === 200) {
        await AsyncStorage.setItem('accessToken', data.data.accessToken);
        await AsyncStorage.setItem('refreshToken', data.data.refreshToken);
        await AsyncStorage.setItem('user', JSON.stringify(data.data.user));
        
        set({
          user: data.data.user,
          accessToken: data.data.accessToken,
          refreshToken: data.data.refreshToken,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });
        
        return { success: true, data: data.data };
      } else {
        set({
          error: data.message || 'Неверные учетные данные',
          isLoading: false,
        });
        return { success: false, error: data.message };
      }
    } catch (error) {
      set({
        error: error.message || 'Ошибка сети',
        isLoading: false,
      });
      return { success: false, error: error.message };
    }
  },
  
  // Обновление токенов
  refreshTokens: async () => {
    const { refreshToken } = get();
    
    if (!refreshToken) {
      return false;
    }
    
    try {
      const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken }),
      });
      
      const data = await response.json();
      
      if (response.status === 200) {
        await AsyncStorage.setItem('accessToken', data.data.accessToken);
        await AsyncStorage.setItem('refreshToken', data.data.refreshToken);
        
        set({
          accessToken: data.data.accessToken,
          refreshToken: data.data.refreshToken,
        });
        
        return true;
      } else {
        get().logout();
        return false;
      }
    } catch (error) {
      console.error('Ошибка обновления токенов:', error);
      return false;
    }
  },
  
  // Выход
  logout: async () => {
    const { refreshToken } = get();
    
    try {
      // Отправляем запрос на сервер для выхода
      if (refreshToken) {
        await fetch(`${API_BASE_URL}/auth/logout`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ refreshToken }),
        });
      }
    } catch (error) {
      console.error('Ошибка при выходе:', error);
    }
    
    // Очищаем локальное хранилище
    await AsyncStorage.multiRemove(['accessToken', 'refreshToken', 'user']);
    
    set({
      user: null,
      isAuthenticated: false,
      accessToken: null,
      refreshToken: null,
      error: null,
      activeScreen: 'home',
    });
  },
  
  // Получение профиля
  getProfile: async () => {
    const { accessToken } = get();
    
    if (!accessToken) {
      return null;
    }
    
    try {
      const response = await fetch(`${API_BASE_URL}/auth/profile`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });
      
      if (response.status === 401) {
        const refreshed = await get().refreshTokens();
        if (refreshed) {
          return get().getProfile();
        }
        return null;
      }
      
      const data = await response.json();
      
      if (response.status === 200) {
        await AsyncStorage.setItem('user', JSON.stringify(data.data.user));
        set({ user: data.data.user });
        return data.data.user;
      }
      
      return null;
    } catch (error) {
      console.error('Ошибка получения профиля:', error);
      return null;
    }
  },
  
  // Проверка авторизации
  checkAuth: async () => {
    const user = await get().getProfile();
    if (!user) {
      get().logout();
    }
  },
  
  // Универсальный fetch с авторизацией
  authFetch: async (url, options = {}) => {
    const { accessToken } = get();
    
    const headers = {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
      ...options.headers,
    };
    
    let response = await fetch(url, { ...options, headers });
    
    if (response.status === 401) {
      const refreshed = await get().refreshTokens();
      if (refreshed) {
        const { accessToken: newToken } = get();
        headers.Authorization = `Bearer ${newToken}`;
        response = await fetch(url, { ...options, headers });
      } else {
        get().logout();
        throw new Error('Требуется авторизация');
      }
    }
    
    return response;
  },
  
  // Навигация
  setActiveScreen: (screen) => {
    set({ activeScreen: screen });
    AsyncStorage.setItem('activeScreen', screen);
  },
  
  // Очистка ошибок
  clearError: () => set({ error: null }),
}));