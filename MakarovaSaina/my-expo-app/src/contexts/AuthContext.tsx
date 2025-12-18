import React, { createContext, useContext, useEffect } from 'react';
import { useAuthStore } from '../store/useAuthStore';

type AuthContextType = {
  user: any;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, username?: string) => Promise<boolean>;
  logout: () => Promise<void>;
  clearError: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { 
    user, 
    isLoading, 
    error, 
    login: authLogin, 
    register: authRegister, 
    logout: authLogout,
    clearError: authClearError,
    getCurrentUser 
  } = useAuthStore();

  useEffect(() => {
    getCurrentUser();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      await authLogin({ email, password });
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const register = async (email: string, password: string, name?: string): Promise<boolean> => {
    try {
      await authRegister({ email, password, name });
      return true;
    } catch (error) {
      console.error('Register error:', error);
      return false;
    }
  };

  const logout = async (): Promise<void> => {
    await authLogout();
  };

  const clearError = (): void => {
    authClearError();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        error,
        login,
        register,
        logout,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}