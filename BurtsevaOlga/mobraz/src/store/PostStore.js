import { create } from 'zustand';
import { useAuthStore } from './authStore';

const API_BASE_URL = 'https://cloud.kit-imi.info/api';

export const usePostsStore = create((set, get) => ({
  // Состояние
  posts: [],
  myPosts: [],
  currentPost: null,
  isLoading: false,
  error: null,
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
    pages: 0,
  },

  // Получение списка постов (с пагинацией)
  fetchPosts: async (page = 1, limit = 10, filters = {}) => {
    set({ isLoading: true, error: null });
    
    try {
      const token = useAuthStore.getState().getAccessToken();
      const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        ...filters,
      });

      const response = await fetch(`${API_BASE_URL}/posts?${queryParams}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Ошибка загрузки постов');
      }

      set({
        posts: result.data.posts,
        pagination: result.data.pagination,
        isLoading: false,
      });

      return { success: true, posts: result.data.posts };
    } catch (error) {
      set({
        error: error.message,
        isLoading: false,
      });
      return { success: false, error: error.message };
    }
  },

  // Получение постов текущего пользователя
  fetchMyPosts: async () => {
    set({ isLoading: true, error: null });
    
    try {
      const token =  useAuthStore.getState().getAccessToken();

      const response = await fetch(`${API_BASE_URL}/posts/my`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Ошибка загрузки ваших постов');
      }

      set({
        myPosts: result.data.posts,
        isLoading: false,
      });

      return { success: true, posts: result.data.posts };
    } catch (error) {
      set({
        error: error.message,
        isLoading: false,
      });
      return { success: false, error: error.message };
    }
  },

  // Создание нового поста
  createPost: async (title, content) => {
    set({ isLoading: true, error: null });
    
    try {
      const token = await useAuthStore.getState().getAccessToken();

      const response = await fetch(`${API_BASE_URL}/posts`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content, published: true}),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Ошибка создания поста');
      }

      // Добавляем новый пост в список
      const newPost = result.data.post;
      set(state => ({
        posts: [newPost, ...state.posts],
        myPosts: [newPost, ...state.myPosts],
        isLoading: false,
      }));

      return { success: true, post: newPost };
    } catch (error) {
      set({
        error: error.message,
        isLoading: false,
      });
      return { success: false, error: error.message };
    }
  },

  // Получение поста по ID
  fetchPostById: async (id) => {
    set({ isLoading: true, error: null });
    
    try {
      const token = await useAuthStore.getState().getAccessToken();

      const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Ошибка загрузки поста');
      }

      set({
        currentPost: result.data.post,
        isLoading: false,
      });

      return { success: true, post: result.data.post };
    } catch (error) {
      set({
        error: error.message,
        isLoading: false,
      });
      return { success: false, error: error.message };
    }
  },

  // Обновление поста
  updatePost: async (id, updates) => {
    set({ isLoading: true, error: null });
    
    try {
      const token = await useAuthStore.getState().getAccessToken();

      const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Ошибка обновления поста');
      }

      const updatedPost = result.data.post;
      
      // Обновляем посты в списках
      set(state => ({
        posts: state.posts.map(post => 
          post.id === id ? updatedPost : post
        ),
        myPosts: state.myPosts.map(post => 
          post.id === id ? updatedPost : post
        ),
        currentPost: state.currentPost?.id === id ? updatedPost : state.currentPost,
        isLoading: false,
      }));

      return { success: true, post: updatedPost };
    } catch (error) {
      set({
        error: error.message,
        isLoading: false,
      });
      return { success: false, error: error.message };
    }
  },

  // Удаление поста
  deletePost: async (id) => {
    set({ isLoading: true, error: null });
    
    try {
      const token = await useAuthStore.getState().getAccessToken();

      const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Ошибка удаления поста');
      }

      // Удаляем пост из списков
      set(state => ({
        posts: state.posts.filter(post => post.id !== id),
        myPosts: state.myPosts.filter(post => post.id !== id),
        currentPost: state.currentPost?.id === id ? null : state.currentPost,
        isLoading: false,
      }));

      return { success: true };
    } catch (error) {
      set({
        error: error.message,
        isLoading: false,
      });
      return { success: false, error: error.message };
    }
  },

  clearError: () => set({ error: null }),
}));