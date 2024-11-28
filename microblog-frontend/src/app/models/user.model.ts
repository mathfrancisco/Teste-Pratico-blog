export interface User {
  id: number;
  username: string;
  email?: string;
}

export interface Profile {
  bio: string;
  id: number;
  username: string;
  followers_count: number;
  following_count: number;
  following: number[];
}
