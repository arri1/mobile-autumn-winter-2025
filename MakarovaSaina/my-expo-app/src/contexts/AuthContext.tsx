import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Alert } from 'react-native';

type User = {
  id: string;
  username: string;
  name: string;
};

type AuthContextType = {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (username: string, password: string, name: string) => Promise<boolean>;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const demoUsers = [
  {
    id: '1',
    username: 'user',
    password: 'password123',
    name: 'Мяу?'
  },
];

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (username: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const foundUser = demoUsers.find(
        u => u.username.toLowerCase() === username.toLowerCase() && u.password === password
      );
      
      if (foundUser) {
        const { password: _, ...userWithoutPassword } = foundUser;
        setUser(userWithoutPassword);
        setIsLoading(false);
        return true;
      } else {
        setIsLoading(false);
        return false;
      }
    } catch (error) {
      setIsLoading(false);
      return false;
    }
  };

  const register = async (username: string, password: string, name: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const userExists = demoUsers.some(u => u.username.toLowerCase() === username.toLowerCase());
      if (userExists) {
        Alert.alert('Ошибка', 'Пользователь с таким логином уже существует');
        setIsLoading(false);
        return false;
      }
            
      if (!username || !password || !name) {
        Alert.alert('Ошибка', 'Все поля обязательны для заполнения');
        setIsLoading(false);
        return false;
      }
      
      if (username.length < 3) {
        Alert.alert('Ошибка', 'Логин должен содержать минимум 3 символа');
        setIsLoading(false);
        return false;
      }
      
      if (password.length < 6) {
        Alert.alert('Ошибка', 'Пароль должен содержать минимум 6 символов');
        setIsLoading(false);
        return false;
      }

      const newUser = {
        id: Date.now().toString(),
        username: username.toLowerCase(),
        name: name.trim()
      };
      
      setUser(newUser);
      setIsLoading(false);
      
      Alert.alert('Yup!', 'Аккаунт успешно создан!');
      return true;
    } catch (error) {
      setIsLoading(false);
      Alert.alert('Oh no!', 'Не удалось создать аккаунт');
      return false;
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};