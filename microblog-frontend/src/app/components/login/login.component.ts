import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  imports: [CommonModule, FormsModule]
})
export class LoginComponent {
  credentials = {
    username: '',
    password: ''
  };
  error = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit(): void {
    this.authService.login(this.credentials).subscribe({
      next: () => this.router.navigate(['/feed']),
      error: (error) => this.error = 'Login falhou. Verifique suas credenciais.'
    });
  }
}
