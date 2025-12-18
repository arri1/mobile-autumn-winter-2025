import { api } from './api';
import { Post, CreatePostData, UpdatePostData } from '../types';

interface PostsResponse {
  success: boolean;
  data: {
    posts: Post[];
    pagination?: {
      currentPage: number;
      totalPages: number;
      totalCount: number;
      limit: number;
      hasNext: boolean;
      hasPrev: boolean;
    };
  };
}

interface PostResponse {
  success: boolean;
  message?: string;
  data: {
    post: Post;
  };
}

interface DeleteResponse {
  success: boolean;
  message?: string;
}

export const postsApi = {
  // Get all posts
  getAll: async (): Promise<Post[]> => {
    const response = await api.get<PostsResponse>('/api/posts');
    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to fetch posts');
    }
    return response.data.data.posts;
  },

  // Get post by ID
  getById: async (id: string): Promise<Post> => {
    const response = await api.get<PostResponse>(`/api/posts/${id}`);
    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to fetch post');
    }
    return response.data.data.post;
  },

  // Create new post
  create: async (data: CreatePostData): Promise<Post> => {
    const response = await api.post<PostResponse>('/api/posts', data);
    if (!response.data || !response.data.success) {
      throw new Error(response.data?.message || 'Failed to create post');
    }
    if (!response.data.data || !response.data.data.post) {
      throw new Error('Invalid response format from server');
    }
    return response.data.data.post;
  },

  // Update post
  update: async (id: string, data: UpdatePostData): Promise<Post> => {
    const response = await api.put<PostResponse>(`/api/posts/${id}`, data);
    if (!response.data || !response.data.success) {
      throw new Error(response.data?.message || 'Failed to update post');
    }
    if (!response.data.data || !response.data.data.post) {
      throw new Error('Invalid response format from server');
    }
    return response.data.data.post;
  },

  // Delete post
  delete: async (id: string): Promise<void> => {
    const response = await api.delete<DeleteResponse>(`/api/posts/${id}`);
    if (!response.data || !response.data.success) {
      throw new Error(response.data?.message || 'Failed to delete post');
    }
  },
};

