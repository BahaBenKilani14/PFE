import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

interface LoginResponse {
  id: number;
  role: string;
  accessToken: string;
  refreshToken: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly API_URL = environment.apiUrl;

  constructor(private http: HttpClient) {}

  login(email: string, motDePasse: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.API_URL}/auth/login`, {
      email,
      motDePasse,
    });
  }

  register(userData: any) {
    return this.http.post(`${this.API_URL}/register`, userData);
  }

  // Store the token in localStorage
  setToken(token: string): void {
    localStorage.setItem('accessToken', token);
  }

  // Get the token from localStorage
  getToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  // Check if user is logged in
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  // Logout
  logout(): void {
    localStorage.removeItem('accessToken');
  }

  // Add other API calls as needed
}
