import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Profile } from '../../models/user.model';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  templateUrl: './profile.component.html',
  imports: [CommonModule]
})
export class ProfileComponent implements OnInit {
  profile?: Profile;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile(): void {
    this.userService.getProfile().subscribe(
      profile => this.profile = profile
    );
  }
}
