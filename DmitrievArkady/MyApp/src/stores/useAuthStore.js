import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authAPI, userAPI, setTokens, clearTokens } from '../services/api';

const USER_STORAGE_KEY = '@current_user';

export const useAuthStore = create((set, get) => ({
  currentUser: null,
  isAuthenticated: false,
  isLoading: false,

  initializeAuth: async () => {
    try {
      const userString = await AsyncStorage.getItem(USER_STORAGE_KEY);
      if (!userString) return;

      const user = JSON.parse(userString);
      
      // Проверяем валидность токена
      const isValid = await authAPI.validate();
      if (isValid) {
        set({ currentUser: user, isAuthenticated: true });
      } else {
        await get().clearLocalAuth();
      }
    } catch {
      await get().clearLocalAuth();
    }
  },

  authenticate: async (apiCall) => {
    try {
      set({ isLoading: true });
      const response = await apiCall();

      if (response.success) {
        const { user, accessToken, refreshToken } = response.data;
        await setTokens(accessToken, refreshToken);
        await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
        
        set({
          currentUser: user,
          isAuthenticated: true,
          isLoading: false
        });
        return { success: true, data: user };
      }
      
      set({ isLoading: false });
      return { success: false, error: response.message };
    } catch (error) {
      set({ isLoading: false });
      return { success: false, error: 'Сетевая ошибка' };
    }
  },

  register: (name, email, password) =>
    get().authenticate(() => authAPI.register(name, email, password)),

  login: (email, password) =>
    get().authenticate(() => authAPI.login(email, password)),

  logout: async () => {
    await authAPI.logout();
    await get().clearLocalAuth();
    set({ currentUser: null, isAuthenticated: false, isLoading: false });
  },

  getUsers: async (page, limit) => {
    const response = await userAPI.getUsers(page, limit);
    return response.success
      ? { success: true, ...response.data }
      : { success: false, error: response.message };
  },

  deleteAccount: async () => {
    const { currentUser } = get();
    const response = await userAPI.deleteAccount(currentUser.id);
    
    if (response.success) {
      await get().logout();
      return { success: true };
    }
    return { success: false, error: response.message };
  },

  updateProfile: async (updates) => {
    const { currentUser } = get();
    const response = await userAPI.updateProfile(currentUser.id, updates);
    
    if (response.success) {
      const updatedUser = { ...currentUser, ...response.data.user };
      await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(updatedUser));
      set({ currentUser: updatedUser });
      return { success: true, data: updatedUser };
    }
    return { success: false, error: response.message };
  },

  clearLocalAuth: async () => {
    await Promise.all([
      clearTokens(),
      AsyncStorage.removeItem(USER_STORAGE_KEY)
    ]);
  }
}));