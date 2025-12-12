import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<boolean>;
    register: (name: string, email: string, password: string) => Promise<boolean>;
    logout: () => Promise<void>;
    getProfile: () => Promise<boolean>;
    refreshToken: () => Promise<boolean>;
    getUsers: () => Promise<User[]>;
    checkAuth: () => Promise<void>;
}

// Ключи для async-storage
const ACCESS_TOKEN_KEY = "@accessToken";
const REFRESH_TOKEN_KEY = "@refreshToken";
const USER_DATA_KEY = "@userData";

//URL для API
const API_URL = "https://cloud.kit-imi.info/api";

export const useAuthStore = create<AuthState>((set, get) => ({
    currentUser: null,
    isAuthenticated: false,
    isLoading: false,

    //Проверка авторизации
    checkAuth: async () => {
        try {
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
        } catch (error) {
            console.error("Ошибка проверки авторизации:", error);
        }
    },

    //Авторизация
    login: async (email: string, password: string) => {
        try {
            set({ isLoading: true });

            const response = await fetch(`${API_URL}/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                // Сохраняем токены и данные пользователя
                await AsyncStorage.setItem(ACCESS_TOKEN_KEY, data.data.accessToken);
                await AsyncStorage.setItem(REFRESH_TOKEN_KEY, data.data.refreshToken);
                await AsyncStorage.setItem(USER_DATA_KEY, JSON.stringify(data.data.user));

                set({
                    currentUser: data.data.user,
                    isAuthenticated: true,
                    isLoading: false,
                });
                return true;
            } else {
                set({ isLoading: false });
                console.error("Ошибка с сервера:", data.message);
                return false;
            }
        } catch (error) {
            console.error("Ошибка входа:", error);
            set({ isLoading: false });
            return false;
        }
    },

    //Регистрация
    register: async (name: string, email: string, password: string) => {
        try {
            set({ isLoading: true});
            //Регистрируем
            const response = await fetch(`${API_URL}/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                // Получаем и сохраняем токены и зарегистрированного пользователя
                await AsyncStorage.setItem(ACCESS_TOKEN_KEY, data.data.accessToken);
                await AsyncStorage.setItem(REFRESH_TOKEN_KEY, data.data.refreshToken);
                await AsyncStorage.setItem(USER_DATA_KEY, JSON.stringify(data.data.user));
                //Сразу авторизуем
                set({
                    currentUser: data.data.user,
                    isAuthenticated: true,
                    isLoading: false
                });
                return true;
            } else {
                set({isLoading: false});
                console.error("Ошибка с сервера:", data.message);
                return false;
            }
        } catch (error) {
            console.error("Ошибка регистрации:", error);
            return false;
        }
    },

    // Получение профиля
    getProfile: async () => {
        try {
            const token = await AsyncStorage.getItem(ACCESS_TOKEN_KEY);

            let response = await fetch(`${API_URL}/auth/profile`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            //Проверка на устаревий токен
            if (response.status === 401) {
                const refreshed = await get().refreshToken();
                if (refreshed) {
                    // Повторяем запрос с новым токеном
                    const newToken = await AsyncStorage.getItem(ACCESS_TOKEN_KEY);
                    response = await fetch(`${API_URL}/auth/profile`, {
                        method: "GET",
                        headers: {
                            "Authorization": `Bearer ${newToken}`
                        },
                    });
                } else {
                    // Не удалось обновить - разлогиниваем
                    await get().logout();
                    return false;
                }
            }

            const data = await response.json();

            if (response.ok) {
                const user = data.data.user;
                await AsyncStorage.setItem(USER_DATA_KEY, JSON.stringify(user));
                set({ currentUser: user });
                return true;
            }
            
            return false;
        } catch (error) {
            console.error("Get profile error:", error);
            return false;
        }
    },

    // Обновление токена
    refreshToken: async () => {
        try {
            const refreshToken = await AsyncStorage.getItem(REFRESH_TOKEN_KEY);

            const response = await fetch(`${API_URL}/auth/refresh`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ refreshToken }),
            });

            const data = await response.json();

            if (response.ok) {
                await AsyncStorage.setItem(ACCESS_TOKEN_KEY, data.data.accessToken);
                await AsyncStorage.setItem(REFRESH_TOKEN_KEY, data.data.refreshToken);
                return true;
            }
            
            return false;
        } catch (error) {
            console.error("Refresh token error:", error);
            return false;
        }
    },

    //Получание пользователей
    getUsers: async () => {
        try {
            const token = await AsyncStorage.getItem(ACCESS_TOKEN_KEY);

            //Просто получаем первую страницу с большим лимитом
            const url = `${API_URL}/auth/users?page=1&limit=100`;

            let response = await fetch(url, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            // Проверка на устаревший токен
            if (response.status === 401) {
                const refreshed = await get().refreshToken();
                if (refreshed) {
                    // Повторяем запрос с новым токеном
                    const newToken = await AsyncStorage.getItem(ACCESS_TOKEN_KEY);
                    response = await fetch(url, {
                        method: "GET",
                        headers: {
                            "Authorization": `Bearer ${newToken}`
                        },
                    });
                } else {
                    // Не удалось обновить - разлогиниваем
                    await get().logout();
                    return null;
                }
            }

            const data = await response.json();

            if (response.ok && data.success) {
                // Возвращаем просто массив пользователей
                return data.data.users;
            }
            
            return null;
        } catch (error) {
            console.error("Get users error:", error);
            return null;
        }
    },

    // Выход
    logout: async () => {
        try {
            const refreshToken = await AsyncStorage.getItem(REFRESH_TOKEN_KEY);
            
            await fetch(`${API_URL}/auth/logout`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ refreshToken }),
            });

            // Очищаем локальное хранилище
            await AsyncStorage.multiRemove([
                ACCESS_TOKEN_KEY,
                REFRESH_TOKEN_KEY,
                USER_DATA_KEY,
            ]);

            set({
                currentUser: null,
                isAuthenticated: false,
                isLoading: false,
            });
        } catch (error) {
            console.error("Logout error:", error);
        }
    },
}));

export type { User };