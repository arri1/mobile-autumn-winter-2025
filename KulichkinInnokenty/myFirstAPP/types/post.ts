// Типы для постов

export interface Post {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  userId: string;
  userName: string;
}

export interface CreatePostData {
  title: string;
  description: string;
}

export interface UpdatePostData {
  title: string;
  description: string;
}

export interface PostState {
  posts: Post[];
  myPosts: Post[];
  isLoading: boolean;
  error: string | null;
}
