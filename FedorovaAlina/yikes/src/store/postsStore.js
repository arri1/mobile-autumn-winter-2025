import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persist, createJSONStorage } from 'zustand/middleware';
import api from '../services/api';

export const usePostsStore = create(
  persist(
    (set, get) => ({
      // Состояние
      posts: [],
      myPosts: [],
      currentPost: null,
      isLoading: false,
      error: null,
      pagination: {
        page: 1,
        limit: 10,
        totalPages: 1,
        totalItems: 0,
      },
      
      // Действия
      setPosts: (posts) => set({ posts }),
      setMyPosts: (myPosts) => set({ myPosts }),
      setCurrentPost: (post) => set({ currentPost: post }),
      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),
      setPagination: (pagination) => set({ pagination }),
      
      // Получить все посты
      getPosts: async (params = {}) => {
        set({ isLoading: true, error: null });
        
        try {
          const response = await api.getPosts(params);
          
          if (response.success) {
            set({
              posts: response.data.posts,
              pagination: response.data.pagination,
              isLoading: false,
            });
            return response.data;
          } else {
            set({
              error: response.message || 'Ошибка при загрузке постов',
              isLoading: false,
            });
            return null;
          }
        } catch (error) {
          set({
            error: error.message || 'Ошибка сети',
            isLoading: false,
          });
          return null;
        }
      },
      
      // Получить мои посты
      getMyPosts: async (params = {}) => {
        set({ isLoading: true, error: null });
        
        try {
          const response = await api.getMyPosts(params);
          
          if (response.success) {
            set({
              myPosts: response.data.posts,
              pagination: response.data.pagination,
              isLoading: false,
            });
            return response.data;
          } else {
            set({
              error: response.message || 'Ошибка при загрузке постов',
              isLoading: false,
            });
            return null;
          }
        } catch (error) {
          set({
            error: error.message || 'Ошибка сети',
            isLoading: false,
          });
          return null;
        }
      },
      
      // Получить пост по ID
      getPostById: async (id) => {
        set({ isLoading: true, error: null });
        
        try {
          const response = await api.getPostById(id);
          
          if (response.success) {
            set({
              currentPost: response.data.post,
              isLoading: false,
            });
            return response.data.post;
          } else {
            set({
              error: response.message || 'Ошибка при загрузке поста',
              isLoading: false,
            });
            return null;
          }
        } catch (error) {
          set({
            error: error.message || 'Ошибка сети',
            isLoading: false,
          });
          return null;
        }
      },
      
      // Создать пост
      createPost: async (postData) => {
        set({ isLoading: true, error: null });
        
        try {
          const response = await api.createPost(postData);
          
          if (response.success) {
            // Добавляем новый пост в список
            const newPost = response.data.post;
            set((state) => ({
              posts: [newPost, ...state.posts],
              myPosts: [newPost, ...state.myPosts],
              isLoading: false,
            }));
            return response.data;
          } else {
            set({
              error: response.message || 'Ошибка при создании поста',
              isLoading: false,
            });
            return null;
          }
        } catch (error) {
          set({
            error: error.message || 'Ошибка сети',
            isLoading: false,
          });
          return null;
        }
      },
      
      // Обновить пост
      updatePost: async (id, postData) => {
        set({ isLoading: true, error: null });
        
        try {
          const response = await api.updatePost(id, postData);
          
          if (response.success) {
            const updatedPost = response.data.post;
            
            // Обновляем в списках
            set((state) => ({
              posts: state.posts.map(post => 
                post.id === id ? updatedPost : post
              ),
              myPosts: state.myPosts.map(post => 
                post.id === id ? updatedPost : post
              ),
              currentPost: state.currentPost?.id === id ? updatedPost : state.currentPost,
              isLoading: false,
            }));
            return response.data;
          } else {
            set({
              error: response.message || 'Ошибка при обновлении поста',
              isLoading: false,
            });
            return null;
          }
        } catch (error) {
          set({
            error: error.message || 'Ошибка сети',
            isLoading: false,
          });
          return null;
        }
      },
      
      // Удалить пост
      deletePost: async (id) => {
        set({ isLoading: true, error: null });
        
        try {
          const response = await api.deletePost(id);
          
          if (response.success) {
            // Удаляем из списков
            set((state) => ({
              posts: state.posts.filter(post => post.id !== id),
              myPosts: state.myPosts.filter(post => post.id !== id),
              currentPost: state.currentPost?.id === id ? null : state.currentPost,
              isLoading: false,
            }));
            return response.data;
          } else {
            set({
              error: response.message || 'Ошибка при удалении поста',
              isLoading: false,
            });
            return null;
          }
        } catch (error) {
          set({
            error: error.message || 'Ошибка сети',
            isLoading: false,
          });
          return null;
        }
      },
      
      // Очистить ошибки
      clearError: () => set({ error: null }),
      
      // Очистить текущий пост
      clearCurrentPost: () => set({ currentPost: null }),
    }),
    {
      name: 'posts-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        posts: state.posts,
        myPosts: state.myPosts,
        currentPost: state.currentPost,
      }),
    }
  )
);