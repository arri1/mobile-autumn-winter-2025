import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from './authAPI'; // Ваш обновленный api.js

const usePostStore = create((set, get) => ({
  posts: [],
  viewMode: 'all', // 'all' | 'my'
  
  isLoading: false,
  isRefreshing: false,
  isLoadingMore: false,
  error: null,

  pagination: {
    currentPage: 1,
    hasNext: false,
  },

  setViewMode: (mode) => {
    set({ viewMode: mode, posts: [], pagination: { currentPage: 1, hasNext: false } });
    get().fetchPosts(true);
  },

  fetchPosts: async (isRefresh = false) => {
    const { pagination, isLoading, isLoadingMore, viewMode, posts } = get();

    if (isLoading || isLoadingMore) return;
    if (!isRefresh && !pagination.hasNext) return;

    if (isRefresh) {
      set({ isRefreshing: true, error: null });
    } else if (pagination.currentPage === 1 && posts.length === 0) {
      set({ isLoading: true, error: null });
    } else {
      set({ isLoadingMore: true, error: null });
    }

    try {
      const pageToFetch = isRefresh ? 1 : pagination.currentPage + 1;
      const params = { page: pageToFetch, limit: 10 };
      
      let response;

      if (viewMode === 'my') {
        const token = await AsyncStorage.getItem('accessToken');
        if (!token) throw new Error('Требуется авторизация');
        
        response = await api.getMyPosts(token, params);
      } else {
        response = await api.getPosts(params);
      }

      const receivedPosts = response.data?.posts || [];
      const receivedPagination = response.data?.pagination || { 
        currentPage: pageToFetch, 
        hasNext: false 
      };

      set((state) => ({
        posts: isRefresh ? receivedPosts : [...state.posts, ...receivedPosts],
        pagination: receivedPagination,
        isLoading: false,
        isRefreshing: false,
        isLoadingMore: false,
        error: null,
      }));

    } catch (err) {
      console.error('Fetch Error:', err);
      set({ 
        error: err.message || 'Ошибка загрузки',
        isLoading: false, 
        isRefreshing: false, 
        isLoadingMore: false 
      });
    }
  },

  createPost: async (postData) => {
    set({ isLoading: true, error: null });
    try {
      const token = await AsyncStorage.getItem('accessToken');
      if (!token) throw new Error('Вы не авторизованы');

      const response = await api.createPost(token, postData);
      const newPost = response.data?.post;

      if (newPost) {
        set((state) => ({
          posts: [newPost, ...state.posts],
          isLoading: false
        }));
      }
    } catch (err) {
      set({ isLoading: false, error: err.message });
      throw err;
    }
  },

  deletePost: async (id) => {
    const originalPosts = get().posts;
    set({ posts: originalPosts.filter(p => p.id !== id) });

    try {
      const token = await AsyncStorage.getItem('accessToken');
      if (!token) throw new Error('Вы не авторизованы');

      await api.deletePost(token, id);
    } catch (err) {
      set({ posts: originalPosts });
      throw err;
    }
  },

  updatePost: async (id, updateData) => {
    set({ isLoading: true });
    try {
      const token = await AsyncStorage.getItem('accessToken');
      if (!token) throw new Error('Вы не авторизованы');

      const response = await api.updatePost(token, id, updateData);
      const updatedPost = response.data?.post;

      if (updatedPost) {
        set((state) => ({
          posts: state.posts.map(p => p.id === id ? updatedPost : p),
          isLoading: false
        }));
      }
    } catch (err) {
      set({ isLoading: false, error: err.message });
      throw err;
    }
  }
}));

export default usePostStore;