import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_CONFIG = {
  baseURL: 'https://cloud.kit-imi.info',
  timeout: 10000
};

class BaseApiService {
  constructor() {
    this.client = axios.create({
      baseURL: API_CONFIG.baseURL,
      timeout: API_CONFIG.timeout,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  setupInterceptors() {
    this.client.interceptors.request.use(
      async (config) => {
        const token = await AsyncStorage.getItem('accessToken');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    this.client.interceptors.response.use(
      (response) => response.data,
      async (error) => {
        const originalRequest = error.config;
        
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          
          try {
            const refreshToken = await AsyncStorage.getItem('refreshToken');
            if (refreshToken) {
              const response = await axios.post(
                `${API_CONFIG.baseURL}/api/auth/refresh`,
                { refreshToken }
              );
              
              if (response.data.success) {
                await AsyncStorage.setItem('accessToken', response.data.data.accessToken);
                if (response.data.data.refreshToken) {
                  await AsyncStorage.setItem('refreshToken', response.data.data.refreshToken);
                }
                return this.client.request(originalRequest);
              }
            }
          } catch (refreshError) {
            await AsyncStorage.multiRemove(['accessToken', 'refreshToken']);
          }
        }
        
        throw error;
      }
    );
  }

  async request(endpoint, options = {}) {
    try {
      return await this.client.request({
        url: endpoint,
        ...options,
      });
    } catch (error) {
      throw error.response?.data?.message || error.message;
    }
  }
}

// Auth API
export const authAPI = {
  register: (userData) => {
    return axios.post(`${API_CONFIG.baseURL}/api/auth/register`, userData)
      .then(response => response.data);
  },

  login: (credentials) => {
    return axios.post(`${API_CONFIG.baseURL}/api/auth/login`, credentials)
      .then(response => response.data);
  },

  getProfile: (token) => {
    return axios.get(`${API_CONFIG.baseURL}/api/auth/profile`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(response => response.data);
  },

  logout: (token) => {
    return axios.post(`${API_CONFIG.baseURL}/api/auth/logout`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(response => response.data);
  }
};

// Posts API
class PostsApiService extends BaseApiService {
  async getPosts(page = 1, limit = 10) {
    return this.request(`/api/posts?page=${page}&limit=${limit}`, {
      method: 'GET'
    });
  }

  async getMyPosts(page = 1, limit = 10) {
    return this.request(`/api/posts/my?page=${page}&limit=${limit}`, {
      method: 'GET'
    });
  }

  async getPost(id) {
    return this.request(`/api/posts/${id}`, {
      method: 'GET'
    });
  }

  async createPost(title, content, published = false) {
    return this.request('/api/posts', {
      method: 'POST',
      data: { title, content, published }
    });
  }

  async updatePost(id, updates) {
    return this.request(`/api/posts/${id}`, {
      method: 'PUT',
      data: updates
    });
  }

  async deletePost(id) {
    return this.request(`/api/posts/${id}`, {
      method: 'DELETE'
    });
  }
}

export const postsAPI = new PostsApiService();

// Общий API (для обратной совместимости)
const apiService = {
  ...authAPI,
  ...postsAPI,
  getPosts: postsAPI.getPosts,
  getMyPosts: postsAPI.getMyPosts,
  getPost: postsAPI.getPost,
  createPost: postsAPI.createPost,
  updatePost: postsAPI.updatePost,
  deletePost: postsAPI.deletePost
};

export default apiService;