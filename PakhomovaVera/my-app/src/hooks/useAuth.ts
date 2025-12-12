import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { database } from '../database/database';
import { User, AuthState } from '../types';
import * as Crypto from 'expo-crypto';

const AUTH_STORAGE_KEY = '@auth_data';

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    token: null,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadAuthState();
  }, []);

  const loadAuthState = async () => {
    try {
      const storedAuth = await AsyncStorage.getItem(AUTH_STORAGE_KEY);
      if (storedAuth) {
        const parsedAuth = JSON.parse(storedAuth);
        setAuthState(parsedAuth);
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
    } catch (error) {
      console.error('Ошибка сохранения состояния аутентификации:', error);
    }
  };

  const hashPassword = async (password: string): Promise<string> => {
    return await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      password
    );
  };

  const register = async (
    email: string,
    password: string,
    name?: string
  ): Promise<{ success: boolean; error?: string }> => {
    try {      
      const existingUser = await database.getUserByEmail(email);
      if (existingUser) {
        return { success: false, error: 'Пользователь с таким email уже существует' };
      }
      
      const hashedPassword = await hashPassword(password);
      
      const userId = await database.createUser(email, hashedPassword, name);
      
      if (userId) {
        const user = await database.getUserById(userId);
        if (user) {          
          const token = await hashPassword(`${email}${Date.now()}`);
          
          const newAuthState: AuthState = {
            isAuthenticated: true,
            user: {
              id: user.id,
              email: user.email,
              name: user.name,
              createdAt: user.createdAt,
            },
            token,
          };

          await saveAuthState(newAuthState);
          return { success: true };
        }
      }

      return { success: false, error: 'Ошибка при создании пользователя' };
    } catch (error) {
      console.error(' Ошибка регистрации:', error);
      return { success: false, error: 'Ошибка при регистрации' };
    }
  };

  const login = async (
    email: string,
    password: string
  ): Promise<{ success: boolean; error?: string }> => {
    try {      
      const user = await database.getUserByEmail(email);
      if (!user) {
        return { success: false, error: 'Пользователь не найден' };
      }
      
      const hashedPassword = await hashPassword(password);
      if (user.password !== hashedPassword) {
        return { success: false, error: 'Неверный пароль' };
      }
      
      const token = await hashPassword(`${email}${Date.now()}`);
      
      const newAuthState: AuthState = {
        isAuthenticated: true,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          createdAt: user.createdAt,
        },
        token,
      };

      await saveAuthState(newAuthState);
      return { success: true };
    } catch (error) {
      console.error('Ошибка входа:', error);
      return { success: false, error: 'Ошибка при входе' };
    }
  };
  
  const logout = async () => {
    await AsyncStorage.removeItem(AUTH_STORAGE_KEY);
    setAuthState({
      isAuthenticated: false,
      user: null,
      token: null,
    });
  };

  return {
    authState,
    isLoading,
    register,
    login,
    logout,
  };
};