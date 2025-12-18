import axios from 'axios';
import { useAuthStore } from '../store';

const API_BASE_URL = 'https://cloud.kit-imi.info/api';


export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
const refreshToken = async () => {
  try {
    const res = await api.post('/auth/refresh', { refreshToken: '...' });
    const newToken = res.data.accessToken;
    useAuthStore.getState().login(newToken);
    return newToken;
  } catch (err) {
    useAuthStore.getState().logout();
    throw err;
  }
};

api.interceptors.request.use(
  async (config) => {
    const token = useAuthStore.getState().token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url?.includes('/auth/login') &&
      !originalRequest.url?.includes('/auth/refresh')
    ) {
      originalRequest._retry = true;
      refreshToken()
      try {
        useAuthStore.getState().logout();
      } catch (err) {
        console.error('Ошибка при обработке 401:', err);
      }
    }

    return Promise.reject(error);
  }
);

export default api;