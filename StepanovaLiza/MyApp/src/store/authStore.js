import { create } from 'zustand';

const useAuthStore = create((set, get) => ({
  // Состояние
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  
  // Действия
  login: async (email, password) => {
    set({ isLoading: true, error: null });
    
    try {
      // Имитация API запроса
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Для демо создаем mock пользователя
      const mockUser = {
        id: '1',
        email: email,
        username: email.split('@')[0],
        name: email.split('@')[0],
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(email.split('@')[0])}&background=007AFF&color=fff`,
        createdAt: new Date().toISOString(),
      };
      
      set({
        user: mockUser,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
      
      return { success: true };
    } catch (error) {
      set({
        error: error.message || 'Ошибка авторизации',
        isLoading: false,
      });
      return { success: false, error: error.message };
    }
  },
  
  register: async (email, password, username) => {
    set({ isLoading: true, error: null });
    
    try {
      // Имитация API запроса
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Для демо создаем mock пользователя
      const mockUser = {
        id: '2',
        email: email,
        username: username,
        name: username,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(username)}&background=007AFF&color=fff`,
        createdAt: new Date().toISOString(),
      };
      
      set({
        user: mockUser,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
      
      return { success: true };
    } catch (error) {
      set({
        error: error.message || 'Ошибка регистрации',
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
  
  updateProfile: (data) => {
    set((state) => ({
      user: { ...state.user, ...data },
    }));
  },
  
  clearError: () => {
    set({ error: null });
  },
}));

export default useAuthStore;