import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persist, createJSONStorage } from 'zustand/middleware';

export const useAppStore = create(
  persist(
    (set, get) => ({
      // Только UI состояние
      activeScreen: 'home',
      
      // Состояние для UseStateScreen
      count: 0,
      useStateText: 'SYSTEM_READY',
      useStateActive: false,
      
      // Состояние для UseMemoScreen
      usersCount: 50,
      tempUsersCount: 50,
      
      // Действия для навигации
      setActiveScreen: (screen) => set({ activeScreen: screen }),
      
      // Действия для UseStateScreen
      incrementCount: () => set((state) => ({ count: state.count + 1 })),
      decrementCount: () => set((state) => ({ 
        count: Math.max(0, state.count - 1) 
      })),
      resetCount: () => set({ count: 0 }),
      setCount: (count) => set({ count }),
      toggleUseStateText: () => set((state) => ({ 
        useStateText: state.useStateText === 'SYSTEM_READY' ? 'SYSTEM_UNREADY' : 'SYSTEM_READY' 
      })),
      setUseStateText: (text) => set({ useStateText: text }),
      toggleUseStateActive: () => set((state) => ({ useStateActive: !state.useStateActive })),
      setUseStateActive: (active) => set({ useStateActive: active }),
      
      // Действия для UseMemoScreen
      setUsersCount: (count) => set({ usersCount: count }),
      setTempUsersCount: (count) => set({ tempUsersCount: count }),
      
      // Геттеры
      getUserRole: () => {
        return 'user'; // Теперь роль берется из authStore
      },
      
      getUserName: () => {
        return 'User'; // Теперь имя берется из authStore
      },
    }),
    {
      name: 'app-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        activeScreen: state.activeScreen,
        count: state.count,
        useStateText: state.useStateText,
        useStateActive: state.useStateActive,
        usersCount: state.usersCount,
      }),
    }
  )
);