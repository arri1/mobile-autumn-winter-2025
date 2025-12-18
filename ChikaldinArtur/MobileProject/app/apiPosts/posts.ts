import api from './http';

export type Post = {
  id: string;
  title: string;
  content: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
  author: {
    id: string;
    email: string;
    name: string | null;
  };
};

export type PaginatedPosts = {
  posts: Post[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalCount: number;
    limit: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
};

// GET /posts
export const fetchPosts = async (page = 1, limit = 10) => {
  const res = await api.get<{ success: true; data: PaginatedPosts }>('/posts', {
    params: { page, limit },
  });
  return res.data.data;
};

// GET /posts/my
export const fetchMyPosts = async (page = 1, limit = 10) => {
  const res = await api.get<{ success: true; data: PaginatedPosts }>('/posts/my', {
    params: { page, limit },
  });
  return res.data.data;
};

// GET /posts/:id
export const fetchPostById = async (id: string) => {
  const res = await api.get<{ success: true; data: { post: Post } }>(`/posts/${id}`);
  return res.data.data.post;
};

// POST /posts
export const createPost = async (data: { title: string; content: string; published?: boolean }) => {
  const res = await api.post('/posts', data);
  return res.data;
};

// PUT /posts/:id
export const updatePost = async (id: string, data: { title?: string; content?: string; published?: boolean }) => {
  const res = await api.put(`/posts/${id}`, data);
  return res.data;
};

// DELETE /posts/:id
export const deletePost = async (id: string) => {
  const res = await api.delete(`/posts/${id}`);
  return res.data;
};