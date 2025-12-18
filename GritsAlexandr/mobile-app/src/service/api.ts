import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = 'https://cloud.kit-imi.info';

const endpoints = {
  health: '/api/health',
  register: '/api/auth/register',
  login: '/api/auth/login',
  profile: '/api/auth/profile',
  refresh: '/api/auth/refresh',
  logout: '/api/auth/logout',
  users: '/api/auth/users',
  posts: '/api/posts',
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
  updatedAt?: string;
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

export interface Post {
  id: string;
  title: string;
  content: string;
  published: boolean;
  authorId: string;
  author: {
    id: string;
    email: string;
    name: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface CreatePostData {
  title: string;
  content: string;
  published?: boolean;
}

export interface UpdatePostData {
  title?: string;
  content?: string;
  published?: boolean;
}

export interface Pagination {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  limit: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface PostsResponse {
  success: boolean;
  data: {
    posts: Post[];
    pagination: Pagination;
  };
  message?: string;
  error?: string;
}

export interface SinglePostResponse {
  success: boolean;
  data: Post;
  message?: string;
  error?: string;
}

export interface AuthResponse {
  success: boolean;
  data: {
    user: User;
    accessToken: string;
    refreshToken: string;
  };
  message?: string;
  error?: string;
}

export interface ProfileResponse {
  success: boolean;
  data: User;
  message?: string;
  error?: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}

const fetchWithTimeout = async (
  url: string, 
  options: RequestInit = {}, 
  timeout = 15000
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
      let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
      
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorData.error || errorMessage;
      } catch {

      }
      
      throw new Error(errorMessage);
    }

    return await response.json();
  } catch (error: any) {
    clearTimeout(timeoutId);
    
    if (error.name === 'AbortError') {
      throw new Error('Таймаут запроса. Проверьте подключение к интернету.');
    }
    
    if (error.message.includes('Network request failed')) {
      throw new Error('Ошибка сети. Проверьте подключение к интернету.');
    }
    
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
    fetchWithTimeout(buildUrl(endpoints.health), { method: 'GET' }, 5000),

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

  logout: async (): Promise<ApiResponse> => {
    const response = await ApiService.requestWithAuth(endpoints.logout, { method: 'POST' });
    await AsyncStorage.multiRemove([
      STORAGE_KEYS.ACCESS_TOKEN, 
      STORAGE_KEYS.REFRESH_TOKEN,
      STORAGE_KEYS.USER_INFO
    ]);
    return response;
  },

  getProfile: (): Promise<ProfileResponse> => 
    ApiService.requestWithAuth(endpoints.profile, { method: 'GET' }),

  getUsers: (params?: any): Promise<ApiResponse> => 
    ApiService.requestWithAuth(endpoints.users, { method: 'GET' }, params),

  refreshToken: async (): Promise<ApiResponse> => {
    const refreshToken = await AsyncStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
    
    if (!refreshToken) {
      throw new Error('Токен обновления не найден');
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

  getPosts: async (page = 1, limit = 10, search?: string): Promise<PostsResponse> => {
    const params: any = { page, limit };
    if (search) params.search = search;
    
    return ApiService.requestWithAuth(endpoints.posts, { method: 'GET' }, params);
  },

  getPostById: async (id: string): Promise<SinglePostResponse> => {
    return ApiService.requestWithAuth(`${endpoints.posts}/${id}`, { method: 'GET' });
  },

  createPost: async (postData: CreatePostData): Promise<SinglePostResponse> => {
    return ApiService.requestWithAuth(endpoints.posts, {
      method: 'POST',
      body: JSON.stringify(postData),
    });
  },

  updatePost: async (id: string, postData: UpdatePostData): Promise<SinglePostResponse> => {
    return ApiService.requestWithAuth(`${endpoints.posts}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(postData),
    });
  },

  deletePost: async (id: string): Promise<ApiResponse> => {
    return ApiService.requestWithAuth(`${endpoints.posts}/${id}`, {
      method: 'DELETE',
    });
  },

  togglePostPublish: async (id: string): Promise<SinglePostResponse> => {
    return ApiService.requestWithAuth(`${endpoints.posts}/${id}/toggle-publish`, {
      method: 'PATCH',
    });
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
      if (error.message?.includes('401') || error.message?.includes('Unauthorized')) {
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
          throw new Error('Сессия истекла. Пожалуйста, войдите снова.');
        }
      }
      throw error;
    }
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
    try {
      const token = await AsyncStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
      if (!token) return false;

      return true;
    } catch {
      return false;
    }
  },

  validateToken: async (): Promise<boolean> => {
    try {
      const response = await ApiService.getProfile();
      return response.success;
    } catch {
      return false;
    }
  },

  uploadFile: async (fileUri: string, type: 'image' | 'file' = 'image'): Promise<ApiResponse<{ url: string }>> => {
    const formData = new FormData();

    const file = {
      uri: fileUri,
      type: type === 'image' ? 'image/jpeg' : 'application/octet-stream',
      name: `upload.${type === 'image' ? 'jpg' : 'bin'}`,
    };

    formData.append('file', file as any);
    
    return ApiService.requestWithAuth('/api/upload', {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    });
  },

  cacheData: async (key: string, data: any, ttl = 3600000): Promise<void> => {
    try {
      const cacheItem = {
        data,
        timestamp: Date.now(),
        ttl,
      };
      await AsyncStorage.setItem(`cache_${key}`, JSON.stringify(cacheItem));
    } catch (error) {
      console.warn('Не удалось сохранить данные в кеш:', error);
    }
  },

  getCachedData: async <T>(key: string): Promise<T | null> => {
    try {
      const cached = await AsyncStorage.getItem(`cache_${key}`);
      if (!cached) return null;

      const cacheItem = JSON.parse(cached);
      const now = Date.now();

      if (now - cacheItem.timestamp > cacheItem.ttl) {
        await AsyncStorage.removeItem(`cache_${key}`);
        return null;
      }

      return cacheItem.data;
    } catch {
      return null;
    }
  },

  clearCache: async (key?: string): Promise<void> => {
    try {
      if (key) {
        await AsyncStorage.removeItem(`cache_${key}`);
      } else {
        const keys = await AsyncStorage.getAllKeys();
        const cacheKeys = keys.filter(k => k.startsWith('cache_'));
        await AsyncStorage.multiRemove(cacheKeys);
      }
    } catch (error) {
      console.warn('Не удалось очистить кеш:', error);
    }
  },

  handleError: (error: any): string => {
    if (error.message) {
      if (error.message.includes('Network request failed')) {
        return 'Ошибка сети. Проверьте подключение к интернету.';
      }
      if (error.message.includes('timeout')) {
        return 'Таймаут запроса. Сервер не отвечает.';
      }
      if (error.message.includes('401')) {
        return 'Неавторизованный доступ. Войдите в систему.';
      }
      if (error.message.includes('403')) {
        return 'Доступ запрещен. У вас недостаточно прав.';
      }
      if (error.message.includes('404')) {
        return 'Ресурс не найден.';
      }
      if (error.message.includes('500')) {
        return 'Внутренняя ошибка сервера. Попробуйте позже.';
      }
      return error.message;
    }
    return 'Произошла неизвестная ошибка';
  },

  getApiUrl: (): string => API_BASE_URL,

  setApiUrl: (newUrl: string): void => {
    console.warn('Изменение URL API в runtime не поддерживается');
  },
};

export default ApiService;