import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { PostService } from '../../services/post.service';
import { Profile, User } from '../../models/user.model';
import { CommonModule } from '@angular/common';
import { catchError, of, tap, combineLatest } from 'rxjs';
import { Post } from '../../models/post.model';

@Component({
  selector: 'app-profile',
  standalone: true,
  templateUrl: './profile.component.html',
  imports: [CommonModule]
})
export class ProfileComponent implements OnInit {
  profile: Profile = {
    bio: '',
    id: 0,
    username: '',
    followers_count: 0,
    following_count: 0,
    following: []
};

  activeTab: 'posts' | 'likes' = 'posts';
  userPosts: Post[] = [];
  likedPosts: Post[] = [];
  users: User[] = [];
  followError = '';
  showingFollowing = false;
  followedUsers: User[] = [];
  loading = true; // Começa como true

  constructor(
    private userService: UserService,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    this.loading = true; // Garante que loading está true no início

    combineLatest([
      this.userService.getProfile(),
      this.userService.getUsers(),
      this.postService.getUserPosts(),
      this.postService.getLikedPosts()
    ]).pipe(
      tap({
        next: ([profile, users, userPosts, likedPosts]) => {
          this.profile = profile;
          this.users = users;
          this.userPosts = userPosts;
          this.likedPosts = likedPosts;
          this.loadFollowedUsers();
          this.loading = false;
        },
        error: (error) => {
          console.error('Erro ao carregar dados:', error);
          this.followError = 'Erro ao carregar os dados do perfil.';
          this.loading = false;
        }
      })
    ).subscribe();
  }

  toggleFollow(userId: number): void {
    if (!this.profile) return;

    this.followError = '';
    const isFollowing = this.isFollowing(userId);

    const request$ = isFollowing ?
      this.userService.unfollowUser(userId) :
      this.userService.followUser(userId);

    request$.pipe(
      tap(() => this.loadProfileAndFollowedUsers()),
      catchError((error) => {
        this.followError = error.error?.message || 'Erro ao atualizar seguidor.';
        return of(null);
      })
    ).subscribe();
  }

  isFollowing(userId: number): boolean {
    return this.profile?.following?.includes(userId) || false;
  }

  toggleShowFollowing(): void {
    this.showingFollowing = !this.showingFollowing;
  }

  private loadProfileAndFollowedUsers(): void {
    this.userService.getProfile().subscribe({
      next: (profile) => {
        this.profile = profile;
        this.loadFollowedUsers();
      },
      error: (error) => {
        console.error('Erro ao recarregar perfil:', error);
        this.followError = 'Erro ao atualizar dados do perfil.';
      }
    });
  }

  private loadFollowedUsers(): void {
    if (this.profile?.following) {
      this.followedUsers = this.users.filter(user =>
        this.profile?.following.includes(user.id)
      );
    }
  }
}
