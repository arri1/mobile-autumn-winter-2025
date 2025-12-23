import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuthStore } from './useAuthStore';

const API_URL = 'https://cloud.kit-imi.info/api';

export interface Post {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  published: boolean;
  author?: {
    id: string;
    name: string;
    email: string;
  };
}

interface PostsState {
  posts: Post[];
  myPosts: Post[];
  isLoading: boolean;
  fetchPosts: () => Promise<void>;
  fetchMyPosts: () => Promise<void>;
  createPost: (title: string, content: string) => Promise<boolean>;
  deletePost: (id: string) => Promise<boolean>;
  updatePost: (id: string, title: string, content: string) => Promise<boolean>;
}

export const usePostsStore = create<PostsState>((set, get) => ({
  posts: [],
  myPosts: [],
  isLoading: false,

  fetchPosts: async () => {
    set({ isLoading: true });
    try {
      const token = await AsyncStorage.getItem('@accessToken');
      if (!token) return;

      let res = await fetch(`${API_URL}/posts?page=1&limit=100`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.status === 401) {
        const refreshed = await useAuthStore.getState().refreshToken();
        if (!refreshed) {
          useAuthStore.getState().logout();
          return;
        }
        const newToken = await AsyncStorage.getItem('@accessToken');
        res = await fetch(`${API_URL}/posts?page=1&limit=100`, {
          headers: { Authorization: `Bearer ${newToken}` },
        });
      }

      const data = await res.json();
      if (res.ok && data.success) {
        set({ posts: data.data.posts || data.data || [] });
      }
    } catch (e) {
      console.error('fetchPosts error:', e);
    } finally {
      set({ isLoading: false });
    }
  },

  fetchMyPosts: async () => {
    set({ isLoading: true });
    try {
      const token = await AsyncStorage.getItem('@accessToken');
      if (!token) return;

      let res = await fetch(`${API_URL}/posts/my`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.status === 401) {
        const refreshed = await useAuthStore.getState().refreshToken();
        if (!refreshed) {
          useAuthStore.getState().logout();
          return;
        }
        const newToken = await AsyncStorage.getItem('@accessToken');
        res = await fetch(`${API_URL}/posts/my`, {
          headers: { Authorization: `Bearer ${newToken}` },
        });
      }

      const data = await res.json();
      if (res.ok && data.success) {
        set({ myPosts: data.data.posts || data.data || [] });
      }
    } catch (e) {
      console.error('fetchMyPosts error:', e);
    } finally {
      set({ isLoading: false });
    }
  },

  createPost: async (title, content) => {
    try {
      const token = await AsyncStorage.getItem('@accessToken');
      if (!token) return false;

      let res = await fetch(`${API_URL}/posts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ title: title.trim(), content: content.trim(), published: true }),
      });

      if (res.status === 401) {
        const refreshed = await useAuthStore.getState().refreshToken();
        if (!refreshed) {
          useAuthStore.getState().logout();
          return false;
        }
        const newToken = await AsyncStorage.getItem('@accessToken');
        res = await fetch(`${API_URL}/posts`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${newToken}` },
          body: JSON.stringify({ title: title.trim(), content: content.trim(), published: true }),
        });
      }

      const data = await res.json();
      if (res.ok && data.success) {
        const newPost = data.data.post || data.data;
        set((state) => ({
          posts: [newPost, ...state.posts],
          myPosts: [newPost, ...state.myPosts],
        }));
        return true;
      }
      return false;
    } catch (e) {
      console.error('createPost error:', e);
      return false;
    }
  },

  deletePost: async (id) => {
    try {
      const token = await AsyncStorage.getItem('@accessToken');
      if (!token) return false;

      let res = await fetch(`${API_URL}/posts/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.status === 401) {
        const refreshed = await useAuthStore.getState().refreshToken();
        if (!refreshed) {
          useAuthStore.getState().logout();
          return false;
        }
        const newToken = await AsyncStorage.getItem('@accessToken');
        res = await fetch(`${API_URL}/posts/${id}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${newToken}` },
        });
      }

      const data = await res.json();
      if (res.ok && data.success) {
        set((state) => ({
          posts: state.posts.filter((p) => p.id !== id),
          myPosts: state.myPosts.filter((p) => p.id !== id),
        }));
        return true;
      }
      return false;
    } catch (e) {
      console.error('deletePost error:', e);
      return false;
    }
  },

  updatePost: async (id, title, content) => {
    try {
      const token = await AsyncStorage.getItem('@accessToken');
      if (!token) return false;

      let res = await fetch(`${API_URL}/posts/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ title: title.trim(), content: content.trim() }),
      });

      if (res.status === 401) {
        const refreshed = await useAuthStore.getState().refreshToken();
        if (!refreshed) {
          useAuthStore.getState().logout();
          return false;
        }
        const newToken = await AsyncStorage.getItem('@accessToken');
        res = await fetch(`${API_URL}/posts/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${newToken}` },
          body: JSON.stringify({ title: title.trim(), content: content.trim() }),
        });
      }

      const data = await res.json();
      if (res.ok && data.success) {
        const updatedPost = data.data.post || data.data;
        set((state) => ({
          posts: state.posts.map((p) => (p.id === id ? updatedPost : p)),
          myPosts: state.myPosts.map((p) => (p.id === id ? updatedPost : p)),
        }));
        return true;
      }
      return false;
    } catch (e) {
      console.error('updatePost error:', e);
      return false;
    }
  },
}));