import { create } from 'zustand';

interface User {
  id: string;
  name: string;
  username: string;
}

interface UserState {
  users: User[];
  currentUser: User | null;
  addUser: (user: Omit<User, 'id'>) => void;
  removeUser: (id: string) => void;
  setCurrentUser: (user: User | null) => void;
}

export const useUserStore = create<UserState>((set, get) => ({
  users: [],
  currentUser: null,
  
  addUser: (userData) => {
    const newUser: User = {
      ...userData,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
    };
    
    set((state) => ({
      users: [...state.users, newUser],
    }));
  },
  
  removeUser: (id) => {
    set((state) => ({
      users: state.users.filter(user => user.id !== id),
      currentUser: state.currentUser?.id === id ? null : state.currentUser,
    }));
  },
  
  setCurrentUser: (user) => {
    set({ currentUser: user });
  },
}));