import { create, StateCreator } from 'zustand';
import * as Crypto from 'expo-crypto';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  id: string;
  email: string;
}

interface UserWithPassword extends User {
  password: string;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  _getUsers: () => Promise<UserWithPassword[]>;
  _setUsers: (users: UserWithPassword[]) => Promise<void>;
  _loadStateFromStorage: () => Promise<void>;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  register: (credentials: { email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>; 
}

const isValidEmail = (value: string): boolean => {
  const email = value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const USERS_KEY = 'AUTH_USERS';
const CURRENT_USER_KEY = 'AUTH_CURRENT_USER';

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isLoading: false,
  error: null,

  _getUsers: async (): Promise<UserWithPassword[]> => {
    const usersJson = await AsyncStorage.getItem(USERS_KEY);
    return usersJson ? JSON.parse(usersJson) : [];
  },

  _setUsers: async (users: UserWithPassword[]): Promise<void> => {
    await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));
  },

  _loadStateFromStorage: async (): Promise<void> => {
    try {
      const [usersJson, currentUserJson] = await Promise.all([
        AsyncStorage.getItem(USERS_KEY),
        AsyncStorage.getItem(CURRENT_USER_KEY),
      ]);
      
      if (!usersJson) {
        await AsyncStorage.setItem(USERS_KEY, JSON.stringify([]));
      }
      
      const currentUser = currentUserJson ? JSON.parse(currentUserJson) as User : null;
      set({ user: currentUser });
    } catch (error) {
      console.error('Ошибка загрузки состояния:', error);
    }
  },

  checkAuth: async (): Promise<void> => {
    set({ isLoading: true, error: null });
    
    try {      
      const currentUserJson = await AsyncStorage.getItem(CURRENT_USER_KEY);
      
      if (!currentUserJson) {
        set({ user: null, isLoading: false });
        return;
      }
      
      const currentUser: User = JSON.parse(currentUserJson);
      
      const users = await get()._getUsers();
      const userExists = users.some(u => u.id === currentUser.id && u.email === currentUser.email);
      
      if (userExists) {
        set({ user: currentUser, isLoading: false, error: null });
      } else {
        await AsyncStorage.removeItem(CURRENT_USER_KEY);
        set({ user: null, isLoading: false, error: null });
      }
      
    } catch (e: any) {
      console.error('Ошибка при проверке аутентификации:', e);
      try {
        await AsyncStorage.removeItem(CURRENT_USER_KEY);
      } catch (storageError) {
      }
      
      set({ user: null, isLoading: false, error: e.message || 'Ошибка проверки аутентификации' });
    }
  },

  login: async ({ email, password }: { email: string; password: string }): Promise<void> => {
    set({ isLoading: true, error: null });
    
    try {
      if (!email || !password) {
        throw new Error('Введите email и пароль');
      }
      
      if (!isValidEmail(email)) {
        throw new Error('Неверный формат email');
      }
      
      const normalizedEmail = email.trim().toLowerCase();
      const users = await get()._getUsers();
      const found = users.find(u => u.email === normalizedEmail && u.password === password);
      
      if (!found) {
        throw new Error('Неверный email или пароль');
      }
      
      const currentUser: User = { id: found.id, email: found.email };
      await AsyncStorage.setItem(CURRENT_USER_KEY, JSON.stringify(currentUser));
      set({ user: currentUser, isLoading: false, error: null });
    } catch (e: any) {
      set({ isLoading: false, error: e.message || 'Ошибка входа' });
    }
  },

  register: async ({ email, password }: { email: string; password: string }): Promise<void> => {
    set({ isLoading: true, error: null });
    
    try {
      if (!email || !password) {
        throw new Error('Заполните все поля');
      }
      
      if (!isValidEmail(email)) {
        throw new Error('Неверный формат email');
      }
      
      const normalizedEmail = email.trim().toLowerCase();
      const users = await get()._getUsers();
      const exists = users.some(u => u.email === normalizedEmail);
      
      if (exists) {
        throw new Error('Пользователь с таким email уже существует');
      }
      
      const newUser: UserWithPassword = { 
        id: Crypto.randomUUID(), 
        email: normalizedEmail, 
        password 
      };
      
      const nextUsers = [...users, newUser];
      await get()._setUsers(nextUsers);
      
      const currentUser: User = { id: newUser.id, email: newUser.email };
      await AsyncStorage.setItem(CURRENT_USER_KEY, JSON.stringify(currentUser));
      set({ user: currentUser, isLoading: false, error: null });
    } catch (e: any) {
      set({ isLoading: false, error: e.message || 'Ошибка регистрации' });
    }
  },

  logout: async (): Promise<void> => {
    try {
      await AsyncStorage.removeItem(CURRENT_USER_KEY);
    } finally {
      set({ user: null });
    }
  },
}));

useAuthStore.getState()._loadStateFromStorage();

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials extends LoginCredentials {}

export type { User, AuthState };