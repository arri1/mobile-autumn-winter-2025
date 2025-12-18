import { apiRequest } from '@/api/http';

export type PostAuthor = {
  id: string;
  email: string;
  name: string | null;
};

export type Post = {
  id: string;
  title: string;
  content: string;
  published: boolean;
  authorId: string;
  author?: PostAuthor;
  createdAt: string;
  updatedAt: string;
};

export type Pagination = {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  limit: number;
  hasNext: boolean;
  hasPrev: boolean;
};

type PostsResponse = {
  success: boolean;
  data: {
    posts: Post[];
    pagination: Pagination;
  };
};

type PostResponse = {
  success: boolean;
  data: {
    post: Post;
  };
};

type PostMutationResponse = {
  success: boolean;
  message?: string;
  data?: {
    post?: Post;
  };
};

export async function listPosts(
  params: { page?: number; limit?: number; published?: boolean; authorId?: string; search?: string },
  token?: string | null,
) {
  const res = await apiRequest<PostsResponse>({ path: '/posts', method: 'GET', query: params, token });
  return res.data;
}

export async function listMyPosts(
  params: { page?: number; limit?: number; published?: boolean },
  token: string,
) {
  const res = await apiRequest<PostsResponse>({ path: '/posts/my', method: 'GET', query: params, token });
  return res.data;
}

export async function getPostById(id: string, token?: string | null) {
  const res = await apiRequest<PostResponse>({ path: `/posts/${encodeURIComponent(id)}`, method: 'GET', token });
  return res.data.post;
}

export async function createPost(
  payload: { title: string; content: string; published?: boolean },
  token: string,
) {
  const res = await apiRequest<PostMutationResponse>({
    path: '/posts',
    method: 'POST',
    body: payload,
    token,
  });
  const post = res.data?.post;
  if (!post) throw new Error('Сервер не вернул созданный пост.');
  return post;
}

export async function updatePost(
  id: string,
  payload: { title?: string; content?: string; published?: boolean },
  token: string,
) {
  const res = await apiRequest<PostMutationResponse>({
    path: `/posts/${encodeURIComponent(id)}`,
    method: 'PUT',
    body: payload,
    token,
  });
  const post = res.data?.post;
  if (!post) throw new Error('Сервер не вернул обновленный пост.');
  return post;
}

export async function deletePost(id: string, token: string) {
  await apiRequest<{ success: boolean; message?: string }>({
    path: `/posts/${encodeURIComponent(id)}`,
    method: 'DELETE',
    token,
  });
}


