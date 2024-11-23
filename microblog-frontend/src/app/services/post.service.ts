import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  getFeed(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.apiUrl}/posts/`);
  }

  createPost(content: string): Observable<Post> {
    return this.http.post<Post>(`${this.apiUrl}/posts/`, { content });
  }

  likePost(postId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/posts/${postId}/like/`, {});
  }

  commentPost(postId: number, content: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/posts/${postId}/comment/`, { content });
  }
}
