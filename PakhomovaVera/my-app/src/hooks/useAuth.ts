import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User, AuthState } from '../types';
import { useUserStore } from '../store/userStore';
import { authApi } from '../services/authApi';

const AUTH_STORAGE_KEY = '@auth_data';

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    token: null,
  });
  const [isLoading, setIsLoading] = useState(true);

  const { setUser, clearUser } = useUserStore();

  useEffect(() => {
    loadAuthState();
  }, []);

  const loadAuthState = async () => {
    try {
      const storedAuth = await AsyncStorage.getItem(AUTH_STORAGE_KEY);
      if (storedAuth) {
        const parsedAuth = JSON.parse(storedAuth);
        setAuthState(parsedAuth);
        setUser(parsedAuth.user);
      }
    } catch (error) {
      console.error('Ошибка загрузки состояния аутентификации:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveAuthState = async (state: AuthState) => {
    try {
      await AsyncStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(state));
      setAuthState(state);
      setUser(state.user);
    } catch (error) {
      console.error('Ошибка сохранения состояния аутентификации:', error);
    }
  };

  const register = async (
    email: string,
    password: string,
    name?: string
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      const response = await authApi.register(email, password, name);

      if (response.success && response.data) {
        const newAuthState: AuthState = {
          isAuthenticated: true,
          user: {
            id: response.data.user.id,
            email: response.data.user.email,
            name: response.data.user.name || undefined,
            createdAt: response.data.user.createdAt,
          },
          token: response.data.accessToken,
        };

        await saveAuthState(newAuthState);
        return { success: true };
      } else {
        return {
          success: false,
          error: response.message || 'Ошибка при регистрации',
        };
      }
    } catch (error: any) {
      console.error('Ошибка регистрации:', error);
      
      // Handle validation errors with detailed messages
      let errorMessage = 'Ошибка при регистрации';
      
      if (error.response?.data) {
        const errorData = error.response.data;
        
        // Check for validation errors array
        if (errorData.errors && Array.isArray(errorData.errors) && errorData.errors.length > 0) {
          // Extract first validation error message
          const firstError = errorData.errors[0];
          errorMessage = firstError.msg || errorData.message || errorMessage;
        } else if (errorData.message) {
          errorMessage = errorData.message;
        }
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      return { success: false, error: errorMessage };
    }
  };

  const login = async (
    email: string,
    password: string
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      const response = await authApi.login(email, password);

      if (response.success && response.data) {
        const newAuthState: AuthState = {
          isAuthenticated: true,
          user: {
            id: response.data.user.id,
            email: response.data.user.email,
            name: response.data.user.name || undefined,
            createdAt: response.data.user.createdAt,
          },
          token: response.data.accessToken,
        };

        await saveAuthState(newAuthState);
        return { success: true };
      } else {
        return {
          success: false,
          error: response.message || 'Ошибка при входе',
        };
      }
    } catch (error: any) {
      console.error('Ошибка входа:', error);
      const errorMessage =
        error.response?.data?.message || error.message || 'Ошибка при входе';
      return { success: false, error: errorMessage };
    }
  };
  
  const logout = async () => {
    await AsyncStorage.removeItem(AUTH_STORAGE_KEY);
    setAuthState({
      isAuthenticated: false,
      user: null,
      token: null,
    });
    clearUser();
  };

  return {
    authState,
    isLoading,
    register,
    login,
    logout,
  };
};