import apiClient from '../auth/client';

export interface PostAuthor {
  id: string;
  email: string;
  name: string;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  published: boolean;
  authorId: string;
  author: PostAuthor;
  createdAt: string;
  updatedAt: string;
}

export interface PostsPagination {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  limit: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface PostsResponse {
  success: boolean;
  data: {
    posts: Post[];
    pagination: PostsPagination;
  };
}

export async function getPosts(params?: {
  page?: number;
  limit?: number;
  published?: boolean;
  authorId?: string;
  search?: string;
}) {
  const response = await apiClient.get<PostsResponse>('/api/posts', { params });
  return response.data;
}

export interface CreatePostPayload {
  title: string;
  content: string;
  published?: boolean;
}

export interface SinglePostResponse {
  success: boolean;
  data: {
    post: Post;
  };
}

export async function createPost(payload: CreatePostPayload) {
  const response = await apiClient.post<SinglePostResponse>('/api/posts', payload);
  return response.data;
}


