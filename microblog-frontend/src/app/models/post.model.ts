export interface Post {
  id: number;
  author: number;
  author_username: string;
  content: string;
  likes_count: number;
  is_liked: boolean; // Adicione um campo para controlar o estado da curtida
  comments: Comment[];
  created_at: string;
  newComment?: string; // Adicione um campo para controlar o estado da curtida
}


export interface Comment {
  id: number;
  author: number;
  author_username: string;
  content: string;
  created_at: string;
}
