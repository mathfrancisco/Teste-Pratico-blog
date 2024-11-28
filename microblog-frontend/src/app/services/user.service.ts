import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Profile, User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  getProfile(): Observable<Profile> {
    return this.http.get<Profile>(`${this.apiUrl}/profile/`);
  }


  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users/`).pipe(
      map((users: User[]) => {
        // Certifique-se de que o id seja numérico
        return users.map(user => ({ ...user, id: Number(user.id) }));
      })
    );
  }


  followUser(userId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/${userId}/follow/`, {});
  }

  unfollowUser(userId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/${userId}/unfollow/`, {});
  }
}
