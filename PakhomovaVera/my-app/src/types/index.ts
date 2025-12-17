export interface Task {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
}

export interface User {
  id: number;
  email: string;
  name?: string;
  createdAt: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
}

export interface RegisterData {
  email: string;
  password: string;
  name?: string;
}

export interface LoginData {
  email: string;
  password: string;
}
export interface Task {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
}

export interface User {
  id: number;
  email: string;
  name?: string;
  createdAt: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
}

export interface RegisterData {
  email: string;
  password: string;
  name?: string;
}

export interface LoginData {
  email: string;
  password: string;
}