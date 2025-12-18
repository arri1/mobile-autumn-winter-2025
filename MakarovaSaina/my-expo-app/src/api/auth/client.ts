import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const apiClient = axios.create({
  baseURL: 'https://cloud.kit-imi.info',
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(async (config) => {
  const accessToken = await AsyncStorage.getItem('ACCESS_TOKEN');
  
  if (accessToken && config.headers) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  
  return config;
}, error => {
  return Promise.reject(error);
});

export default apiClient;