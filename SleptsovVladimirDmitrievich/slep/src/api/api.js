import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_CONFIG = {
  baseURL: 'https://cloud.kit-imi.info',
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


const client = axios.create({
  baseURL: API_CONFIG.baseURL,
  timeout: API_CONFIG.timeout,
  headers: {
    'Content-Type': 'application/json',
  },
});


client.interceptors.request.use(
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


client.interceptors.response.use(
  (response) => {
    return response.data;
  },
  async (error) => {
    if (error.response?.status === 401) {
      // Token expired, try to refresh
      try {
        await refreshToken();
        // Retry the original request
        return client.request(error.config);
      } catch (refreshError) {
        // Refresh failed, redirect to login
        await AsyncStorage.multiRemove(['accessToken', 'refreshToken']);
        throw refreshError;
      }
    }
    return Promise.reject(error);
  }
);

const request = async (endpoint, options = {}) => {
  try {
    const response = await client.request({
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
};

// Refresh token
const refreshToken = async () => {
  const refreshTokenValue = await AsyncStorage.getItem('refreshToken');
  if (!refreshTokenValue) {
    throw new Error('No refresh token available');
  }

  const response = await request(API_CONFIG.endpoints.refresh, {
    method: 'POST',
    data: { refreshToken: refreshTokenValue },
  });

  if (response.success) {
    await AsyncStorage.setItem('accessToken', response.data.accessToken);
    if (response.data.refreshToken) {
      await AsyncStorage.setItem('refreshToken', response.data.refreshToken);
    }
  }

  return response;
};

// Health check
const healthCheck = async () => {
  return request(API_CONFIG.endpoints.health, { method: 'GET' });
};

// Register user
const register = async (userData) => {
  return request(API_CONFIG.endpoints.register, {
    method: 'POST',
    data: userData,
  });
};

// Login user
const login = async (credentials) => {
  return request(API_CONFIG.endpoints.login, {
    method: 'POST',
    data: credentials,
  });
};

// Get user profile
const getProfile = async (token) => {
  return request(API_CONFIG.endpoints.profile, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
};

// Logout user
const logout = async (token) => {
  return request(API_CONFIG.endpoints.logout, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
};

// Get users list (Admin only)
const getUsers = async (token, params = {}) => {
  const queryParams = new URLSearchParams();
  
  if (params.page) queryParams.append('page', params.page);
  if (params.limit) queryParams.append('limit', params.limit);
  if (params.role) queryParams.append('role', params.role);
  if (params.search) queryParams.append('search', params.search);
  
  const endpoint = `${API_CONFIG.endpoints.users}${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
  
  return request(endpoint, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
};

// Get ICE servers for WebRTC
const getIceServers = async () => {
  return request(API_CONFIG.endpoints.iceServers, {
    method: 'GET',
  });
};

// Get posts list
const getPosts = async (params = {}) => {
  const queryParams = new URLSearchParams();
  
  if (params.page) queryParams.append('page', params.page);
  if (params.limit) queryParams.append('limit', params.limit);
  if (params.published !== undefined) queryParams.append('published', params.published);
  if (params.authorId) queryParams.append('authorId', params.authorId);
  if (params.search) queryParams.append('search', params.search);
  
  const endpoint = `${API_CONFIG.endpoints.posts}${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
  
  return request(endpoint, {
    method: 'GET',
  });
};

// Get my posts
const getMyPosts = async (params = {}) => {
  const queryParams = new URLSearchParams();
  
  if (params.page) queryParams.append('page', params.page);
  if (params.limit) queryParams.append('limit', params.limit);
  if (params.published !== undefined) queryParams.append('published', params.published);
  
  const endpoint = `${API_CONFIG.endpoints.myPosts}${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
  
  return request(endpoint, {
    method: 'GET',
  });
};

// Get post by ID
const getPostById = async (id) => {
  return request(`${API_CONFIG.endpoints.posts}/${id}`, {
    method: 'GET',
  });
};

// Create post
const createPost = async (postData) => {
  return request(API_CONFIG.endpoints.posts, {
    method: 'POST',
    data: postData,
  });
};

// Update post
const updatePost = async (id, postData) => {
  return request(`${API_CONFIG.endpoints.posts}/${id}`, {
    method: 'PUT',
    data: postData,
  });
};

// Delete post
const deletePost = async (id) => {
  return request(`${API_CONFIG.endpoints.posts}/${id}`, {
    method: 'DELETE',
  });
};

export default {
  client,
  healthCheck,
  register,
  login,
  getProfile,
  refreshToken,
  logout,
  getUsers,
  getIceServers,
  getPosts,
  getMyPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
};
