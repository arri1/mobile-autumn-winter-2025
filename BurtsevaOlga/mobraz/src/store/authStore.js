import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = 'https://cloud.kit-imi.info/api';

export const useAuthStore = create(
  persist(
    (set, get) => ({
      // Состояние
      user: null,
      token: null,
      refreshToken: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      setTokens: async (accessToken, refreshToken) => {
        await AsyncStorage.setItem('access-token', accessToken);
        await AsyncStorage.setItem('refresh-token', refreshToken);
      },

      clearTokens: async () => {
        await AsyncStorage.removeItem('access-token');
        await AsyncStorage.removeItem('refresh-token');
      },

      getTokens: async () => {
        const accessToken = await AsyncStorage.getItem('access-token');
        const refreshToken = await AsyncStorage.getItem('refresh-token');
        return { accessToken, refreshToken };
      },

      checkAuth: async () => {
        const token = await get().getAccessToken();
        return !!token;
      },
      getAccessToken: () => {
        const state = get();
        return state.token; 
      },
      

      login: async (email, password) => {
        set({ isLoading: true, error: null });
        
        try {
          const response = await fetch(`${API_BASE_URL}/auth/login`,{
            method: 'POST',
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({email, password}),
          });

          const result = await response.json();
          if (!response.ok){
            throw new Error(result.message || 'Неверный email или пароль');
          }
          const {user, accessToken, refreshToken} = result.data;

          await get().setTokens(accessToken, refreshToken);
            
          set({
            user,
            token: accessToken, 
            refreshToken: refreshToken, 
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
            
          return { success: true, user };

        } catch (error) {
          set({
            error: error.message,
            isLoading: false,
          });
          return { success: false, error: error.message };
        }
      },
      
      register: async (name, email, password) => {
        set({ isLoading: true, error: null });
        
        try {

          if (!email || !/\S+@\S+\.\S+/.test(email)) {
            throw new Error('Неверный формат email');
          }
          if (!password || password.length < 6) {
            throw new Error('Пароль должен быть не менее 6 символов');
          }
          if (name && (name.length < 2 || name.length > 50)) {
            throw new Error('Имя должно быть от 2 до 50 символов');
          }

          const response = await fetch(`${API_BASE_URL}/auth/register`,{
            method: 'POST',
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password, name: name || undefined }),
          });

          const result = await response.json();

          if(!response.ok){
            if (response.status === 400 && Array.isArray(result.errors)) {
              const firstError = result.errors[0];
              throw new Error(firstError.message || result.message || 'Ошибка регистрации');
            }

            throw new Error(result.message || 'Неизвестная ошибка сервера');
          }

          const { user, accessToken, refreshToken } = result.data;

          await get().setTokens(accessToken, refreshToken);

          set({
            user,
            token: accessToken,      // ✅
            refreshToken: refreshToken,  
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
          
          return { success: true, user, accessToken, refreshToken };
        } catch (error) {
          set({
            error: error.message,
            isLoading: false,
          });
          return { success: false, error: error.message };
        }
      },


      getProfile: async () => {
        set({ isLoading: true });
        
        try {
          const accessToken = await get().getAccessToken();
          
          if (!accessToken) {
            throw new Error('Токен отсутствует');
          }

          const response = await fetch(`${API_BASE_URL}/auth/me`, {
            headers: { 
              'Authorization': `Bearer ${accessToken}`,
              'Content-Type': 'application/json'
            },
          });

          const result = await response.json();
          
          if (!response.ok) {
  
            if (response.status === 401) {
              await get().logout();
              throw new Error('Сессия истекла. Пожалуйста, войдите снова.');
            }
            throw new Error(result.message || 'Ошибка загрузки профиля');
          }

          const { user } = result.data;
          
          set({
            user,
            isLoading: false,
            error: null,
          });
          
          return { success: true, user };
        } catch (error) {
          set({
            isLoading: false,
            error: error.message,
          });
          return { success: false, error: error.message };
        }
      },

      logout: async () => {
        try {
          const accessToken = await get().getAccessToken();

          if (accessToken) {
            await fetch(`${API_BASE_URL}/auth/logout`, {
              method: 'POST',
              headers: { 
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
              },
            }).catch(() => {}); 
          }
        } finally {
          await get().clearTokens();
        set({
          user: null,
          isAuthenticated: false,
          error: null,
        });
      }
      },
      
      clearError: () => {
        set({ error: null });
      },

      setValidationError: (message) => set({ error: message }),
    }),
    {
      name: 'auth-storage', 
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        refreshToken: state.refreshToken,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);