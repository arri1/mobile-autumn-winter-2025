import { useState, useEffect, useCallback } from 'react';
import { postsApi } from '../services/postsApi';
import { Post, CreatePostData, UpdatePostData } from '../types';

export const usePosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load all posts
  const loadPosts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await postsApi.getAll();
      setPosts(data);
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Ошибка загрузки постов';
      setError(errorMessage);
      console.error('Error loading posts:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Create post
  const createPost = useCallback(async (data: CreatePostData): Promise<Post | null> => {
    setLoading(true);
    setError(null);
    try {
      const newPost = await postsApi.create(data);
      setPosts((prev) => [newPost, ...prev]);
      return newPost;
    } catch (err: any) {
      let errorMessage = 'Ошибка создания поста';
      const status = err.response?.status;

      // Обработка ошибок авторизации
      if (status === 403 || status === 401) {
        errorMessage = 'Доступ запрещен. Пожалуйста, войдите заново.';
      } else if (status === 400 && err.response?.data) {
        // Обработка ошибок валидации от бэкенда
        const data = err.response.data;
        if (Array.isArray(data.errors) && data.errors.length > 0) {
          // Берём первое сообщение об ошибке
          errorMessage = data.errors[0].msg || data.message || errorMessage;
        } else if (data.message) {
          errorMessage = data.message;
        }
      } else if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      } else if (err.response?.data?.error) {
        errorMessage = err.response.data.error;
      } else if (err.message) {
        errorMessage = err.message;
      }

      setError(errorMessage);
      console.error('Error creating post:', {
        status,
        message: err.message,
        response: err.response?.data,
        fullError: err
      });
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Update post
  const updatePost = useCallback(async (id: string, data: UpdatePostData): Promise<Post | null> => {
    setLoading(true);
    setError(null);
    try {
      const updatedPost = await postsApi.update(id, data);
      setPosts((prev) => prev.map((post) => (post.id === id ? updatedPost : post)));
      return updatedPost;
    } catch (err: any) {
      let errorMessage = 'Ошибка обновления поста';
      if (err.message) {
        errorMessage = err.message;
      } else if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      } else if (err.response?.data?.error) {
        errorMessage = err.response.data.error;
      }
      setError(errorMessage);
      console.error('Error updating post:', err, err.response?.data);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Delete post
  const deletePost = useCallback(async (id: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      await postsApi.delete(id);
      setPosts((prev) => prev.filter((post) => post.id !== id));
      return true;
    } catch (err: any) {
      let errorMessage = 'Ошибка удаления поста';
      const status = err.response?.status;
      
      if (status === 403 || status === 401) {
        errorMessage = 'Доступ запрещен. Пожалуйста, войдите заново.';
      } else if (err.message) {
        errorMessage = err.message;
      } else if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      } else if (err.response?.data?.error) {
        errorMessage = err.response.data.error;
      }
      
      setError(errorMessage);
      console.error('Error deleting post:', {
        status,
        message: err.message,
        response: err.response?.data,
        fullError: err
      });
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  // Load posts on mount
  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  return {
    posts,
    loading,
    error,
    loadPosts,
    createPost,
    updatePost,
    deletePost,
  };
};

