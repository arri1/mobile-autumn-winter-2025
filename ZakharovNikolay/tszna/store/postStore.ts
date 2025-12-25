import { create } from 'zustand';
import { useAuthStore } from './authStore';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Post {
  id: number;
  title: string;
  content: string;
  authorId: number;
  author?: {
    id: number;
    email: string;
    name?: string;
  };
  createdAt: string;
  updatedAt: string;
}

interface PostState {
  posts: Post[];
  myPosts: Post[];
  currentPost: Post | null;
  loading: boolean;
  error: string | null;
  
  // Получить все посты
  fetchPosts: (page?: number, limit?: number) => Promise<void>;
  
  // Получить мои посты
  fetchMyPosts: (page?: number, limit?: number) => Promise<void>;
  
  // Получить пост по ID
  fetchPostById: (id: number) => Promise<void>;
  
  // Создать пост
  createPost: (title: string, content: string) => Promise<{ ok: boolean; error?: string }>;
  
  // Обновить пост (полная замена)
  updatePost: (id: number, title: string, content: string) => Promise<{ ok: boolean; error?: string }>;
  
  // Правка поста (частичное обновление, можно менять только нужные поля)
  editPost: (id: number, payload: { title?: string; content?: string; published?: boolean }) => Promise<{ ok: boolean; error?: string }>;
  
  // Удалить пост
  deletePost: (id: number) => Promise<{ ok: boolean; error?: string }>;
  
  // Очистить текущий пост
  clearCurrentPost: () => void;
}

const API_BASE_URL = 'https://cloud.kit-imi.info/api';

export const usePostStore = create<PostState>((set, get) => ({
  posts: [],
  myPosts: [],
  currentPost: null,
  loading: false,
  error: null,

  fetchPosts: async (page = 1, limit = 20) => {
    set({ loading: true, error: null });
    try {
      const token = useAuthStore.getState().token;
      const response = await fetch(
        `${API_BASE_URL}/posts?page=${page}&limit=${limit}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            ...(token && { Authorization: `Bearer ${token}` }),
          },
        }
      );

      if (!response.ok) {
        const text = await response.text().catch(() => '');
        throw new Error(text || `Ошибка загрузки постов (${response.status})`);
      }

      const data = await response.json();
      const envelope = data?.data || data;
      set({ 
        posts: envelope?.posts || data.posts || data.data || [],
        loading: false 
      });
    } catch (error: any) {
      console.error('Fetch posts error:', error);
      set({ 
        error: error.message || 'Ошибка загрузки постов',
        loading: false 
      });
    }
  },

  fetchMyPosts: async (page = 1, limit = 20) => {
    set({ loading: true, error: null });
    try {
      const token = useAuthStore.getState().token;
      if (!token) {
        throw new Error('Требуется авторизация');
      }

      const response = await fetch(
        `${API_BASE_URL}/posts/my?page=${page}&limit=${limit}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const text = await response.text().catch(() => '');
        let errorMessage = text || `Ошибка загрузки моих постов (${response.status})`;
        
        // Проверяем, не истек ли токен
        try {
          const errorData = JSON.parse(text);
          if (errorData.message === 'Token expired' || response.status === 401) {
            // Токен истек, выполняем logout
            await useAuthStore.getState().logout();
            errorMessage = 'Сессия истекла. Пожалуйста, войдите снова.';
          }
        } catch (e) {
          // Если не удалось распарсить JSON, проверяем текст
          if (text.includes('Token expired') || text.includes('token expired') || response.status === 401) {
            await useAuthStore.getState().logout();
            errorMessage = 'Сессия истекла. Пожалуйста, войдите снова.';
          }
        }
        
        throw new Error(errorMessage);
      }

      const data = await response.json();
      const envelope = data?.data || data;
      set({ 
        myPosts: envelope?.posts || data.posts || data.data || [],
        loading: false 
      });
    } catch (error: any) {
      // Не логируем ошибку, если это истекший токен (уже обработано выше)
      if (!error.message?.includes('Сессия истекла')) {
        console.error('Fetch my posts error:', error);
      }
      set({ 
        error: error.message || 'Ошибка загрузки моих постов',
        loading: false 
      });
    }
  },

  fetchPostById: async (id: number) => {
    set({ loading: true, error: null });
    try {
      const token = useAuthStore.getState().token;
      const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });

      if (!response.ok) {
        const text = await response.text().catch(() => '');
        throw new Error(text || `Ошибка загрузки поста (${response.status})`);
      }

      const data = await response.json();
      const envelope = data?.data || data;
      set({ 
        currentPost: envelope?.post || data.post || data,
        loading: false 
      });
    } catch (error: any) {
      console.error('Fetch post by id error:', error);
      set({ 
        error: error.message || 'Ошибка загрузки поста',
        loading: false 
      });
    }
  },

  createPost: async (title: string, content: string) => {
    try {
      const authState = useAuthStore.getState();
      let token = authState.token;
      
      // Если токена нет в store, пытаемся получить из AsyncStorage
      if (!token) {
        try {
          token = await AsyncStorage.getItem('@auth_token');
          console.log('Token retrieved from AsyncStorage:', token ? 'Token exists' : 'No token');
          
          // Если нашли токен в AsyncStorage, обновляем store
          if (token) {
            const savedUser = await AsyncStorage.getItem('@auth_user');
            if (savedUser) {
              const user = JSON.parse(savedUser);
              useAuthStore.getState().setAuthState({
                user,
                token,
                isAuthenticated: true,
              });
            }
          }
        } catch (storageError) {
          console.error('Error reading token from AsyncStorage:', storageError);
        }
      }
      
      console.log('Creating post with token:', token ? 'Token exists' : 'No token');
      console.log('Is authenticated:', authState.isAuthenticated);
      
      if (!token) {
        console.error('No token available for creating post');
        return { ok: false, error: 'Требуется авторизация. Пожалуйста, войдите в систему.' };
      }

      const response = await fetch(`${API_BASE_URL}/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, content, published: true }),
      });

      if (!response.ok) {
        const text = await response.text().catch(() => '');
        return { 
          ok: false, 
          error: text || `Ошибка создания поста (${response.status})` 
        };
      }

      const data = await response.json();
      const envelope = data?.data || data;
      const newPost = envelope?.post || data.post || data;
      
      // Обновляем список постов
      set((state) => ({
        posts: [newPost, ...state.posts],
        myPosts: [newPost, ...state.myPosts],
      }));

      return { ok: true };
    } catch (error: any) {
      console.error('Create post error:', error);
      return { ok: false, error: error.message || 'Ошибка создания поста' };
    }
  },

  updatePost: async (id: number, title: string, content: string) => {
    try {
      const authState = useAuthStore.getState();
      let token = authState.token;

      // Если токена нет в store, пробуем достать из AsyncStorage и восстановить состояние
      if (!token) {
        try {
          token = await AsyncStorage.getItem('@auth_token');
          if (token) {
            const savedUser = await AsyncStorage.getItem('@auth_user');
            if (savedUser) {
              const user = JSON.parse(savedUser);
              useAuthStore.getState().setAuthState({
                user,
                token,
                isAuthenticated: true,
              });
            }
          }
        } catch (storageError) {
          console.error('Error reading token from AsyncStorage (updatePost):', storageError);
        }
      }

      if (!token) {
        return { ok: false, error: 'Требуется авторизация. Пожалуйста, войдите в систему.' };
      }

      const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, content, published: true }),
      });

      if (!response.ok) {
        const text = await response.text().catch(() => '');
        return { 
          ok: false, 
          error: text || `Ошибка обновления поста (${response.status})` 
        };
      }

      const data = await response.json();
      const envelope = data?.data || data;
      const updatedPost = envelope?.post || data.post || data;
      
      // Обновляем посты в списках
      set((state) => ({
        posts: state.posts.map((p) => (p.id === id ? updatedPost : p)),
        myPosts: state.myPosts.map((p) => (p.id === id ? updatedPost : p)),
        currentPost: state.currentPost?.id === id ? updatedPost : state.currentPost,
      }));

      return { ok: true };
    } catch (error: any) {
      console.error('Update post error:', error);
      return { ok: false, error: error.message || 'Ошибка обновления поста' };
    }
  },

  editPost: async (id: number, payload: { title?: string; content?: string; published?: boolean }) => {
    try {
      const authState = useAuthStore.getState();
      let token = authState.token;

      // Если токена нет в store, пробуем достать из AsyncStorage и восстановить состояние
      if (!token) {
        try {
          token = await AsyncStorage.getItem('@auth_token');
          if (token) {
            const savedUser = await AsyncStorage.getItem('@auth_user');
            if (savedUser) {
              const user = JSON.parse(savedUser);
              useAuthStore.getState().setAuthState({
                user,
                token,
                isAuthenticated: true,
              });
            }
          }
        } catch (storageError) {
          console.error('Error reading token from AsyncStorage (editPost):', storageError);
        }
      }

      if (!token) {
        return { ok: false, error: 'Требуется авторизация. Пожалуйста, войдите в систему.' };
      }

      const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...payload,
          // Если явно не передан published, по умолчанию публикуем, чтобы пост не пропадал из общего списка
          ...(payload.published === undefined ? { published: true } : {}),
        }),
      });

      if (!response.ok) {
        const text = await response.text().catch(() => '');
        return { 
          ok: false, 
          error: text || `Ошибка правки поста (${response.status})` 
        };
      }

      const data = await response.json();
      const envelope = data?.data || data;
      const updatedPost = envelope?.post || data.post || data;
      
      // Обновляем посты в списках
      set((state) => ({
        posts: state.posts.map((p) => (p.id === id ? updatedPost : p)),
        myPosts: state.myPosts.map((p) => (p.id === id ? updatedPost : p)),
        currentPost: state.currentPost?.id === id ? updatedPost : state.currentPost,
      }));

      return { ok: true };
    } catch (error: any) {
      console.error('Edit post error:', error);
      return { ok: false, error: error.message || 'Ошибка правки поста' };
    }
  },

  deletePost: async (id: number) => {
    try {
      const token = useAuthStore.getState().token;
      if (!token) {
        return { ok: false, error: 'Требуется авторизация' };
      }

      const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const text = await response.text().catch(() => '');
        return { 
          ok: false, 
          error: text || `Ошибка удаления поста (${response.status})` 
        };
      }

      // Удаляем пост из списков
      set((state) => ({
        posts: state.posts.filter((p) => p.id !== id),
        myPosts: state.myPosts.filter((p) => p.id !== id),
        currentPost: state.currentPost?.id === id ? null : state.currentPost,
      }));

      return { ok: true };
    } catch (error: any) {
      console.error('Delete post error:', error);
      return { ok: false, error: error.message || 'Ошибка удаления поста' };
    }
  },

  clearCurrentPost: () => {
    set({ currentPost: null });
  },
}));

