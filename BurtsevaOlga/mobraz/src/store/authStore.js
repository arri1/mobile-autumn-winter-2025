// src/store/authStore.js
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Установи еще AsyncStorage если нужно:
// npm install @react-native-async-storage/async-storage

export const useAuthStore = create(
  persist(
    (set, get) => ({
      // Состояние
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      
      // Действия (actions)
      login: async (email, password) => {
        set({ isLoading: true, error: null });
        
        try {
          // Имитация API запроса
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          if (email === 'test@test.com' && password === '123456') {
            const user = {
              id: 1,
              email: email,
              name: 'Тестовый пользователь',
              token: 'fake-jwt-token',
            };
            
            set({
              user,
              isAuthenticated: true,
              isLoading: false,
              error: null,
            });
            
            return { success: true };
          } else {
            throw new Error('Неверный email или пароль');
          }
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
          // Имитация API запроса
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // Простая валидация
          if (!name || !email || !password) {
            throw new Error('Все поля обязательны');
          }
          
          if (password.length < 6) {
            throw new Error('Пароль должен быть минимум 6 символов');
          }
          
          const user = {
            id: Date.now(),
            name,
            email,
            token: 'fake-jwt-token-' + Date.now(),
          };
          
          set({
            user,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
          
          return { success: true };
        } catch (error) {
          set({
            error: error.message,
            isLoading: false,
          });
          return { success: false, error: error.message };
        }
      },
      
      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
          error: null,
        });
      },
      
      clearError: () => {
        set({ error: null });
      },
    }),
    {
      name: 'auth-storage', // ключ в AsyncStorage
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);