import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatIconModule, CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  credentials = {
    email: '',
    motDePasse: '',
  };
  errorMessage = '';
  isLoading = false;

  constructor(private authService: AuthService, private router: Router) {}

  togglePassword(inputEl: HTMLInputElement) {
    const type = inputEl.type === 'password' ? 'text' : 'password';
    inputEl.type = type;
  }

  onSubmit() {
    this.isLoading = true;
    this.errorMessage = '';

    console.log('Attempting login with:', {
      email: this.credentials.email,
      // Don't log the actual password for security
      hasPassword: !!this.credentials.motDePasse,
    });

    this.authService
      .login(this.credentials.email, this.credentials.motDePasse)
      .subscribe({
        next: (response: any) => {
          // Store the token
          if (response.access_token) {
            this.authService.setToken(response.access_token);

            // Detailed console logging
            console.log('=== Login Successful ===');
            console.log('Response:', response);
            console.log('User ID:', response.id);
            console.log('Access_token:', response.access_token);
            console.log(
              'Token stored in localStorage:',
              this.authService.getToken()
            );
            console.log('Is user logged in?', this.authService.isLoggedIn());
            console.log('=====================');

            // Redirect to home page or dashboard
            this.router.navigate(['traiteur-home']);
          } else {
            console.error('No access_token in response:', response);
            this.errorMessage = 'Invalid response from server';
          }
        },
        error: (error) => {
          console.error('=== Login Failed ===');
          console.error('Error details:', error);
          console.error('Error message:', error.error?.message);
          console.error('Status code:', error.status);
          console.error('Response body:', error.error);
          console.error('==================');

          this.errorMessage =
            error.error?.message || 'Login failed. Please try again.';
          this.isLoading = false;
        },
        complete: () => {
          this.isLoading = false;
        },
      });
  }
}
