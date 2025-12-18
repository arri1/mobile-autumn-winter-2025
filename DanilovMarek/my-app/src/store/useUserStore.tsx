import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Login, Register, GetProfile, RefreshToken, GetUsers, Logout } from "../services/UserApi";

interface User {
    id: string;
    email: string;
    name: string;
    role: string;
    createdAt: string;
    updatedAt: string;
}

interface UseUserState {
    currentUser: User | null;
    isAuthenticated: boolean;
    login: (email: string, password: string) => void;
    register: (name: string, email: string, password: string) => void;
    logout: () => void;
    getProfile: () => void;
    refreshToken: () => void;
    getUsers: () => Promise<User[]>;
    checkAuth: () => Promise<void>;
}

// Ключи для async-storage
const ACCESS_TOKEN_KEY = "@accessToken";
const REFRESH_TOKEN_KEY = "@refreshToken";
const USER_DATA_KEY = "@userData";

//URL для API
const API_URL = "https://cloud.kit-imi.info/api";

export const useUserStore = create<UseUserState>((set, get) => ({
    currentUser: null,
    isAuthenticated: false,

    //Проверка авторизации
    checkAuth: async () => {
        //Дастаем токен и данные
        let token = await AsyncStorage.getItem(ACCESS_TOKEN_KEY);
        let userData = await AsyncStorage.getItem(USER_DATA_KEY);
        //Проверка был ли уже авторизован
        if (token && userData) {
            set({ 
                currentUser: JSON.parse(userData),
                isAuthenticated: true 
            });  
            //Гарантия актульного токена
            await get().getProfile();          
        }
    },

    //Авторизация
    login: async (email: string, password: string) => {
        try {
            const { accessToken, refreshToken, user } = await Login(email, password);

            await AsyncStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
            await AsyncStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
            await AsyncStorage.setItem(USER_DATA_KEY, JSON.stringify(user));

            set({
                currentUser: user,
                isAuthenticated: true,
            });
        }
        catch(error) {
            console.error(error);
        }
    },

    //Регистрация
    register: async (name: string, email: string, password: string) => {
        try {
            const { accessToken, refreshToken, user } = await Register(name, email, password);

            await AsyncStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
            await AsyncStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
            await AsyncStorage.setItem(USER_DATA_KEY, JSON.stringify(user));

            set({
                currentUser: user,
                isAuthenticated: true,
            });
        } catch(error) {
            console.error(error);
        }
    },

    // Получение профиля
    getProfile: async () => {
        try {
            let accessToken = await AsyncStorage.getItem(ACCESS_TOKEN_KEY) as string;

            let user = await GetProfile(accessToken);
            if (user == null) {
                await get().refreshToken();
                accessToken = await AsyncStorage.getItem(ACCESS_TOKEN_KEY) as string;
                user = await GetProfile(accessToken)
            }

            await AsyncStorage.setItem(USER_DATA_KEY, JSON.stringify(user));
            set({ currentUser: user });
        }
        catch(error) {
            console.error(error);
        }    
    },

    // Обновление токена
    refreshToken: async () => {
        try {
            const refreshToken = await AsyncStorage.getItem(REFRESH_TOKEN_KEY) as string;

            const refreshedTokens = await RefreshToken(refreshToken);
            if (refreshedTokens == null) {
                await get().logout();
                return;
            }

            await AsyncStorage.setItem(ACCESS_TOKEN_KEY, refreshedTokens?.newAccessToken);
            await AsyncStorage.setItem(REFRESH_TOKEN_KEY, refreshedTokens?.newRefreshToken);
        }
        catch(error) {
            console.error(error);
        }
        
    },

    //Получание пользователей
    getUsers: async () => {
        try {
            let accessToken = await AsyncStorage.getItem(ACCESS_TOKEN_KEY) as string;

            let users = await GetUsers(accessToken);

            if (users == null) {
                await get().refreshToken();
                accessToken = await AsyncStorage.getItem(ACCESS_TOKEN_KEY) as string;
                users = await GetUsers(accessToken);
            }
            return users;
        }
        catch(error) {
            console.error(error);
        }
    },

    // Выход
    logout: async () => {
        let refreshToken = await AsyncStorage.getItem(REFRESH_TOKEN_KEY) as string;
        
        const response = await Logout(refreshToken);

        if (response == null) {
            await get().refreshToken();
            refreshToken = await AsyncStorage.getItem(REFRESH_TOKEN_KEY) as string;
            await Logout(refreshToken);
        }

        // Очищаем локальное хранилище
        await AsyncStorage.multiRemove([
            ACCESS_TOKEN_KEY,
            REFRESH_TOKEN_KEY,
            USER_DATA_KEY,
        ]);

        set({
            currentUser: null,
            isAuthenticated: false,
        });
    },
}));

export type { User };
export {ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY};