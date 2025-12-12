import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useAuthStore = create(
  persist(
    (set, get) => ({
      // Состояние
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      
      // Демо-пользователи для тестирования
      demoUsers: [
        { id: 1, email: 'santa@northpole.com', password: '123456', name: 'Санта Клаус', role: 'admin' },
        { id: 2, email: 'snowman@winter.com', password: '123456', name: 'Снеговик Олаф', role: 'user' },
        { id: 3, email: 'guest@newyear.com', password: '123456', name: 'Новогодний Гость', role: 'user' },
      ],
      
      // Действия
      login: async (email, password) => {
        set({ isLoading: true, error: null });
        
        try {
          // Имитация API запроса
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          const user = get().demoUsers.find(
            user => user.email === email && user.password === password
          );
          
          if (user) {
            const token = `jwt_token_${Date.now()}`;
            const userData = {
              id: user.id,
              name: user.name,
              email: user.email,
              role: user.role,
              avatar: user.role === 'admin' ? '🎅' : '⛄'
            };
            
            set({
              user: userData,
              token: token,
              isAuthenticated: true,
              isLoading: false,
              error: null
            });
            
            return { success: true, user: userData };
          } else {
            set({
              isLoading: false,
              error: 'Неверный email или пароль'
            });
            return { success: false, error: 'Неверный email или пароль' };
          }
        } catch (error) {
          set({
            isLoading: false,
            error: 'Ошибка сервера. Попробуйте позже.'
          });
          return { success: false, error: 'Ошибка сервера' };
        }
      },
      
      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          error: null
        });
      },
      
      register: async (name, email, password) => {
        set({ isLoading: true, error: null });
        
        try {
          // Имитация API запроса
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // Проверка существующего пользователя
          const existingUser = get().demoUsers.find(user => user.email === email);
          if (existingUser) {
            set({
              isLoading: false,
              error: 'Пользователь с таким email уже существует'
            });
            return { success: false, error: 'Пользователь уже существует' };
          }
          
          const newUser = {
            id: Date.now(),
            name,
            email,
            password,
            role: 'user',
          };
          
          // В реальном приложении здесь был бы запрос к API
          const token = `jwt_token_${Date.now()}`;
          const userData = {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            role: newUser.role,
            avatar: '🎁'
          };
          
          set({
            user: userData,
            token: token,
            isAuthenticated: true,
            isLoading: false,
            error: null
          });
          
          return { success: true, user: userData };
        } catch (error) {
          set({
            isLoading: false,
            error: 'Ошибка регистрации'
          });
          return { success: false, error: 'Ошибка регистрации' };
        }
      },
      
      clearError: () => set({ error: null }),
      
      // Проверка ролей
      isAdmin: () => {
        const user = get().user;
        return user?.role === 'admin';
      },
      
      // Обновление профиля
      updateProfile: (name) => {
        const user = get().user;
        if (user) {
          set({
            user: {
              ...user,
              name: name,
              updatedAt: new Date().toISOString()
            }
          });
        }
      },
    }),
    {
      name: 'auth-storage', // ключ для AsyncStorage
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);