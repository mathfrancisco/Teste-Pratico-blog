import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Profile, User } from '../../models/user.model';
import { CommonModule } from '@angular/common';
import { catchError, of, tap, combineLatest } from 'rxjs';

@Component({
  selector: 'app-profile',
  standalone: true,
  templateUrl: './profile.component.html',
  imports: [CommonModule]
})
export class ProfileComponent implements OnInit {
  profile?: Profile;
  users: User[] = [];
  followError = '';
  showingFollowing = false;
  followedUsers: User[] = [];
  loading = true; // Indica se os dados estão sendo carregados

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    combineLatest([this.userService.getProfile(), this.userService.getUsers()]).subscribe(
      ([profile, users]) => {
        this.profile = profile;
        this.users = users;
        this.loadFollowedUsers();
        this.loading = false; // Define loading como false após carregar os dados
      },
      (error) => {
        // Lida com erros no combineLatest
        this.followError = 'Erro ao carregar os dados do perfil.';
        this.loading = false;
      }
    );
  }


  toggleFollow(userId: number): void {
    if (!this.profile) {
      return;
    }

    this.followError = '';

    const request$ = this.isFollowing(userId) ?
      this.userService.unfollowUser(userId) :
      this.userService.followUser(userId);

    request$.pipe(
      tap(() => {
        this.loadProfileAndFollowedUsers();
      }),
      catchError((error: any) => {
        if (error.status === 400 && error.error && error.error.error) {
          this.followError = error.error.error;
        } else {
          this.followError = 'Ocorreu um erro ao seguir/deixar de seguir o usuário.';
        }
        return of(null);
      })
    ).subscribe();
  }

  isFollowing(userId: number): boolean {
    if (!this.profile || !this.profile.following) {
      return false;
    }
    return this.profile.following.includes(userId);
  }

  toggleShowFollowing(): void {
    this.showingFollowing = !this.showingFollowing;
  }

  private loadProfileAndFollowedUsers(): void {
    this.userService.getProfile().subscribe((profile: Profile) => {
      this.profile = profile;
      this.loadFollowedUsers();
    });
  }

  loadFollowedUsers(): void {
    if (this.profile && this.profile.following) {
      this.followedUsers = this.users.filter(user => this.profile!.following.includes(user.id));
    } else {
      this.followedUsers = [];
    }
  }
}

