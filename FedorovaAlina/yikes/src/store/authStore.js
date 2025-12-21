import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useAuthStore = create((set, get) => ({
  // Состояние
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  accessToken: null,
  refreshToken: null,
  activeScreen: 'home', // Добавляем активный экран
  
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
      }
    } catch (error) {
      console.error('Ошибка инициализации:', error);
    }
  },
  
  // Регистрация
  register: async (username, password, email) => {
    set({ isLoading: true, error: null });
    
    try {
      // Имитация API запроса
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Тестовый пользователь
      const mockUser = {
        id: Date.now(),
        username,
        email,
        name: username,
        role: 'user',
        createdAt: new Date().toISOString(),
      };
      
      // Сохраняем данные
      const mockToken = 'mock_jwt_token_' + Date.now();
      await AsyncStorage.setItem('accessToken', mockToken);
      await AsyncStorage.setItem('refreshToken', 'mock_refresh_token_' + Date.now());
      await AsyncStorage.setItem('user', JSON.stringify(mockUser));
      await AsyncStorage.setItem('activeScreen', 'home');
      
      set({
        user: mockUser,
        accessToken: mockToken,
        refreshToken: 'mock_refresh_token_' + Date.now(),
        isAuthenticated: true,
        activeScreen: 'home',
        isLoading: false,
        error: null,
      });
      
      return { success: true, data: mockUser };
    } catch (error) {
      set({
        error: error.message || 'Ошибка регистрации',
        isLoading: false,
      });
      return { success: false, error: error.message };
    }
  },
  
  // Вход
  login: async (username, password) => {
    set({ isLoading: true, error: null });
    
    try {
      // Имитация API запроса
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Тестовый пользователь
      const mockUser = {
        id: 1,
        username,
        email: username.includes('@') ? username : `${username}@cybersystem.com`,
        name: username.includes('@') ? username.split('@')[0] : username,
        role: username === 'admin' ? 'admin' : 'user',
        createdAt: new Date().toISOString(),
      };
      
      // Сохраняем данные
      const mockToken = 'mock_jwt_token_' + Date.now();
      await AsyncStorage.setItem('accessToken', mockToken);
      await AsyncStorage.setItem('refreshToken', 'mock_refresh_token_' + Date.now());
      await AsyncStorage.setItem('user', JSON.stringify(mockUser));
      await AsyncStorage.setItem('activeScreen', 'home');
      
      set({
        user: mockUser,
        accessToken: mockToken,
        refreshToken: 'mock_refresh_token_' + Date.now(),
        isAuthenticated: true,
        activeScreen: 'home',
        isLoading: false,
        error: null,
      });
      
      return { success: true, data: mockUser };
    } catch (error) {
      set({
        error: 'Неверные учетные данные',
        isLoading: false,
      });
      return { success: false, error: 'Неверные учетные данные' };
    }
  },
  
  // Обновление токенов
  refreshTokens: async () => {
    try {
      const refreshTokenValue = await AsyncStorage.getItem('refreshToken');
      if (!refreshTokenValue) return false;
      
      // Имитация обновления токена
      const newToken = 'mock_jwt_token_refreshed_' + Date.now();
      await AsyncStorage.setItem('accessToken', newToken);
      
      set({ accessToken: newToken });
      return true;
    } catch (error) {
      console.error('Ошибка обновления токенов:', error);
      return false;
    }
  },
  
  // Выход
  logout: async () => {
    try {
      // Очищаем локальное хранилище
      await AsyncStorage.multiRemove(['accessToken', 'refreshToken', 'user', 'activeScreen']);
    } catch (error) {
      console.error('Ошибка при выходе:', error);
    }
    
    set({
      user: null,
      isAuthenticated: false,
      accessToken: null,
      refreshToken: null,
      activeScreen: 'home',
      error: null,
    });
  },
  
  // Получение профиля
  getProfile: async () => {
    const { accessToken } = get();
    
    if (!accessToken) {
      return null;
    }
    
    try {
      // Имитация запроса профиля
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        set({ user });
        return user;
      }
      
      return null;
    } catch (error) {
      console.error('Ошибка получения профиля:', error);
      return null;
    }
  },
  
  // Навигация
  setActiveScreen: (screen) => {
    set({ activeScreen: screen });
    AsyncStorage.setItem('activeScreen', screen);
  },
  
  // Проверка авторизации
  checkAuth: async () => {
    const user = await get().getProfile();
    if (!user) {
      get().logout();
    }
  },
  
  // Очистка ошибок
  clearError: () => set({ error: null }),
}));