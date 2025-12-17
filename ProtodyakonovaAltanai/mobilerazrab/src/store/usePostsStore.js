import { create } from 'zustand';
import { postsAPI } from '../services/api';

const usePostsStore = create((set, get) => ({
  posts: [],
  myPosts: [],
  currentPost: null,
  isLoading: false,
  pagination: null,

  // Получить все посты
  fetchPosts: async (page = 1, limit = 10) => {
    set({ isLoading: true });
    try {
      const response = await postsAPI.getPosts(page, limit);

      if (response.success) {
        set({
          posts: response.data.posts || response.data,
          pagination: response.data.pagination,
          isLoading: false
        });
        return { success: true };
      }

      set({ isLoading: false });
      return { success: false, error: response.message };
    } catch (error) {
      set({ isLoading: false });
      return { success: false, error: error.message || 'Сетевая ошибка' };
    }
  },

  // Получить мои посты
  fetchMyPosts: async (page = 1, limit = 10) => {
    set({ isLoading: true });
    try {
      const response = await postsAPI.getMyPosts(page, limit);

      if (response.success) {
        set({
          myPosts: response.data.posts || response.data,
          pagination: response.data.pagination,
          isLoading: false
        });
        return { success: true };
      }

      set({ isLoading: false });
      return { success: false, error: response.message };
    } catch (error) {
      set({ isLoading: false });
      return { success: false, error: error.message || 'Сетевая ошибка' };
    }
  },

  // Получить один пост
  fetchPost: async (id) => {
    set({ isLoading: true });
    try {
      const response = await postsAPI.getPost(id);

      if (response.success) {
        set({
          currentPost: response.data.post || response.data,
          isLoading: false
        });
        return { success: true };
      }

      set({ isLoading: false });
      return { success: false, error: response.message };
    } catch (error) {
      set({ isLoading: false });
      return { success: false, error: error.message || 'Сетевая ошибка' };
    }
  },

  // Создать пост
  createPost: async (postData) => {
    const { title, content, published = false } = postData;
    
    set({ isLoading: true });
    try {
      const response = await postsAPI.createPost(title, content, published);

      if (response.success) {
        const newPost = response.data.post || response.data;
        set(state => ({
          posts: [newPost, ...state.posts],
          myPosts: [newPost, ...state.myPosts],
          isLoading: false
        }));
        return { success: true, data: newPost };
      }

      set({ isLoading: false });
      return { success: false, error: response.message };
    } catch (error) {
      set({ isLoading: false });
      return { success: false, error: error.message || 'Сетевая ошибка' };
    }
  },

  // Обновить пост
  updatePost: async (id, updates) => {
    set({ isLoading: true });
    try {
      const response = await postsAPI.updatePost(id, updates);

      if (response.success) {
        const updatedPost = response.data.post || response.data;
        set(state => ({
          posts: state.posts.map(p => p.id === id ? updatedPost : p),
          myPosts: state.myPosts.map(p => p.id === id ? updatedPost : p),
          currentPost: state.currentPost?.id === id ? updatedPost : state.currentPost,
          isLoading: false
        }));
        return { success: true, data: updatedPost };
      }

      set({ isLoading: false });
      return { success: false, error: response.message };
    } catch (error) {
      set({ isLoading: false });
      return { success: false, error: error.message || 'Сетевая ошибка' };
    }
  },

  // Удалить пост
  deletePost: async (id) => {
    set({ isLoading: true });
    try {
      const response = await postsAPI.deletePost(id);

      if (response.success) {
        set(state => ({
          posts: state.posts.filter(p => p.id !== id),
          myPosts: state.myPosts.filter(p => p.id !== id),
          currentPost: state.currentPost?.id === id ? null : state.currentPost,
          isLoading: false
        }));
        return { success: true };
      }

      set({ isLoading: false });
      return { success: false, error: response.message };
    } catch (error) {
      set({ isLoading: false });
      return { success: false, error: error.message || 'Сетевая ошибка' };
    }
  },

  // Очистить текущий пост
  clearCurrentPost: () => set({ currentPost: null }),

  // Очистить все посты (для логаута)
  clearAllPosts: () => set({
    posts: [],
    myPosts: [],
    currentPost: null,
    pagination: null
  })
}));

export default usePostsStore;