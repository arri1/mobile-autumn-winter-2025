import axios, { AxiosInstance, AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LoginCredentials, RegisterData, AuthResponse, User } from '../types';

// API Configuration
interface ApiConfig {
  baseURL: string;
  endpoints: {
    health: string;
    register: string;
    login: string;
    profile: string;
    refresh: string;
    logout: string;
    users: string;
  };
  timeout: number;
}

const API_CONFIG: ApiConfig = {
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

interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message?: string;
}

interface RefreshTokenResponse {
  accessToken: string;
  refreshToken?: string;
}

interface GetUsersParams {
  page?: number;
  limit?: number;
  role?: string;
  search?: string;
}

class ApiService {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_CONFIG.baseURL,
      timeout: API_CONFIG.timeout,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor
    this.client.interceptors.request.use(
      async (config: InternalAxiosRequestConfig) => {
        const token = await AsyncStorage.getItem('accessToken');
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response) => {
        return response.data;
      },
      async (error) => {
        if (error.response?.status === 401) {
          // Token expired, try to refresh
          try {
            await this.refreshToken();
            // Retry the original request
            return this.client.request(error.config);
          } catch (refreshError) {
            // Refresh failed, redirect to login
            await AsyncStorage.multiRemove(['accessToken', 'refreshToken']);
            throw refreshError;
          }
        }
        return Promise.reject(error);
      }
    );
  }

  // Health check
  async healthCheck(): Promise<any> {
    return this.request(API_CONFIG.endpoints.health, { method: 'GET' });
  }

  // Register user
  async register(userData: RegisterData): Promise<ApiResponse<AuthResponse>> {
    return this.request(API_CONFIG.endpoints.register, {
      method: 'POST',
      data: userData,
    });
  }

  // Login user
  async login(credentials: LoginCredentials): Promise<ApiResponse<AuthResponse>> {
    return this.request(API_CONFIG.endpoints.login, {
      method: 'POST',
      data: credentials,
    });
  }

  // Get user profile
  async getProfile(token: string): Promise<ApiResponse<User>> {
    return this.request(API_CONFIG.endpoints.profile, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }

  // Refresh token
  async refreshToken(): Promise<ApiResponse<RefreshTokenResponse>> {
    const refreshToken = await AsyncStorage.getItem('refreshToken');
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const response: ApiResponse<RefreshTokenResponse> = await this.request(API_CONFIG.endpoints.refresh, {
      method: 'POST',
      data: { refreshToken },
    });

    if (response.success) {
      await AsyncStorage.setItem('accessToken', response.data.accessToken);
      if (response.data.refreshToken) {
        await AsyncStorage.setItem('refreshToken', response.data.refreshToken);
      }
    }

    return response;
  }

  // Logout user
  async logout(token: string): Promise<ApiResponse> {
    return this.request(API_CONFIG.endpoints.logout, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }

  // Get users list (Admin only)
  async getUsers(token: string, params: GetUsersParams = {}): Promise<ApiResponse<User[]>> {
    const queryParams = new URLSearchParams();

    if (params.page) queryParams.append('page', params.page.toString());
    if (params.limit) queryParams.append('limit', params.limit.toString());
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

  // Generic request method
  private async request<T = any>(endpoint: string, options: AxiosRequestConfig = {}): Promise<T> {
    try {
      const response = await this.client.request<T, T>({
        url: endpoint,
        ...options,
      });
      return response;
    } catch (error: any) {
      console.error('API request error:', error);

      // More detailed error handling
      if (error.response) {
        // Server responded with error status
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);

        // Throw a more descriptive error
        const errorMessage = error.response.data?.message ||
                            error.response.data?.error ||
                            `HTTP ${error.response.status}: ${error.response.statusText}`;
        throw new Error(errorMessage);
      } else if (error.request) {
        // Request was made but no response received
        console.error('No response received:', error.request);
        throw new Error('Сервер недоступен. Проверьте подключение к интернету.');
      } else {
        // Something else happened
        console.error('Request setup error:', error.message);
        throw new Error(error.message);
      }
    }
  }
}

export default new ApiService();
