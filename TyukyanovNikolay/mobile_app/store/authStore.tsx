import { create } from 'zustand'
import AsyncStorage from '@react-native-async-storage/async-storage'

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

interface AuthState {
  currentUser: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthericated: boolean;
  isLoading: boolean;
  register: (name: string, email: string, password: string) => Promise<void>;
  login: (name: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  getProfile: () => Promise<boolean>;
  updateToken: () => Promise<boolean>;
}

const accessTokenKey = "accessToken";
const refreshTokenKey = "refreshToken";
const currentUserKey = "currentUser";

const api_url = "https://cloud.kit-imi.info/api";

export const useAuthStore = create<AuthState>((set, get) => ({
  currentUser: null,
  accessToken: null,
  refreshToken: null,
  isAuthericated: false,
  isLoading: false,

  register: async (name: string, email: string, password: string) => {
    try{
      set({isLoading:true});

      let user = {email: email, password: password, name: name};
      let userJson = JSON.stringify(user);
      const response = await fetch(`${api_url}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: userJson,
      })

      const data = await response.json();

      if(data.success) {
        await AsyncStorage.setItem(accessTokenKey, data.data.accessToken);
        await AsyncStorage.setItem(refreshTokenKey, data.data.refreshToken);
        await AsyncStorage.setItem(currentUserKey, JSON.stringify(data.data.user));
        set({
          currentUser: data.data.user,
          accessToken: data.data.accessToken,
          refreshToken: data.data.refreshToken,
          isAuthericated: true,
        })
      } else {
        console.error(`Неверная регистрация: ${data.message}`);
      }
      set({isLoading: false})
    }catch (error){
      set({isLoading:false});
      console.error(`Ошибка регистрации: ${error}`)
    }
  },

  login: async (email: string, password: string) => {
    try{
      set({isLoading:true});

      let user = {email: email, password: password};
      let userJson = JSON.stringify(user);
      const response = await fetch(`${api_url}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: userJson,
      })

      const data = await response.json();

      console.log(response.status);

      if(data.success){
        await AsyncStorage.setItem(accessTokenKey, data.data.accessToken);
        await AsyncStorage.setItem(refreshTokenKey, data.data.refreshToken);
        await AsyncStorage.setItem(currentUserKey, JSON.stringify(data.data.user));
        set({
          currentUser: data.data.user, 
          accessToken: data.data.accessToken,
          refreshToken: data.data.refreshToken,
          isAuthericated: true,
        })
      } else {
        console.error(`Неверная авторизация: ${data.message}`);
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
    try{
      const refreshToken = await AsyncStorage.getItem(refreshTokenKey);
      
      const response = await fetch(`${api_url}/auth/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({refreshToken}),
      })

      const data = await response.json();

      if(data.success){
        await AsyncStorage.removeItem(accessTokenKey);
        await AsyncStorage.removeItem(refreshTokenKey);
        await AsyncStorage.removeItem(currentUserKey);
        set({
          currentUser: null, 
          accessToken: null,
          refreshToken: null,
          isAuthericated: false,})
      }
    }catch(error){
      console.error(`Ошибка выхода: ${error}`)
    }
    set({
      isLoading: false,
    })
  },

  checkAuth: async () => {
    try{
      set({isLoading:true});
      const accessToken = await AsyncStorage.getItem(accessTokenKey);
      const refreshToken = await AsyncStorage.getItem(refreshTokenKey);
      const userJson = await AsyncStorage.getItem(currentUserKey);

      if(accessToken && refreshToken && userJson){
        set({
          currentUser: JSON.parse(userJson),
          accessToken: accessToken,
          refreshToken: refreshToken,
          isAuthericated: true,
        });
        const access = await get().getProfile();
        if(!access){
          const refreshed = await get().updateToken();
          if(!refreshed){
            set({
              currentUser: null,
              accessToken: null,
              refreshToken: null,
              isAuthericated: false,
            })
          }else{
            await get().getProfile();
          }
        }
      }
      set({isLoading: false})
    }catch (error){
      set({isLoading:false});
      console.error(`Ошибка проверки: ${error}`)
    }
  },

  getProfile: async () => {
    try{
      const response = await fetch(`${api_url}/auth/profile`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${get().accessToken}`,
          'Content-Type': 'application/json',
        }
      })
      const data = await response.json();
      if(data.success){
        set({currentUser: data.data.user})
      }
      return data.success
    }catch{
      return false;
    }
  },

  updateToken: async () => {
    try{
      const response = await fetch(`${api_url}/auth/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken: get().refreshToken })
      })
      const data = await response.json();
      if(data.success){
        await AsyncStorage.setItem(accessTokenKey, data.data.accessToken);
        await AsyncStorage.setItem(refreshTokenKey, data.data.refreshToken);
      }
      return data.success
    }catch{
      return false;
    }
  }
}))