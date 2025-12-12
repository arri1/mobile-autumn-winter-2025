import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// API Configuration
const API_CONFIG = {
  baseURL: 'https://cloud.kit-imi.info',
 // baseURL: 'http://localhost:3000',
  endpoints: {
    health: '/api/health',
    register: '/api/auth/register',
    login: '/api/auth/login',
    profile: '/api/auth/profile',
    refresh: '/api/auth/refresh',
    logout: '/api/auth/logout',
    users: '/api/auth/users',
    iceServers: '/api/webrtc/ice-servers',
    posts: '/api/posts',
    myPosts: '/api/posts/my'
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

    // Request interceptor
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

  // Login user
  async login(credentials) {
    return this.request(API_CONFIG.endpoints.login, {
      method: 'POST',
      data: credentials,
    });
  }

  // Get user profile
  async getProfile(token) {
    return this.request(API_CONFIG.endpoints.profile, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }

  // Refresh token
  async refreshToken() {
    const refreshToken = await AsyncStorage.getItem('refreshToken');
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const response = await this.request(API_CONFIG.endpoints.refresh, {
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
  async logout(token) {
    return this.request(API_CONFIG.endpoints.logout, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }

  // Get users list (Admin only)
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

  // Get ICE servers for WebRTC
  async getIceServers() {
    return this.request(API_CONFIG.endpoints.iceServers, {
      method: 'GET',
    });
  }

  // Get posts list
  async getPosts(params = {}) {
    const queryParams = new URLSearchParams();
    
    if (params.page) queryParams.append('page', params.page);
    if (params.limit) queryParams.append('limit', params.limit);
    if (params.published !== undefined) queryParams.append('published', params.published);
    if (params.authorId) queryParams.append('authorId', params.authorId);
    if (params.search) queryParams.append('search', params.search);
    
    const endpoint = `${API_CONFIG.endpoints.posts}${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    
    return this.request(endpoint, {
      method: 'GET',
    });
  }

  // Get my posts
  async getMyPosts(params = {}) {
    const queryParams = new URLSearchParams();
    
    if (params.page) queryParams.append('page', params.page);
    if (params.limit) queryParams.append('limit', params.limit);
    if (params.published !== undefined) queryParams.append('published', params.published);
    
    const endpoint = `${API_CONFIG.endpoints.myPosts}${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    
    return this.request(endpoint, {
      method: 'GET',
    });
  }

  // Get post by ID
  async getPostById(id) {
    return this.request(`${API_CONFIG.endpoints.posts}/${id}`, {
      method: 'GET',
    });
  }

  // Create post
  async createPost(postData) {
    return this.request(API_CONFIG.endpoints.posts, {
      method: 'POST',
      data: postData,
    });
  }

  // Update post
  async updatePost(id, postData) {
    return this.request(`${API_CONFIG.endpoints.posts}/${id}`, {
      method: 'PUT',
      data: postData,
    });
  }

  // Delete post
  async deletePost(id) {
    return this.request(`${API_CONFIG.endpoints.posts}/${id}`, {
      method: 'DELETE',
    });
  }

  // Generic request method
  async request(endpoint, options = {}) {
    try {
      const response = await this.client.request({
        url: endpoint,
        ...options,
      });
      return response;
    } catch (error) {
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
