import { create } from 'zustand';

// Типы для пользователя
interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

// Интерфейс состояния store
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

// Создание Zustand store
const useAuthStore = create<AuthState>((set) => ({
  // Начальное состояние
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  // Действие: вход в систему
  login: async (credentials) => {
    set({ isLoading: true, error: null });

    try {
      // Симуляция API запроса
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Проверка учетных данных (для демонстрации)
      if (credentials.email === 'admin@example.com' && credentials.password === 'admin123') {
        const mockUser: User = {
          id: 1,
          name: 'Администратор',
          email: credentials.email,
          role: 'admin',
        };

        set({
          user: mockUser,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });
      } else {
        throw new Error('Неверные учетные данные');
      }
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : 'Ошибка входа',
      });
      throw error;
    }
  },

  // Действие: выход из системы
  logout: () => {
    set({
      user: null,
      isAuthenticated: false,
      error: null,
    });
  },

  // Действие: очистка ошибки
  clearError: () => {
    set({ error: null });
  },
}));

export default useAuthStore;
