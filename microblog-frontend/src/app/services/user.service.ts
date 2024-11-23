import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Profile } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  getProfile(): Observable<Profile> {
    return this.http.get<Profile>(`${this.apiUrl}/profile/`);
  }

  followUser(userId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/${userId}/follow/`, {});
  }

  unfollowUser(userId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/${userId}/unfollow/`, {});
  }
}
