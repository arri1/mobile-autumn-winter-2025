// src/store/useUserStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  username: string;
  name: string;
}

interface UserState {
  users: User[];
  currentUser: User | null;
  addUser: (user: Omit<User, 'id'>) => void;
  removeUser: (id: string) => void;
  updateUser: (id: string, user: Partial<User>) => void;
  setCurrentUser: (user: User | null) => void;
  clearUsers: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      users: [
        { id: '1', username: 'user', name: 'Тестовый Пользователь' },
        { id: '2', username: 'admin', name: 'Администратор' },
        { id: '3', username: 'student', name: 'Студент' },
      ],
      currentUser: null,
      addUser: (user) => 
        set((state) => ({ 
          users: [...state.users, { ...user, id: Date.now().toString() }] 
        })),
      removeUser: (id) => 
        set((state) => ({ 
          users: state.users.filter(user => user.id !== id) 
        })),
      updateUser: (id, updatedUser) =>
        set((state) => ({
          users: state.users.map(user =>
            user.id === id ? { ...user, ...updatedUser } : user
          )
        })),
      setCurrentUser: (user) => set({ currentUser: user }),
      clearUsers: () => set({ users: [] }),
    }),
    {
      name: 'user-storage',
    }
  )
);