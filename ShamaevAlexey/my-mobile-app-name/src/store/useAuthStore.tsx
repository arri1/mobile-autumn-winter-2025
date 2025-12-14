import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  name: string;
  username: string;
  password: string;
}

interface AuthState {
  currentUser: User | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  register: (name: string, username: string, password: string) => Promise<boolean>;
  logout: () => void;
  initAuth: () => Promise<void>;
}

const USERS_KEY = '@my_app_users';

export const useAuthStore = create<AuthState>((set) => ({
  currentUser: null,
  isAuthenticated: false,

  initAuth: async () => {
    try {
      const json = await AsyncStorage.getItem(USERS_KEY);
      let users: User[] = json ? JSON.parse(json) : [];

      if (users.length === 0) {
        const admin: User = {
          name: 'Администратор',
          username: 'admin',
          password: 'admin',
        };
        users = [admin];
        await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));
      }
    } catch (err) {
      console.error('Не удалось инициализировать пользователей', err);
    }
  },

  login: async (username, password) => {
    const json = await AsyncStorage.getItem(USERS_KEY);
    const users: User[] = json ? JSON.parse(json) : [];
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
      set({ currentUser: user, isAuthenticated: true });
      return true;
    }
    return false;
  },

  register: async (name, username, password) => {
    const json = await AsyncStorage.getItem(USERS_KEY);
    const users: User[] = json ? JSON.parse(json) : [];

    if (users.some(u => u.username === username)) {
      return false;
    }

    const newUser: User = { name, username, password };
    users.push(newUser);
    await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));
    return true;
  },

  logout: () => {
    set({ currentUser: null, isAuthenticated: false });
  },
}));