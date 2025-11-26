import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { CartService } from './cart-service';
import { LoginCredentials, RegisterBody, RegisterResponse } from '../../shared/utils/models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private httpService: HttpClient,
    private routerService: Router,
    private cartService: CartService,
  ) { }

  private apiUrl = 'http://localhost:8080/api/auth';
  private tokenKey = 'auth_token';

  private isLoggedInSignal = signal(false);

  login(credentials: LoginCredentials): Observable<any> {
    return this.httpService.post<any>(`${this.apiUrl}/login`, credentials).pipe(
      tap(data => {
        localStorage.setItem(this.tokenKey, data.token);
        this.isLoggedInSignal.set(true);
      })
    );
  }

  register(body: RegisterBody): Observable<RegisterResponse> {
    return this.httpService.post<RegisterResponse>(`${this.apiUrl}/register`, body);
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);

    this.cartService.clearCart();

    this.isLoggedInSignal.set(false);
    this.routerService.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return this.getUserToken() !== null;
  }

  getUserToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getUsernameFromToken(): string | null {
    const token = this.getUserToken();
    if (!token) {
      return null;
    }

    try {
      const decodedToken: any = jwtDecode(token);
      return decodedToken.sub || null;
    } catch (error) {
      console.error("Failed to decode JWT token:", error);
      return null;
    }
  }
}
