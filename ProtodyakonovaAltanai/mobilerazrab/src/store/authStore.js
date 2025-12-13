import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiService from '../services/api';

const useAuthStore = create((set, get) => ({
  // Состояния
  user: null,
  accessToken: null,
  refreshToken: null,
  isLoading: false,
  error: null,
  isAuthenticated: false,

  // Действия
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
  clearError: () => set({ error: null }),

  // Инициализация состояния аутентификации из хранилища
  initializeAuth: async () => {
    try {
      const [accessToken, refreshToken, userData] = await AsyncStorage.multiGet([
        'accessToken',
        'refreshToken',
        'userData'
      ]);

      if (accessToken[1] && refreshToken[1]) {
        set({
          accessToken: accessToken[1],
          refreshToken: refreshToken[1],
          user: userData[1] ? JSON.parse(userData[1]) : null,
          isAuthenticated: true
        });
      }
    } catch (error) {
      console.error('Error initializing auth:', error);
    }
  },

  // Register user
  register: async (userData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await apiService.register(userData);
      
      if (response.success) {
        const { accessToken, refreshToken, user } = response.data;
        
        await AsyncStorage.multiSet([
          ['accessToken', accessToken],
          ['refreshToken', refreshToken],
          ['userData', JSON.stringify(user)]
        ]);

        set({
          user,
          accessToken,
          refreshToken,
          isAuthenticated: true,
          isLoading: false
        });

        return response;
      } else {
        set({ error: response.message, isLoading: false });
        throw new Error(response.message);
      }
    } catch (error) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },

// Login user
login: async (credentials) => {
  set({ isLoading: true, error: null });
  try {
    // Используем метод login
    const response = await apiService.login(credentials);
    
    console.log('Login response:', response);
    
    if (response.success) {
      const { accessToken, refreshToken, user } = response.data;
      
      await AsyncStorage.multiSet([
        ['accessToken', accessToken],
        ['refreshToken', refreshToken],
        ['userData', JSON.stringify(user)]
      ]);

      set({
        user,
        accessToken,
        refreshToken,
        isAuthenticated: true,
        isLoading: false,
        error: null
      });

      return response;
    } else {
      // Если сервер вернул success: false
      const errorMsg = response.message || 'Ошибка входа';
      set({ error: errorMsg, isLoading: false });
      throw new Error(errorMsg);
    }
  } catch (error) {
    console.error('Login error in store:', error.message);
    // Используем сообщение об ошибке из API или стандартное
    const errorMessage = error.message === 'Request failed with status code 401' 
      ? 'Неверный email или пароль' 
      : error.message;
    
    set({ error: errorMessage, isLoading: false });
    throw new Error(errorMessage);
  }
},

  // Get user profile
  getProfile: async () => {
    const { accessToken } = get();
    
    if (!accessToken) {
      throw new Error('No access token available');
    }
    
    try {
      const response = await apiService.getProfile(accessToken);
      
      if (response.success) {
        set({ user: response.data });
        await AsyncStorage.setItem('userData', JSON.stringify(response.data));
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to get profile');
      }
    } catch (error) {
      console.error('Error getting profile:', error);
      throw error;
    }
  },

  // Logout user
  logout: async () => {
    const { accessToken } = get();
    
    try {
      if (accessToken) {
        await apiService.logout(accessToken);
      }
    } catch (error) {
      console.error('Logout API error:', error);
    } finally {
      await AsyncStorage.multiRemove(['accessToken', 'refreshToken', 'userData']);
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
}));

export default useAuthStore;