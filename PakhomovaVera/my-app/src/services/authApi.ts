import { api } from './api';
import { User } from '../types';

interface AuthResponse {
  success: boolean;
  message?: string;
  data: {
    user: User;
    accessToken: string;
    refreshToken?: string;
  };
}

interface LoginRequest {
  email: string;
  password: string;
}

interface RegisterRequest {
  email: string;
  password: string;
  name?: string;
}

export const authApi = {
  // Login
  login: async (email: string, password: string): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/api/auth/login', {
      email,
      password,
    } as LoginRequest);
    return response.data;
  },

  // Register
  register: async (
    email: string,
    password: string,
    name?: string
  ): Promise<AuthResponse> => {
    // Build request body - only include name if it's not empty
    const requestBody: RegisterRequest = {
      email,
      password,
    };
    
    // Only include name if it's provided and not empty
    if (name && name.trim().length > 0) {
      requestBody.name = name.trim();
    }
    
    const response = await api.post<AuthResponse>('/api/auth/register', requestBody);
    return response.data;
  },
};

