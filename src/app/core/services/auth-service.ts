import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private httpService = inject(HttpClient);
  private routerService = inject(Router);

  private apiUrl = 'https://fakestoreapi.com/auth/login';
  private tokenKey = 'auth_token';

  private isLoggedInSignal = signal(false);

  login(credentials: { username: string, password: string }): Observable<any> {
    return this.httpService.post<any>(this.apiUrl, credentials).pipe(
      tap(data => {
        localStorage.setItem(this.tokenKey, data.token);
        this.isLoggedInSignal.set(true);
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.isLoggedInSignal.set(false);
    this.routerService.navigate(['/login'])
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
      // Assumindo que a propriedade no token é 'username'
      return decodedToken.user || null;
    } catch (error) {
      console.error("Failed to decode JWT token:", error);
      return null;
    }
  }
}
