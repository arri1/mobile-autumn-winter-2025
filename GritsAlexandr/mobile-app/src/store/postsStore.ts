import { create } from 'zustand';
import ApiService, { Post, CreatePostData, UpdatePostData } from '../service/api';

interface PostsState {
  posts: Post[];
  currentPost: Post | null;
  isLoading: boolean;
  error: string | null;
  pagination: {
    currentPage: number;
    totalPages: number;
    totalCount: number;
    limit: number;
    hasNext: boolean;
    hasPrev: boolean;
  };

  fetchPosts: (page?: number, limit?: number) => Promise<void>;
  fetchPostById: (id: string) => Promise<void>;
  createPost: (postData: CreatePostData) => Promise<Post>;
  updatePost: (id: string, postData: UpdatePostData) => Promise<Post>;
  deletePost: (id: string) => Promise<void>;
  togglePublish: (id: string) => Promise<void>;
  setCurrentPost: (post: Post | null) => void;
  clearError: () => void;
}

export const usePostsStore = create<PostsState>((set, get) => ({
  posts: [],
  currentPost: null,
  isLoading: false,
  error: null,
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalCount: 0,
    limit: 10,
    hasNext: false,
    hasPrev: false,
  },

  fetchPosts: async (page = 1, limit = 10) => {
  set({ isLoading: true, error: null });
  
  try {
    const response = await ApiService.getPosts(page, limit);
    
    if (response.success && response.data) {
      // Безопасно обрабатываем данные
      const posts = response.data.posts || [];
      const pagination = response.data.pagination || {
        currentPage: page,
        totalPages: 1,
        totalCount: posts.length,
        limit,
        hasNext: false,
        hasPrev: false,
      };
      
      set({
        posts,
        pagination,
        isLoading: false,
      });
    } else {
      throw new Error(response.message || 'Ошибка загрузки постов');
    }
  } catch (error: any) {
    set({
      error: error.message || 'Не удалось загрузить посты',
      isLoading: false,
      });
    throw error;
    }
  },

  fetchPostById: async (id: string) => {
    set({ isLoading: true, error: null });
    
    try {
      const response = await ApiService.getPostById(id);
      
      if (response.success && response.data) {
        set({
          currentPost: response.data,
          isLoading: false,
        });
      } else {
        throw new Error(response.message || 'Ошибка загрузки поста');
      }
    } catch (error: any) {
      set({
        error: error.message || 'Не удалось загрузить пост',
        isLoading: false,
      });
      throw error;
    }
  },

  createPost: async (postData: CreatePostData) => {
    set({ isLoading: true, error: null });
    
    try {
      const response = await ApiService.createPost(postData);
      
      if (response.success && response.data) {
        const newPost = response.data;
        const { posts } = get();
        
        set({
          posts: [newPost, ...posts],
          currentPost: newPost,
          isLoading: false,
        });
        
        return newPost;
      } else {
        throw new Error(response.message || 'Ошибка создания поста');
      }
    } catch (error: any) {
      set({
        error: error.message || 'Не удалось создать пост',
        isLoading: false,
      });
      throw error;
    }
  },

  updatePost: async (id: string, postData: UpdatePostData) => {
    set({ isLoading: true, error: null });
    
    try {
      const response = await ApiService.updatePost(id, postData);
      
      if (response.success && response.data) {
        const updatedPost = response.data;
        const { posts } = get();
        
        set({
          posts: posts.map(post => 
            post.id === id ? updatedPost : post
          ),
          currentPost: updatedPost,
          isLoading: false,
        });
        
        return updatedPost;
      } else {
        throw new Error(response.message || 'Ошибка обновления поста');
      }
    } catch (error: any) {
      set({
        error: error.message || 'Не удалось обновить пост',
        isLoading: false,
      });
      throw error;
    }
  },

  deletePost: async (id: string) => {
    set({ isLoading: true, error: null });
    
    try {
      const response = await ApiService.deletePost(id);
      
      if (response.success) {
        const { posts } = get();
        
        set({
          posts: posts.filter(post => post.id !== id),
          currentPost: null,
          isLoading: false,
        });
      } else {
        throw new Error(response.message || 'Ошибка удаления поста');
      }
    } catch (error: any) {
      set({
        error: error.message || 'Не удалось удалить пост',
        isLoading: false,
      });
      throw error;
    }
  },

  togglePublish: async (id: string) => {
    set({ isLoading: true, error: null });
    
    try {
      const response = await ApiService.togglePostPublish(id);
      
      if (response.success && response.data) {
        const updatedPost = response.data;
        const { posts } = get();
        
        set({
          posts: posts.map(post => 
            post.id === id ? updatedPost : post
          ),
          currentPost: updatedPost,
          isLoading: false,
        });
      } else {
        throw new Error(response.message || 'Ошибка изменения статуса');
      }
    } catch (error: any) {
      set({
        error: error.message || 'Не удалось изменить статус',
        isLoading: false,
      });
      throw error;
    }
  },

  setCurrentPost: (post: Post | null) => {
    set({ currentPost: post });
  },

  clearError: () => {
    set({ error: null });
  },
}));