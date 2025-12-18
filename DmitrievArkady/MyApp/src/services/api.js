import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'https://cloud.kit-imi.info/api';
const ACCESS_TOKEN_KEY = '@access_token';
const REFRESH_TOKEN_KEY = '@refresh_token';

let accessToken = null;
let refreshToken = null;

// Инициализация токенов из AsyncStorage
const initTokens = async () => {
  const [at, rt] = await Promise.all([
    AsyncStorage.getItem(ACCESS_TOKEN_KEY),
    AsyncStorage.getItem(REFRESH_TOKEN_KEY)
  ]);
  accessToken = at;
  refreshToken = rt;
};

const apiFetch = async (endpoint, options = {}) => {
  const url = `${BASE_URL}${endpoint}`;
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers
  };

  if (accessToken && !endpoint.includes('/auth/refresh')) {
    headers.Authorization = `Bearer ${accessToken}`;
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers
    });

    if (response.status === 401 && refreshToken && !endpoint.includes('/auth/refresh')) {
      const refreshed = await refreshTokenRequest();
      if (refreshed) {
        return apiFetch(endpoint, options);
      }
      throw new Error('Сессия истекла');
    }

    return response;
  } catch (error) {
    throw error;
  }
};

const refreshTokenRequest = async () => {
  try {
    const response = await fetch(`${BASE_URL}/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken })
    });

    const data = await response.json();
    
    if (data.success) {
      const { accessToken: newAccess, refreshToken: newRefresh } = data.data;
      await setTokens(newAccess, newRefresh || refreshToken);
      return true;
    }
    return false;
  } catch {
    return false;
  }
};

const setTokens = async (newAccess, newRefresh) => {
  accessToken = newAccess;
  refreshToken = newRefresh;
  await Promise.all([
    AsyncStorage.setItem(ACCESS_TOKEN_KEY, newAccess),
    AsyncStorage.setItem(REFRESH_TOKEN_KEY, newRefresh)
  ]);
};

const clearTokens = async () => {
  accessToken = null;
  refreshToken = null;
  await Promise.all([
    AsyncStorage.removeItem(ACCESS_TOKEN_KEY),
    AsyncStorage.removeItem(REFRESH_TOKEN_KEY)
  ]);
};


export const authAPI = {
  register: (name, email, password) =>
    apiFetch('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password })
    }).then(res => res.json()),

  login: (email, password) =>
    apiFetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    }).then(res => res.json()),

  logout: () =>
    apiFetch('/auth/logout', {
      method: 'POST',
      body: JSON.stringify({ refreshToken })
    }).catch(() => {}),

  validate: () =>
    apiFetch('/auth/validate').then(res => res.ok),

  getCurrentToken: () => accessToken
};

export const userAPI = {
  getUsers: (page = 1, limit = 10) =>
    apiFetch(`/auth/users?page=${page}&limit=${limit}`)
      .then(res => res.json()),

  updateProfile: (userId, updates) =>
    apiFetch(`/auth/users/${userId}`, {
      method: 'PUT',
      body: JSON.stringify(updates)
    }).then(res => res.json()),

  deleteAccount: (userId) =>
    apiFetch(`/auth/users/${userId}`, {
      method: 'DELETE'
    }).then(res => res.json())
};

// После userAPI добавь:
export const postsAPI = {
  getPosts: (page = 1, limit = 10) =>
    apiFetch(`/posts?page=${page}&limit=${limit}`)
      .then(res => res.json()),

  getMyPosts: (page = 1, limit = 10) =>
    apiFetch(`/posts/my?page=${page}&limit=${limit}`)
      .then(res => res.json()),

  getPost: (id) =>
    apiFetch(`/posts/${id}`)
      .then(res => res.json()),

  createPost: (title, content, published = false) =>
    apiFetch('/posts', {
      method: 'POST',
      body: JSON.stringify({ title, content, published })
    }).then(res => res.json()),

  updatePost: (id, updates) =>
    apiFetch(`/posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates)
    }).then(res => res.json()),

  deletePost: (id) =>
    apiFetch(`/posts/${id}`, {
      method: 'DELETE'
    }).then(res => res.json())
};

initTokens();

export { setTokens, clearTokens, BASE_URL };