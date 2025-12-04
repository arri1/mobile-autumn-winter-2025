import { create } from 'zustand';
import * as Crypto from 'expo-crypto';
import AsyncStorage from '@react-native-async-storage/async-storage';

const USERS_KEY = 'AUTH_USERS';
const CURRENT_USER_KEY = 'AUTH_CURRENT_USER';

const isValidEmail = (value) => {
  const email = String(value).trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const useAuthStore = create((set, get) => ({
  user: null,
  isLoading: false,
  isUsersLoading: false,
  error: null,
  users: [],
  
  _getUsers: async () => {
    const usersJson = await AsyncStorage.getItem(USERS_KEY);
    return usersJson ? JSON.parse(usersJson) : [];
  },
  
  _setUsers: async (users) => {
    await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));
  },
  
  _loadStateFromStorage: async () => {
    try {
      set({ isLoading: true });
      
      const [usersJson, currentUserJson] = await Promise.all([
        AsyncStorage.getItem(USERS_KEY),
        AsyncStorage.getItem(CURRENT_USER_KEY),
      ]);
      
      if (!usersJson) {
        await AsyncStorage.setItem(USERS_KEY, JSON.stringify([]));
      }
      
      const users = usersJson ? JSON.parse(usersJson) : [];
      const currentUser = currentUserJson ? JSON.parse(currentUserJson) : null;
      
      set({ 
        user: currentUser, 
        users, 
        isLoading: false
      });
    } catch (error) {
      set({ isLoading: false });
    }
  },

  loadUsers: async () => {
    set({ isUsersLoading: true, error: null });
    try {
      const users = await get()._getUsers();
      set({ users, isUsersLoading: false });
    } catch (e) {
      set({ isUsersLoading: false, error: e.message || 'Ошибка загрузки пользователей' });
    }
  },

  deleteUser: async (userId) => {
    set({ isUsersLoading: true, error: null });
    try {
      const users = await get()._getUsers();
      const updatedUsers = users.filter(user => user.id !== userId);
      
      await get()._setUsers(updatedUsers);
      set({ users: updatedUsers, isUsersLoading: false });
      
      return true;
    } catch (e) {
      set({ isUsersLoading: false, error: e.message || 'Ошибка удаления пользователя' });
      return false;
    }
  },


  searchUsers: (query) => {
    const { users } = get();
    if (!query.trim()) return users;
    
    return users.filter(user =>
      user.email.toLowerCase().includes(query.toLowerCase())
    );
  },


  getUsersStats: () => {
    const { users } = get();
    return {
      total: users.length,
    };
  },


  login: async ({ email, password }) => {
    set({ isLoading: true, error: null });
    try {
      if (!email || !password) {
        throw new Error('Введите email и пароль');
      }
      if (!isValidEmail(email)) {
        throw new Error('Неверный формат email');
      }
      const normalizedEmail = String(email).trim().toLowerCase();
      const users = await get()._getUsers();
      const found = users.find((u) => u.email === normalizedEmail && 
                                      u.password === password);
      if (!found) {
        throw new Error('Неверный email или пароль');
      }
      const currentUser = { id: found.id, email: found.email };
      await AsyncStorage.setItem(CURRENT_USER_KEY, JSON.stringify(currentUser));
      set({ user: currentUser, isLoading: false, error: null });
    } catch (e) {
      set({ isLoading: false, error: e.message || 'Ошибка входа' });
    }
  },

  register: async ({ email, password }) => {
    set({ isLoading: true, error: null });
    try {
      if (!email || !password) {
        throw new Error('Заполните все поля');
      }
      if (!isValidEmail(email)) {
        throw new Error('Неверный формат email');
      }
      const normalizedEmail = String(email).trim().toLowerCase();
      const users = await get()._getUsers();
      const exists = users.some((u) => u.email === normalizedEmail);
      if (exists) {
        throw new Error('Пользователь с таким email уже существует');
      }
      const newUser = { id: Crypto.randomUUID(), email: normalizedEmail, password };
      const nextUsers = [...users, newUser];
      await get()._setUsers(nextUsers);
      const currentUser = { id: newUser.id, email: newUser.email };
      await AsyncStorage.setItem(CURRENT_USER_KEY, JSON.stringify(currentUser));
      set({ user: currentUser, users: nextUsers, isLoading: false, error: null });
    } catch (e) {
      set({ isLoading: false, error: e.message || 'Ошибка регистрации' });
    }
  },

  logout: async () => {
    try {
      await AsyncStorage.removeItem(CURRENT_USER_KEY);
    } finally {
      set({ user: null });
    }
  },
}));

useAuthStore.getState()._loadStateFromStorage();