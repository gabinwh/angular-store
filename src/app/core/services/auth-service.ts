import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'token';
  private roleKey = 'role';

  isLoggedInSignal = signal(false);

  login(username: string, password: string) {

    // Aqui você chamaria a API da FakeStore (POST /auth/login)
    // Para fins de exemplo, vamos mockar:
    const mockToken = 'fake-jwt-token';

    localStorage.setItem(this.tokenKey, mockToken);
    this.isLoggedInSignal.set(true);
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    this.isLoggedInSignal.set(false);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }
}
