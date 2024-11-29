import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap,of } from 'rxjs';
import { Post } from '../models/post.model';
import {map,filter,switchMap} from 'rxjs/operators';

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

  likePost(post: Post): Observable<any> {
    return this.http.post(`${this.apiUrl}/posts/${post.id}/like/`, {}).pipe(
      tap(() => {
        // Atualiza a contagem de curtidas e o estado da curtida
        post.likes_count += (post.is_liked ? -1 : 1);
        post.is_liked = !post.is_liked; // Alterna o estado da curtida
      })
    );
  }

  commentPost(post: Post, content?: string): Observable<any> {
  return of(content).pipe( // Cria um observable a partir do content
    filter((c): c is string => !!c && c.trim() !== ''), // Filtra valores nulos, undefined ou vazios
    map(c => c.trim()), // Remove espaços em branco extras
    switchMap(c => this.http.post(`${this.apiUrl}/posts/${post.id}/comment/`, { content: c })) // Faz a requisição HTTP
  );
}
 getUserPosts(): Observable<Post[]> {
        return this.http.get<Post[]>(`${this.apiUrl}/posts/user/`);
    }

    getLikedPosts(): Observable<Post[]> {
        return this.http.get<Post[]>(`${this.apiUrl}/posts/liked/`);
    }

}
