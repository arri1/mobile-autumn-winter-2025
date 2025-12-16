import { create } from 'zustand'
import AsyncStorage from '@react-native-async-storage/async-storage'

interface User {
  name: string;
  email: string;
  password: string;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  register: (name: string, email: string, password: string) => Promise<void>;
  login: (name: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

let mockUser = {
  name: 'mockUser',
  email: 'mockEmail',
  password: 'mockPass'
}
let mockToken = 'mock-token';

const tokenKey = "@token";
const userKey = "@user";

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: false,

  register: async (name: string, email: string, password: string) => {
    try{
      set({isLoading:true});
      let newUser = {name: name, email: email, password: password}
      await AsyncStorage.setItem(tokenKey, mockToken);
      await AsyncStorage.setItem(userKey, JSON.stringify(newUser));
      mockUser = newUser;
      set({
        user: newUser,
        isLoading: false,
      })
    }catch (error){
      set({isLoading:false});
      console.error(`Ошибка регистрации: ${error}`)
    }
  },

  login: async (name: string, password: string) => {
    try{
      set({isLoading:true});
      if(mockUser.name==name && mockUser.password==password){
        let newUser = {name: name, email: mockUser.email, password: password}
        await AsyncStorage.setItem(tokenKey, mockToken);
        await AsyncStorage.setItem(userKey, JSON.stringify(newUser));
        set({
          user: newUser,
        })
      }
      set({
        isLoading: false,
      })
    }catch (error){
      set({isLoading:false});
      console.error(`Ошибка авторизации: ${error}`)
    }
  },

  logout: async () => {
    set({isLoading: true})
    await AsyncStorage.removeItem(tokenKey);
    await AsyncStorage.removeItem(userKey);
    set({
      user: null,
      isLoading: false,
    })
  },

  checkAuth: async () => {
    try{
      set({isLoading:true});
      const token = await AsyncStorage.getItem(tokenKey);
      const userJson = await AsyncStorage.getItem(userKey);
      if(token && userJson){
        const user = JSON.parse(userJson);
        set({user: user})
      }
      set({
        isLoading: false,
      })
    }catch (error){
      set({isLoading:false});
      console.error(`Ошибка проверки: ${error}`)
    }
  }
}))