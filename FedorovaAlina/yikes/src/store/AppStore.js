import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persist, createJSONStorage } from 'zustand/middleware';

// Демо пользователи
const demoUsers = [
  { id: 1, username: 'admin', password: 'admin123', role: 'admin' },
  { id: 2, username: 'user', password: 'user123', role: 'user' },
  { id: 3, username: 'guest', password: 'guest123', role: 'guest' },
];

export const useAppStore = create(
  persist(
    (set, get) => ({
      // Состояние авторизации
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      
      // Состояние навигации
      activeScreen: 'home',
      
      // Состояние для UseStateScreen
      count: 0,
      useStateText: 'SYSTEM_READY',
      useStateActive: false,
      
      // Состояние для UseEffectScreen
      userId: 1,
      effectUser: null,
      effectLoading: false,
      effectError: null,
      effectSeconds: 0,
      effectAutoRefresh: true,
      effectName: '',
      effectGreeting: 'SYSTEM_GUEST_MODE',
      effectClickCount: 0,
      effectUsersList: [],
      
      // Состояние для UseMemoScreen
      sortingLoading: false,
      usersCount: 50,
      tempUsersCount: 50,
      sortedUsers: [], // Добавить
      userStats: null, // Добавить
      
      // Действия для авторизации
      login: async (username, password) => {
        set({ isLoading: true, error: null });
        
        // Имитация асинхронного запроса
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const foundUser = demoUsers.find(
          user => user.username === username && user.password === password
        );
        
        if (foundUser) {
          const userData = {
            ...foundUser,
            lastLogin: new Date().toISOString()
          };
          
          // Сохраняем в AsyncStorage
          await AsyncStorage.setItem('user', JSON.stringify(userData));
          
          set({
            user: userData,
            isAuthenticated: true,
            isLoading: false,
            error: null
          });
          
          return { success: true, user: userData };
        } else {
          set({
            isLoading: false,
            error: 'Invalid credentials'
          });
          return { success: false };
        }
      },
      
      checkAuthStatus: async () => {
        try {
          const user = await AsyncStorage.getItem('user');
          if (user) {
            set({
              user: JSON.parse(user),
              isAuthenticated: true
            });
          }
        } catch (error) {
          console.error('Error checking auth status:', error);
        }
      },
      
      logout: async () => {
        await AsyncStorage.removeItem('user');
        set({
          user: null,
          isAuthenticated: false,
          error: null,
          activeScreen: 'home'
        });
      },
      
      // Действия для навигации
      setActiveScreen: (screen) => set({ activeScreen: screen }),
      
      // Действия для UseStateScreen
      incrementCount: () => {
        set((state) => ({ count: state.count + 1 }));
      },
      
      decrementCount: () => {
        set((state) => ({ 
          count: Math.max(0, state.count - 1) 
        }));
      },
      
      resetCount: () => set({ count: 0 }),
      
      setCount: (count) => set({ count }),
      
      toggleUseStateText: () => {
        set((state) => ({ 
          useStateText: state.useStateText === 'SYSTEM_READY' ? 'SYSTEM_UNREADY' : 'SYSTEM_READY' 
        }));
      },
      
      setUseStateText: (text) => set({ useStateText: text }),
      
      toggleUseStateActive: () => {
        set((state) => ({ useStateActive: !state.useStateActive }));
      },
      
      setUseStateActive: (active) => set({ useStateActive: active }),
      
      // Действия для UseEffectScreen
      setUserId: (id) => set({ userId: id }),
      
      setEffectUser: (user) => set({ effectUser: user }),
      
      setEffectLoading: (loading) => set({ effectLoading: loading }),
      
      setEffectError: (error) => set({ effectError: error }),
      
      setEffectSeconds: (seconds) => set({ effectSeconds: seconds }),
      
      toggleEffectAutoRefresh: () => {
        set((state) => ({ effectAutoRefresh: !state.effectAutoRefresh }));
      },
      
      setEffectAutoRefresh: (value) => set({ effectAutoRefresh: value }),
      
      setEffectName: (name) => set({ effectName: name }),
      
      setEffectGreeting: (greeting) => set({ effectGreeting: greeting }),
      
      incrementEffectClickCount: () => {
        set((state) => ({ effectClickCount: state.effectClickCount + 1 }));
      },
      
      resetEffectClickCount: () => set({ effectClickCount: 0 }),
      
      setEffectClickCount: (count) => set({ effectClickCount: count }),
      
      setEffectUsersList: (users) => set({ effectUsersList: users }),
      
      // Действия для UseMemoScreen
      setSortingLoading: (loading) => set({ sortingLoading: loading }),
      
      setUsersCount: (count) => set({ usersCount: count }),
      
      setTempUsersCount: (count) => set({ tempUsersCount: count }),
      
      setSortedUsers: (users) => set({ sortedUsers: users }),
      
      setUserStats: (stats) => set({ userStats: stats }),
      
      // Геттеры
      getUserRole: () => {
        const user = get().user;
        return user ? user.role : 'guest';
      },
      
      getUserName: () => {
        const user = get().user;
        return user ? user.username : 'Guest';
      },
      
      // Комбинированные действия
      handleRandomUser: () => {
        const randomId = 1 + Math.floor(Math.random() * 10);
        set({ userId: randomId });
      }
    }),
    {
      name: 'app-storage',
      storage: createJSONStorage(() => AsyncStorage),
      // Выбираем какие поля сохранять
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        count: state.count,
        useStateText: state.useStateText,
        useStateActive: state.useStateActive,
        usersCount: state.usersCount,
        effectAutoRefresh: state.effectAutoRefresh,
        effectName: state.effectName
      }),
    }
  )
);
