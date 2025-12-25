import { useEffect, useState, ReactNode } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useAuthStore } from '../store/authStore';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthProviderProps {
  children: ReactNode;
}

const TOKEN_KEY = '@auth_token';
const USER_KEY = '@auth_user';

export default function AuthProvider({ children }: AuthProviderProps) {
  const [isLoading, setIsLoading] = useState(true);
  const setAuthState = useAuthStore((state) => state.setAuthState);
  const token = useAuthStore((state) => state.token);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    checkAuth();
  }, []);

  // Синхронизируем токен из store с AsyncStorage при изменении
  useEffect(() => {
    const syncToken = async () => {
      if (token && isAuthenticated) {
        // Проверяем, что токен сохранен в AsyncStorage
        const savedToken = await AsyncStorage.getItem(TOKEN_KEY);
        if (savedToken !== token) {
          // Если токен в store отличается от сохраненного, обновляем AsyncStorage
          const user = useAuthStore.getState().user;
          if (user) {
            await AsyncStorage.setItem(TOKEN_KEY, token);
            await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
          }
        }
      }
    };
    syncToken();
  }, [token, isAuthenticated]);

  const checkAuth = async () => {
    try {
      // Пытаемся загрузить сохраненный токен и пользователя
      const [savedToken, savedUser] = await Promise.all([
        AsyncStorage.getItem(TOKEN_KEY),
        AsyncStorage.getItem(USER_KEY),
      ]);

      if (savedToken && savedUser) {
        // Восстанавливаем состояние из AsyncStorage
        const user = JSON.parse(savedUser);
        setAuthState({
          user,
          token: savedToken,
          isAuthenticated: true,
        });

        // Проверяем валидность токена через API
        const isValid = await validateToken(savedToken);
        
        if (!isValid) {
          // Токен невалиден, очищаем данные
          await clearAuth();
        }
      } else {
        // Нет сохраненных данных
        setAuthState({
          user: null,
          token: null,
          isAuthenticated: false,
        });
      }
    } catch (error) {
      console.error('Auth check error:', error);
      await clearAuth();
    } finally {
      setIsLoading(false);
    }
  };

  const validateToken = async (token: string): Promise<boolean> => {
    try {
      const API_BASE_URL = 'https://cloud.kit-imi.info/api';
      const response = await fetch(`${API_BASE_URL}/auth/profile`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        // Обновляем данные пользователя из ответа
        const user = {
          id: data.user?.id || data.id,
          email: data.user?.email || data.email,
          name: data.user?.name || data.name,
        };
        
        // Сохраняем обновленные данные
        await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
        setAuthState({
          user,
          token,
          isAuthenticated: true,
        });
        
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Token validation error:', error);
      return false;
    }
  };

  const clearAuth = async () => {
    try {
      await Promise.all([
        AsyncStorage.removeItem(TOKEN_KEY),
        AsyncStorage.removeItem(USER_KEY),
      ]);
      setAuthState({
        user: null,
        token: null,
        isAuthenticated: false,
      });
    } catch (error) {
      console.error('Clear auth error:', error);
    }
  };

  // Показываем индикатор загрузки во время проверки авторизации
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return <>{children}</>;
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

