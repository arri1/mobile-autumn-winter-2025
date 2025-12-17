// src/service/api.ts
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = 'https://cloud.kit-imi.info'; // ← ваш URL

const endpoints = {
  health: '/api/health',
  register: '/api/auth/register',
  login: '/api/auth/login',
  profile: '/api/auth/profile',
  refresh: '/api/auth/refresh',
  logout: '/api/auth/logout',
  users: '/api/auth/users',
};

const STORAGE_KEYS = {
  ACCESS_TOKEN: 'accessToken',
  REFRESH_TOKEN: 'refreshToken',
  USER_INFO: 'userInfo',
} as const;

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  createdAt?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}

export interface AuthResponse {
  success: boolean;
  data: {
    user: User;
    accessToken: string;
    refreshToken: string;
  };
}

const fetchWithTimeout = async (
  url: string, 
  options: RequestInit = {}, 
  timeout = 10000
): Promise<any> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || errorData.error || `HTTP ${response.status}: ${response.statusText}`
      );
    }

    return await response.json();
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
};

const buildUrl = (endpoint: string, params?: Record<string, any>): string => {
  const url = new URL(endpoint, API_BASE_URL);
  
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, String(value));
      }
    });
  }
  
  return url.toString();
};

export const ApiService = {
  healthCheck: () => 
    fetchWithTimeout(buildUrl(endpoints.health), { method: 'GET' }),
  register: async (userData: RegisterData): Promise<AuthResponse> => {
    const response = await fetchWithTimeout(buildUrl(endpoints.register), {
      method: 'POST',
      body: JSON.stringify(userData),
    });

    if (response.success && response.data) {
      await AsyncStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, response.data.accessToken);
      await AsyncStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, response.data.refreshToken);
      await AsyncStorage.setItem(STORAGE_KEYS.USER_INFO, JSON.stringify(response.data.user));
    }

    return response;
  },

  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await fetchWithTimeout(buildUrl(endpoints.login), {
      method: 'POST',
      body: JSON.stringify(credentials),
    });

    if (response.success && response.data) {
      await AsyncStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, response.data.accessToken);
      await AsyncStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, response.data.refreshToken);
      await AsyncStorage.setItem(STORAGE_KEYS.USER_INFO, JSON.stringify(response.data.user));
    }

    return response;
  },

  requestWithAuth: async (endpoint: string, options: RequestInit = {}, params?: any) => {
    const token = await AsyncStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
    const url = buildUrl(endpoint, params);

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string> || {}),
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    try {
      return await fetchWithTimeout(url, { ...options, headers });
    } catch (error: any) {
      if (error.message?.includes('401')) {
        try {
          await ApiService.refreshToken();
          const newToken = await AsyncStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
          
          if (newToken) {
            headers.Authorization = `Bearer ${newToken}`;
            return await fetchWithTimeout(url, { ...options, headers });
          }
        } catch (refreshError) {
          await AsyncStorage.multiRemove([
            STORAGE_KEYS.ACCESS_TOKEN, 
            STORAGE_KEYS.REFRESH_TOKEN,
            STORAGE_KEYS.USER_INFO
          ]);
          throw refreshError;
        }
      }
      throw error;
    }
  },

  getProfile: (): Promise<ApiResponse<User>> => 
    ApiService.requestWithAuth(endpoints.profile, { method: 'GET' }),

  logout: async (): Promise<ApiResponse> => {
    const response = await ApiService.requestWithAuth(endpoints.logout, { method: 'POST' });
    await AsyncStorage.multiRemove([
      STORAGE_KEYS.ACCESS_TOKEN, 
      STORAGE_KEYS.REFRESH_TOKEN,
      STORAGE_KEYS.USER_INFO
    ]);
    return response;
  },

  getUsers: (params?: any): Promise<ApiResponse> => 
    ApiService.requestWithAuth(endpoints.users, { method: 'GET' }, params),

  refreshToken: async (): Promise<ApiResponse> => {
    const refreshToken = await AsyncStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
    
    if (!refreshToken) {
      throw new Error('No refresh token');
    }

    const response = await fetchWithTimeout(buildUrl(endpoints.refresh), {
      method: 'POST',
      body: JSON.stringify({ refreshToken }),
    });

    if (response.success && response.data) {
      await AsyncStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, response.data.accessToken);
      
      if (response.data.refreshToken) {
        await AsyncStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, response.data.refreshToken);
      }
    }

    return response;
  },

  setTokens: async (accessToken: string, refreshToken: string, user?: User) => {
    await AsyncStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, accessToken);
    await AsyncStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
    if (user) {
      await AsyncStorage.setItem(STORAGE_KEYS.USER_INFO, JSON.stringify(user));
    }
  },

  clearTokens: async () => {
    await AsyncStorage.multiRemove([
      STORAGE_KEYS.ACCESS_TOKEN, 
      STORAGE_KEYS.REFRESH_TOKEN,
      STORAGE_KEYS.USER_INFO
    ]);
  },

  getAccessToken: () => AsyncStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN),
  getRefreshToken: () => AsyncStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN),
  
  getUserInfo: async (): Promise<User | null> => {
    try {
      const userJson = await AsyncStorage.getItem(STORAGE_KEYS.USER_INFO);
      return userJson ? JSON.parse(userJson) : null;
    } catch {
      return null;
    }
  },

  isAuthenticated: async (): Promise<boolean> => {
    const token = await AsyncStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
    return !!token;
  },
};

export default ApiService;