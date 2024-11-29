import { Component } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'] // Adicione esta linha
})
export class RegisterComponent {
  userData = {
    username: '',
    email: '',
    password: ''
  };
  error = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    this.authService.register(this.userData).subscribe({
      next: () => this.router.navigate(['/login']),
      error: (error) => this.error = 'Registro falhou. Verifique se o usuário ou email já existem.'
    });
  }
}
