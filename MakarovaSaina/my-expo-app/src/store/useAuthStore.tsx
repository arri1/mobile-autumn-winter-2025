import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiClient from '../api/auth/client';

const ACCESS_TOKEN_KEY = 'ACCESS_TOKEN';
const REFRESH_TOKEN_KEY = 'REFRESH_TOKEN';
const USER_KEY = 'USER_DATA';

interface User {
  id: string;
  email: string;
  name?: string;
  role: string;
  createdAt: string;
  updatedAt?: string;
}

interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
    accessToken: string;
    refreshToken: string;
  };
}

interface Tokens {
  accessToken: string;
  refreshToken: string;
}

interface AuthState {
  user: User | null;
  tokens: Tokens | null;
  isLoading: boolean;
  error: string | null;
  
  register: (data: RegisterData) => Promise<void>;
  login: (data: LoginData) => Promise<void>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<void>;
  getCurrentUser: () => Promise<void>;
  
  _saveTokens: (tokens: Tokens) => Promise<void>;
  _saveUser: (user: User) => Promise<void>;
  _loadAuthData: () => Promise<void>;
  clearError: () => void;
}

interface RegisterData {
  email: string;
  password: string;
  name?: string; 
}

interface LoginData {
  email: string;
  password: string;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  tokens: null,
  isLoading: false,
  error: null,

  register: async (data: RegisterData): Promise<void> => {
    set({ isLoading: true, error: null });
    
    try {
      console.log('📝 Register attempt:', { 
        email: data.email, 
        name: data.name,
        hasPassword: !!data.password 
      });
      
      if (!data.email || !data.password) {
        throw new Error('Email и пароль обязательны');
      }
      
      if (data.name && (data.name.length < 2 || data.name.length > 50)) {
        throw new Error('Имя пользователя должно быть от 2 до 50 символов');
      }
      
      const response = await apiClient.post<AuthResponse>('/api/auth/register', {
        email: data.email.trim().toLowerCase(),
        password: data.password,
        name: data.name || undefined, 
      });
      
      console.log('📥 Register API response:', {
        success: response.data.success,
        message: response.data.message,
        hasUser: !!response.data.data?.user,
        hasAccessToken: !!response.data.data?.accessToken,
        hasRefreshToken: !!response.data.data?.refreshToken,
      });
      
      if (!response.data.success || !response.data.data) {
        throw new Error(response.data.message || 'Ошибка регистрации');
      }
      
      const { user, accessToken, refreshToken } = response.data.data;
      
      if (!accessToken || !refreshToken) {
        throw new Error('Сервер не вернул токены доступа');
      }
      
      const tokensToSave = { accessToken, refreshToken };
      await get()._saveTokens(tokensToSave);
      await get()._saveUser(user);
      
      set({ 
        user, 
        tokens: tokensToSave,
        isLoading: false,
        error: null 
      });
      
      console.log('Register successful:', user.email);
      
    } catch (error: any) {
      console.error('Register error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
      
      let errorMessage = 'Ошибка регистрации';
      
      if (error.response?.data) {
        const serverData = error.response.data;
                
        if (serverData.errors && Array.isArray(serverData.errors)) {
          errorMessage = serverData.errors.map((err: any) => 
            `${err.field}: ${err.message}`
          ).join('\n');
        } else if (serverData.message) {
          errorMessage = serverData.message;
        }
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      set({ 
        isLoading: false, 
        error: errorMessage 
      });
      
      throw new Error(errorMessage);
    }
  },

  login: async (data: LoginData): Promise<void> => {
    set({ isLoading: true, error: null });
    
    try {
      console.log('🔐 Login attempt:', { 
        email: data.email,
        passwordLength: data.password?.length 
      });
      
      if (!data.email || !data.password) {
        throw new Error('Email и пароль обязательны');
      }
      
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.email)) {
        throw new Error('Неверный формат email');
      }
      
      const response = await apiClient.post<AuthResponse>('/api/auth/login', {
        email: data.email.trim().toLowerCase(),
        password: data.password,
      });
      
      console.log('Login API response:', {
        success: response.data.success,
        message: response.data.message,
        hasUser: !!response.data.data?.user,
        hasTokens: !!response.data.data?.accessToken && !!response.data.data?.refreshToken,
      });
      
      if (!response.data.success || !response.data.data) {
        throw new Error(response.data.message || 'Ошибка входа');
      }
      
      const { user, accessToken, refreshToken } = response.data.data;
      
      if (!accessToken || !refreshToken) {
        throw new Error('Сервер не вернул токены доступа');
      }
      
      const tokensToSave = { accessToken, refreshToken };
      await get()._saveTokens(tokensToSave);
      await get()._saveUser(user);
      
      set({ 
        user, 
        tokens: tokensToSave,
        isLoading: false,
        error: null 
      });
      
      console.log('Login successful:', user.email);
      
    } catch (error: any) {
      console.error('Login error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
      
      let errorMessage = 'Неверный email или пароль';
      
      if (error.response?.data) {
        const serverData = error.response.data;
        
        if (serverData.message === 'Invalid email or password') {
          errorMessage = 'Неверный email или пароль';
        } else if (serverData.message) {
          errorMessage = serverData.message;
        }
        
        if (serverData.errors && Array.isArray(serverData.errors)) {
          errorMessage = serverData.errors.map((err: any) => 
            `${err.field}: ${err.message}`
          ).join('\n');
        }
      }
      
      set({ 
        isLoading: false, 
        error: errorMessage 
      });
      
      throw new Error(errorMessage);
    }
  },

  logout: async (): Promise<void> => {
    try {
      const tokens = get().tokens;
      
      if (tokens?.accessToken) {
        try {
          await apiClient.post('/api/auth/logout', {}, {
            headers: {
              Authorization: `Bearer ${tokens.accessToken}`
            }
          });
          console.log('Logout API call successful');
        } catch (apiError) {
          console.warn('Logout API error (continuing with local logout):', apiError);
        }
      }
    } catch (error) {
      console.warn('Logout error:', error);
    } finally {
      try {
        await AsyncStorage.multiRemove([ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY, USER_KEY]);
        console.log('Local storage cleared');
      } catch (storageError) {
        console.error('Error clearing storage:', storageError);
      }
      
      set({ user: null, tokens: null });
      console.log('Logout complete');
    }
  },

  refreshToken: async (): Promise<void> => {
    try {
      const refreshToken = await AsyncStorage.getItem(REFRESH_TOKEN_KEY);
      
      if (!refreshToken) {
        console.log('No refresh token available');
        return;
      }
      
      console.log('🔄 Attempting token refresh...');
      
      const response = await apiClient.post<{ success: boolean; data?: { accessToken: string } }>(
        '/api/auth/refresh-token',
        { refreshToken }
      );
      
      if (response.data.success && response.data.data?.accessToken) {
        const newAccessToken = response.data.data.accessToken;
        const tokens = get().tokens;
        
        if (tokens) {
          const newTokens = { ...tokens, accessToken: newAccessToken };
          await get()._saveTokens(newTokens);
          set({ tokens: newTokens });
          console.log('Token refreshed successfully');
        }
      } else {
        throw new Error('Invalid refresh token response');
      }
    } catch (error) {
      console.warn('Token refresh failed:', error);
      await get().logout();
    }
  },

  
  getCurrentUser: async (): Promise<void> => {
    try {
      const accessToken = await AsyncStorage.getItem(ACCESS_TOKEN_KEY);
      if (!accessToken) {
        console.log('No access token available');
        return;
      }
      
      console.log('👤 Fetching current user...');
      
      const response = await apiClient.get<AuthResponse>('/api/auth/me', {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      
      if (response.data.success && response.data.data?.user) {
        const user = response.data.data.user;
        await get()._saveUser(user);
        set({ user });
        console.log('✅ Current user loaded:', user.email);
      }
    } catch (error) {
      console.warn('⚠️ Failed to get current user:', error);
    }
  },

  // Вспомогательные методы
  _saveTokens: async (tokens: Tokens): Promise<void> => {
    try {
      if (!tokens.accessToken || !tokens.refreshToken) {
        throw new Error('Invalid tokens to save');
      }
      
      await AsyncStorage.setItem(ACCESS_TOKEN_KEY, tokens.accessToken);
      await AsyncStorage.setItem(REFRESH_TOKEN_KEY, tokens.refreshToken);
      
      console.log('💾 Tokens saved to storage');
    } catch (error) {
      console.error('❌ Error saving tokens:', error);
      throw error;
    }
  },

  _saveUser: async (user: User): Promise<void> => {
    try {
      if (!user) {
        console.warn('Attempting to save null user');
        await AsyncStorage.removeItem(USER_KEY);
        return;
      }
      
      await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
      console.log('💾 User saved to storage:', user.email);
    } catch (error) {
      console.error('❌ Error saving user:', error);
    }
  },

  _loadAuthData: async (): Promise<void> => {
    try {
      console.log('Loading auth data from storage...');
      
      const [accessToken, refreshToken, userJson] = await Promise.all([
        AsyncStorage.getItem(ACCESS_TOKEN_KEY),
        AsyncStorage.getItem(REFRESH_TOKEN_KEY),
        AsyncStorage.getItem(USER_KEY),
      ]);
      
      console.log('Storage contents:', {
        hasAccessToken: !!accessToken,
        hasRefreshToken: !!refreshToken,
        hasUser: !!userJson,
      });
      
      if (accessToken && refreshToken && userJson) {
        try {
          const user = JSON.parse(userJson);
          set({ 
            user, 
            tokens: { accessToken, refreshToken } 
          });
          console.log('Auth data loaded from storage');
                    
        } catch (parseError) {
          console.error('Error parsing user data:', parseError);
          await AsyncStorage.multiRemove([ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY, USER_KEY]);
        }
      } else {
        console.log('No auth data found in storage');
      }
    } catch (error) {
      console.error(' Failed to load auth data:', error);
    }
  },

  clearError: (): void => {
    set({ error: null });
  },
}));
useAuthStore.getState()._loadAuthData();

apiClient.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    
    const isAuthEndpoint = originalRequest.url?.includes('/auth/login') || 
                          originalRequest.url?.includes('/auth/register');
    
    if (error.response?.status === 401 && !originalRequest._retry && !isAuthEndpoint) {
      originalRequest._retry = true;
      
      console.log('🔄 Auto-refreshing token for 401 error...');
      
      try {
        await useAuthStore.getState().refreshToken();
        const newAccessToken = await AsyncStorage.getItem(ACCESS_TOKEN_KEY);
        
        if (newAccessToken) {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          console.log('Token refreshed, retrying request...');
          return apiClient(originalRequest);
        }
      } catch (refreshError) {
        console.warn('Auto-refresh failed:', refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);