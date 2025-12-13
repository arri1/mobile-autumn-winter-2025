import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Конфигурация API
const API_CONFIG = {
  baseURL: 'https://cloud.kit-imi.info', 
  endpoints: {
    health: '/api/health',
    register: '/api/auth/register',
    login: '/api/auth/login',
    profile: '/api/auth/profile',
    refresh: '/api/auth/refresh',
    logout: '/api/auth/logout',
    users: '/api/auth/users'
  },
  timeout: 10000
};

class ApiService {
  constructor() {
    this.client = axios.create({
      baseURL: API_CONFIG.baseURL,
      timeout: API_CONFIG.timeout,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Перехватчик запросов
    this.client.interceptors.request.use(
      async (config) => {
        const token = await AsyncStorage.getItem('accessToken');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Перехватчик ответов - ИСПРАВЛЕННАЯ ВЕРСИЯ
    this.client.interceptors.response.use(
      (response) => {
        return response.data;
      },
      async (error) => {
        const originalRequest = error.config;
        const requestUrl = originalRequest.url;
        
        // Логируем для отладки
        console.log('Interceptor caught error:', {
          url: requestUrl,
          status: error.response?.status,
          isAuthEndpoint: requestUrl.includes('/api/auth/'),
          isLoginRequest: requestUrl.includes('/api/auth/login'),
          isRegisterRequest: requestUrl.includes('/api/auth/register'),
          isRefreshRequest: requestUrl.includes('/api/auth/refresh')
        });
        
        // Если это ошибка логина/регистрации/обновления - не обрабатываем через refresh
        const isAuthRequest = requestUrl.includes('/api/auth/login') ||
                             requestUrl.includes('/api/auth/register') ||
                             requestUrl.includes('/api/auth/refresh');
        
        // Если ошибка 401 и это НЕ запрос на аутентификацию
        if (error.response?.status === 401 && !isAuthRequest && !originalRequest._retry) {
          console.log('Attempting token refresh for 401 error...');
          originalRequest._retry = true;
          
          try {
            await this.refreshToken();
            // Повторите исходный запрос
            return this.client.request(originalRequest);
          } catch (refreshError) {
            console.log('Token refresh failed:', refreshError.message);
            // Обновление не удалось, перенаправление на страницу входа
            await AsyncStorage.multiRemove(['accessToken', 'refreshToken']);
            throw refreshError;
          }
        }
        
        // Для всех других случаев (включая ошибки логина) просто пробрасываем ошибку
        return Promise.reject(error);
      }
    );
  }

  // Health check ?
  async healthCheck() {
    return this.request(API_CONFIG.endpoints.health, { method: 'GET' });
  }

  // Register user
  async register(userData) {
    return this.request(API_CONFIG.endpoints.register, {
      method: 'POST',
      data: userData,
    });
  }

  // Login user - ПРОСТАЯ ВЕРСИЯ БЕЗ ПЕРЕХВАТЧИКА
  async login(credentials) {
    try {
      // Используем прямой запрос без перехватчика для логина
      const response = await axios({
        method: 'POST',
        url: `${API_CONFIG.baseURL}${API_CONFIG.endpoints.login}`,
        data: credentials,
        timeout: API_CONFIG.timeout,
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      return response.data;
    } catch (error) {
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw error;
    }
  }

  // Получение профиля пользователя
  async getProfile(token) {
    return this.request(API_CONFIG.endpoints.profile, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }

  // Обновление токена - УПРОЩЕННАЯ ВЕРСИЯ
  async refreshToken() {
    try {
      const refreshToken = await AsyncStorage.getItem('refreshToken');
      console.log('Refresh token from storage:', refreshToken ? 'exists' : 'not found');
      
      if (!refreshToken) {
        console.log('No refresh token available');
        throw new Error('No refresh token available');
      }

      // Используем прямой запрос для обновления токена
      const response = await axios({
        method: 'POST',
        url: `${API_CONFIG.baseURL}${API_CONFIG.endpoints.refresh}`,
        data: { refreshToken },
        timeout: API_CONFIG.timeout,
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.data.success) {
        await AsyncStorage.setItem('accessToken', response.data.data.accessToken);
        if (response.data.data.refreshToken) {
          await AsyncStorage.setItem('refreshToken', response.data.data.refreshToken);
        }
        return response.data;
      } else {
        throw new Error(response.data.message || 'Token refresh failed');
      }
    } catch (error) {
      console.error('Refresh token error:', error.message);
      await AsyncStorage.multiRemove(['accessToken', 'refreshToken']);
      throw error;
    }
  }

  // Logout user
  async logout(token) {
    return this.request(API_CONFIG.endpoints.logout, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }

  // Получение списка пользователей (только админ)
  async getUsers(token, params = {}) {
    const queryParams = new URLSearchParams();
    
    if (params.page) queryParams.append('page', params.page);
    if (params.limit) queryParams.append('limit', params.limit);
    if (params.role) queryParams.append('role', params.role);
    if (params.search) queryParams.append('search', params.search);
    
    const endpoint = `${API_CONFIG.endpoints.users}${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    
    return this.request(endpoint, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }

  // Generic request method - УПРОЩЕННАЯ ВЕРСИЯ
  async request(endpoint, options = {}) {
    try {
      const response = await this.client.request({
        url: endpoint,
        ...options,
      });
      return response;
    } catch (error) {
      console.error('API request error for', endpoint, ':', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message
      });
      
      // Обработка ошибок
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      } else if (error.response) {
        throw new Error(`HTTP ${error.response.status}: ${error.response.statusText}`);
      } else if (error.request) {
        throw new Error('Сервер недоступен. Проверьте подключение к интернету.');
      } else {
        throw new Error(error.message || 'Произошла неизвестная ошибка');
      }
    }
  }
}

export default new ApiService();