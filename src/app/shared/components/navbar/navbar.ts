import { Component, inject } from '@angular/core';
import { AuthService } from '../../../core/services/auth-service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar {

  constructor(
    private authService: AuthService,
    private toastrService: ToastrService
  ) { }

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  logout(): void {
    this.authService.logout();
    this.toastrService.success("Logout realizado com sucesso!");
  }
}
