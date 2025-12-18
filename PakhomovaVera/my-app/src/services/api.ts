import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = 'https://cloud.kit-imi.info';

// Create axios instance
export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  async (config) => {
    try {
      const authData = await AsyncStorage.getItem('@auth_data');
      if (authData) {
        const parsed = JSON.parse(authData);
        if (parsed.token) {
          config.headers.Authorization = `Bearer ${parsed.token}`;
        } else {
          console.warn('No token found in auth data');
        }
      } else {
        console.warn('No auth data found in storage');
      }
    } catch (error) {
      console.error('Error adding auth token:', error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error.response?.status;
    
    if (status === 401 || status === 403) {
      // Handle unauthorized/forbidden - token expired or invalid
      console.error(`Authentication error (${status}):`, {
        message: error.response?.data?.message,
        data: error.response?.data
      });
      
      // Clear auth data
      await AsyncStorage.removeItem('@auth_data');
      
      // Enhance error message for better UX
      const originalMessage = error.response?.data?.message || '';
      if (status === 403) {
        error.response.data = {
          ...error.response.data,
          message: originalMessage || 'Доступ запрещен. Токен истек или недействителен. Пожалуйста, войдите заново.',
          requiresLogin: true,
        };
      } else if (status === 401) {
        error.response.data = {
          ...error.response.data,
          message: originalMessage || 'Требуется авторизация. Пожалуйста, войдите в систему.',
          requiresLogin: true,
        };
      }
    }
    
    return Promise.reject(error);
  }
);

