import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  id: number;
  email: string;
  name?: string;
  createdAt: string;
}

interface UserStore {
  user: User | null;
  setUser: (user: User | null) => void;
  updateUserName: (name: string) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      
      setUser: (user) => set({ user }),
      
      updateUserName: (name) => 
        set((state) => ({
          user: state.user ? { ...state.user, name } : null
        })),
      
      clearUser: () => set({ user: null }),
    }),
    {
      name: 'user-storage', // имя для AsyncStorage
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);