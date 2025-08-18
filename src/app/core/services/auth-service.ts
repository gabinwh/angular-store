import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'https://fakestoreapi.com/auth/login';
  private tokenKey = 'auth_token';

  private isLoggedInSignal = signal(false);

  constructor(private http: HttpClient) {
    const storedToken = localStorage.getItem(this.tokenKey);
    if (storedToken) {
      this.isLoggedInSignal.set(true);
    }
  }

  login(credentials: any): Observable<any> {
    return this.http.post<string>(this.apiUrl, credentials).pipe(
      tap(data => {
        localStorage.setItem(this.tokenKey, data);
        this.isLoggedInSignal.set(true);
      })
    );
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    this.isLoggedInSignal.set(false);
  }

  isLoggedIn(): boolean {
    return this.isLoggedInSignal();
  }
}
