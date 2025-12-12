import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_BASE_URL = "https://cloud.kit-imi.info/api";
const ACCESS_TOKEN_KEY = "@access_token";
const REFRESH_TOKEN_KEY = "@refresh_token";
const USER_STORAGE_KEY = "@current_user";

export const useAuthStore = create((set, get) => ({
    currentUser: null,
    accessToken: null,
    refreshToken: null,
    isAuthenticated: false,
    isLoading: false,

    // Инициализация (проверка сохраненных токенов)
    initializeAuth: async () => {
        try {
            const [accessToken, refreshToken, userString] = await Promise.all([
                AsyncStorage.getItem(ACCESS_TOKEN_KEY),
                AsyncStorage.getItem(REFRESH_TOKEN_KEY),
                AsyncStorage.getItem(USER_STORAGE_KEY)
            ]);

            if (accessToken && refreshToken && userString) {
                const user = JSON.parse(userString);
                set({ 
                    currentUser: user, 
                    accessToken: accessToken,
                    refreshToken: refreshToken,
                    isAuthenticated: true 
                });
                
                // Проверяем валидность токена
                const isValid = await get().validateToken();
                if (!isValid) {
                    // Пробуем обновить токен
                    const refreshed = await get().refreshAuthToken();
                    if (!refreshed) {
                        // Если не удалось обновить - разлогиниваем
                        await get().logout();
                    }
                }
            }
        } catch (error) {
            console.error("Ошибка инициализации аутентификации:", error);
            await get().clearLocalAuth();
        }
    },

    // Регистрация
    register: async (name, email, password) => {
        try {
            set({ isLoading: true });
            
            const response = await fetch(`${API_BASE_URL}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    email,
                    password
                })
            });

            const data = await response.json();

            if (data.success) {
                const { user, accessToken, refreshToken } = data.data;
                
                // Сохраняем токены и пользователя
                await get().saveAuthData(user, accessToken, refreshToken);

                set({
                    currentUser: user,
                    accessToken: accessToken,
                    refreshToken: refreshToken,
                    isAuthenticated: true,
                    isLoading: false
                });

                return { success: true, data: user };
            } else {
                set({ isLoading: false });
                return { 
                    success: false, 
                    error: data.message || 'Ошибка регистрации' 
                };
            }
        } catch (error) {
            console.error("Ошибка регистрации:", error);
            set({ isLoading: false });
            return { 
                success: false, 
                error: 'Сетевая ошибка. Проверьте соединение.' 
            };
        }
    },

    // Вход
    login: async (email, password) => {
        try {
            set({ isLoading: true });
            
            const response = await fetch(`${API_BASE_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password
                })
            });

            const data = await response.json();

            if (data.success) {
                const { user, accessToken, refreshToken } = data.data;
                
                // Сохраняем токены и пользователя
                await get().saveAuthData(user, accessToken, refreshToken);

                set({
                    currentUser: user,
                    accessToken: accessToken,
                    refreshToken: refreshToken,
                    isAuthenticated: true,
                    isLoading: false
                });

                return { success: true, data: user };
            } else {
                set({ isLoading: false });
                return { 
                    success: false, 
                    error: data.message || 'Неверный email или пароль' 
                };
            }
        } catch (error) {
            console.error("Ошибка входа:", error);
            set({ isLoading: false });
            return { 
                success: false, 
                error: 'Сетевая ошибка. Проверьте соединение.' 
            };
        }
    },

    // Обновление access token через refresh token
    refreshAuthToken: async () => {
        try {
            const { refreshToken } = get();
            
            if (!refreshToken) {
                return false;
            }

            const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    refreshToken: refreshToken
                })
            });

            const data = await response.json();

            if (data.success) {
                const { accessToken, refreshToken: newRefreshToken } = data.data;
                
                // Обновляем токены
                await Promise.all([
                    AsyncStorage.setItem(ACCESS_TOKEN_KEY, accessToken),
                    newRefreshToken && AsyncStorage.setItem(REFRESH_TOKEN_KEY, newRefreshToken)
                ]);

                set({
                    accessToken: accessToken,
                    refreshToken: newRefreshToken || get().refreshToken
                });

                return true;
            }
            
            return false;
        } catch (error) {
            console.error("Ошибка обновления токена:", error);
            return false;
        }
    },

    // Выход с отправкой запроса на сервер
    logout: async () => {
        try {
            const { refreshToken } = get();
            
            // Отправляем запрос на logout на сервер
            if (refreshToken) {
                await fetch(`${API_BASE_URL}/auth/logout`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        refreshToken: refreshToken
                    })
                }).catch(error => {
                    console.error("Ошибка отправки logout на сервер:", error);
                });
            }
        } catch (error) {
            console.error("Ошибка при logout:", error);
        } finally {
            // Всегда очищаем локальные данные
            await get().clearLocalAuth();
            
            set({
                currentUser: null,
                accessToken: null,
                refreshToken: null,
                isAuthenticated: false,
                isLoading: false
            });
        }
    },

    // Получение списка пользователей (с автоповтором при истечении токена)
    getUsers: async (page = 1, limit = 10) => {
        try {
            const { accessToken } = get();
            
            if (!accessToken) {
                throw new Error('Требуется авторизация');
            }

            const response = await fetch(
                `${API_BASE_URL}/auth/users?page=${page}&limit=${limit}`, 
                {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'application/json',
                    }
                }
            );

            // Если токен истек, пробуем обновить
            if (response.status === 401) {
                const refreshed = await get().refreshAuthToken();
                if (refreshed) {
                    // Повторяем запрос с новым токеном
                    return await get().getUsers(page, limit);
                } else {
                    // Если не удалось обновить - разлогиниваем
                    await get().logout();
                    throw new Error('Сессия истекла. Пожалуйста, войдите снова.');
                }
            }

            const data = await response.json();

            if (data.success) {
                return { 
                    success: true, 
                    users: data.data.users,
                    pagination: data.data.pagination
                };
            } else {
                return { 
                    success: false, 
                    error: data.message || 'Ошибка получения пользователей' 
                };
            }
        } catch (error) {
            console.error("Ошибка получения пользователей:", error);
            return { 
                success: false, 
                error: error.message || 'Сетевая ошибка' 
            };
        }
    },

    // Удаление аккаунта
    deleteAccount: async () => {
        try {
            const { accessToken, currentUser } = get();
            
            if (!accessToken || !currentUser) {
                throw new Error('Требуется авторизация');
            }

            const response = await fetch(`${API_BASE_URL}/auth/users/${currentUser.id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                }
            });

            // Если токен истек, пробуем обновить
            if (response.status === 401) {
                const refreshed = await get().refreshAuthToken();
                if (refreshed) {
                    // Повторяем запрос с новым токеном
                    return await get().deleteAccount();
                }
            }

            const data = await response.json();

            if (data.success) {
                // Очищаем локальные данные
                await get().logout();
                return { success: true };
            } else {
                return { 
                    success: false, 
                    error: data.message || 'Ошибка удаления аккаунта' 
                };
            }
        } catch (error) {
            console.error("Ошибка удаления аккаунта:", error);
            return { 
                success: false, 
                error: error.message || 'Сетевая ошибка' 
            };
        }
    },

    // Проверка валидности токена
    validateToken: async () => {
        try {
            const { accessToken } = get();
            
            if (!accessToken) return false;

            const response = await fetch(`${API_BASE_URL}/auth/validate`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                }
            });

            return response.ok;
        } catch (error) {
            console.error("Ошибка проверки токена:", error);
            return false;
        }
    },

    // Сохранение данных аутентификации локально
    saveAuthData: async (user, accessToken, refreshToken) => {
        await Promise.all([
            AsyncStorage.setItem(ACCESS_TOKEN_KEY, accessToken),
            AsyncStorage.setItem(REFRESH_TOKEN_KEY, refreshToken),
            AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user))
        ]);
    },

    // Очистка локальных данных аутентификации
    clearLocalAuth: async () => {
        await Promise.all([
            AsyncStorage.removeItem(ACCESS_TOKEN_KEY),
            AsyncStorage.removeItem(REFRESH_TOKEN_KEY),
            AsyncStorage.removeItem(USER_STORAGE_KEY)
        ]);
    },

    // Обновление профиля пользователя
    updateProfile: async (updates) => {
        try {
            const { accessToken, currentUser } = get();
            
            if (!accessToken || !currentUser) {
                throw new Error('Требуется авторизация');
            }

            const response = await fetch(`${API_BASE_URL}/auth/users/${currentUser.id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updates)
            });

            // Если токен истек, пробуем обновить
            if (response.status === 401) {
                const refreshed = await get().refreshAuthToken();
                if (refreshed) {
                    return await get().updateProfile(updates);
                }
            }

            const data = await response.json();

            if (data.success) {
                const updatedUser = { ...currentUser, ...data.data.user };
                
                // Обновляем локально
                await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(updatedUser));
                set({ currentUser: updatedUser });
                
                return { success: true, data: updatedUser };
            } else {
                return { 
                    success: false, 
                    error: data.message || 'Ошибка обновления профиля' 
                };
            }
        } catch (error) {
            console.error("Ошибка обновления профиля:", error);
            return { 
                success: false, 
                error: error.message || 'Сетевая ошибка' 
            };
        }
    }
}));