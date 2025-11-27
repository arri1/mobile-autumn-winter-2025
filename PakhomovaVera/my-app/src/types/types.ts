export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
}

export interface User {
  username: string;
  isLoggedIn: boolean;
}