import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule,CommonModule
  ],
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  userData = {
    username: '',
    email: '',
    password: ''
  };
  error = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit(): void {
    this.authService.register(this.userData).subscribe({
      next: () => this.router.navigate(['/login']),
      error: (error) => this.error = 'Registro falhou. Tente outro usuário.'
    });
  }
}
