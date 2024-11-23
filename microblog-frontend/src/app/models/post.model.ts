export interface Post {
  id: number;
  author: number;
  author_username: string;
  content: string;
  likes_count: number;
  comments: Comment[];
  created_at: string;
}

export interface Comment {
  id: number;
  author: number;
  author_username: string;
  content: string;
  created_at: string;
}
