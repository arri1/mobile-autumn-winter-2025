import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = 'https://cloud.kit-imi.info/api';

const useAuthStore = create((set, get) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  accessToken: null,
  refreshToken: null,
  
  initialize: async () => {
    try {
      const storedToken = await AsyncStorage.getItem('accessToken');
      const storedUser = await AsyncStorage.getItem('user');
      
      if (storedToken && storedUser) {
        set({
          accessToken: storedToken,
          user: JSON.parse(storedUser),
          isAuthenticated: true,
        });
        
        await get().checkAuth();
      }
    } catch (error) {
      console.error('Ошибка инициализации:', error);
    }
  },
  
  register: async (email, password, name) => {
    set({ isLoading: true, error: null });
    
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          name,
        }),
      });
      
      const data = await response.json();
      
      if (response.status === 201) {
        // Успешная регистрация
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
  
  login: async (email, password) => {
    set({ isLoading: true, error: null });
    
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
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
          error: data.message || 'Неверный email или пароль',
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
  
  // обновление токенов
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
        body: JSON.stringify({
          refreshToken,
        }),
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

  logout: async () => {
    const { refreshToken } = get();
    
    try {
      await fetch(`${API_BASE_URL}/auth/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          refreshToken,
        }),
      });
    } catch (error) {
      console.error('Ошибка при выходе:', error);
    }
    
    // Очищаем хранилище
    await AsyncStorage.multiRemove(['accessToken', 'refreshToken', 'user']);
    
    set({
      user: null,
      isAuthenticated: false,
      accessToken: null,
      refreshToken: null,
      error: null,
    });
  },

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
  
  checkAuth: async () => {
    const user = await get().getProfile();
    if (!user) {
      get().logout();
    }
  },

  authFetch: async (url, options = {}) => {
    const { accessToken, refreshTokens } = get();
    
    const headers = {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
      ...options.headers,
    };
    
    let response = await fetch(url, { ...options, headers });
    
    if (response.status === 401) {
      const refreshed = await refreshTokens();
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
  
  clearError: () => {
    set({ error: null });
  },
}));

export default useAuthStore;