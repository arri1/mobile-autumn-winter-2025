import { create } from 'zustand';
import { Post, CreatePostData, UpdatePostData } from '../types';
import useAuthStore from './authStore';

// Интерфейс состояния store
interface PostState {
  posts: Post[];
  myPosts: Post[];
  isLoading: boolean;
  error: string | null;

  // Actions
  createPost: (postData: CreatePostData) => Promise<void>;
  updatePost: (postId: string, postData: UpdatePostData) => Promise<void>;
  deletePost: (postId: string) => Promise<void>;
  fetchAllPosts: () => Promise<void>;
  fetchMyPosts: () => Promise<void>;
  searchPosts: (query: string) => Post[];
  clearError: () => void;
}

// Создание Zustand store
const usePostStore = create<PostState>((set, get) => ({
  // Начальное состояние
  posts: [],
  myPosts: [],
  isLoading: false,
  error: null,

  // Действие: создание поста
  createPost: async (postData) => {
    set({ isLoading: true, error: null });

    try {
      const { user } = useAuthStore.getState();

      if (!user) {
        throw new Error('Необходима авторизация');
      }

      // Создаем новый пост
      const newPost: Post = {
        id: Date.now().toString(),
        title: postData.title,
        description: postData.description,
        createdAt: new Date().toISOString(),
        userId: user.id,
        userName: user.name,
      };

      // Добавляем пост в оба списка
      set((state) => ({
        posts: [newPost, ...state.posts],
        myPosts: [newPost, ...state.myPosts],
        isLoading: false,
      }));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Ошибка создания поста';
      set({
        isLoading: false,
        error: errorMessage,
      });
      throw error;
    }
  },

  // Действие: обновление поста
  updatePost: async (postId, postData) => {
    set({ isLoading: true, error: null });

    try {
      const { user } = useAuthStore.getState();

      if (!user) {
        throw new Error('Необходима авторизация');
      }

      // Обновляем пост в обоих списках
      set((state) => ({
        posts: state.posts.map((post) =>
          post.id === postId
            ? { ...post, title: postData.title, description: postData.description }
            : post
        ),
        myPosts: state.myPosts.map((post) =>
          post.id === postId
            ? { ...post, title: postData.title, description: postData.description }
            : post
        ),
        isLoading: false,
      }));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Ошибка обновления поста';
      set({
        isLoading: false,
        error: errorMessage,
      });
      throw error;
    }
  },

  // Действие: удаление поста
  deletePost: async (postId) => {
    set({ isLoading: true, error: null });

    try {
      const { user } = useAuthStore.getState();

      if (!user) {
        throw new Error('Необходима авторизация');
      }

      // Удаляем пост из обоих списков
      set((state) => ({
        posts: state.posts.filter((post) => post.id !== postId),
        myPosts: state.myPosts.filter((post) => post.id !== postId),
        isLoading: false,
      }));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Ошибка удаления поста';
      set({
        isLoading: false,
        error: errorMessage,
      });
      throw error;
    }
  },

  // Действие: получить все посты
  fetchAllPosts: async () => {
    set({ isLoading: true, error: null });

    try {
      // В реальном приложении здесь был бы API запрос
      // Сейчас просто возвращаем существующие посты
      set({ isLoading: false });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Ошибка загрузки постов';
      set({
        isLoading: false,
        error: errorMessage,
      });
      throw error;
    }
  },

  // Действие: получить мои посты
  fetchMyPosts: async () => {
    set({ isLoading: true, error: null });

    try {
      const { user } = useAuthStore.getState();

      if (!user) {
        throw new Error('Необходима авторизация');
      }

      // Фильтруем только посты текущего пользователя
      const { posts } = get();
      const myPosts = posts.filter((post) => post.userId === user.id);

      set({
        myPosts,
        isLoading: false,
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Ошибка загрузки постов';
      set({
        isLoading: false,
        error: errorMessage,
      });
      throw error;
    }
  },

  // Действие: поиск постов
  searchPosts: (query: string) => {
    const { posts } = get();

    if (!query.trim()) {
      return posts;
    }

    const lowerQuery = query.toLowerCase();
    return posts.filter(
      (post) =>
        post.title.toLowerCase().includes(lowerQuery) ||
        post.description.toLowerCase().includes(lowerQuery) ||
        post.userName.toLowerCase().includes(lowerQuery)
    );
  },

  // Действие: очистка ошибки
  clearError: () => {
    set({ error: null });
  },
}));

export default usePostStore;
