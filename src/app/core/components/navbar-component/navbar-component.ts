import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth-service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar-component',
  standalone: false,
  templateUrl: './navbar-component.html',
  styleUrl: './navbar-component.scss'
})
export class NavbarComponent {

  constructor(
    private authService: AuthService,
    private toastrService: ToastrService,
    private router: Router
  ) { }

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  get userName(): string | null {
    return this.authService.getUsernameFromToken();
  }

  logout(): void {
    this.authService.logout();
    this.toastrService.success("Logout realizado com sucesso!");
  }

  navigateToDashboard(): void {
    this.router.navigate(['/admin']);
  }

  navigateToProducts(): void {
    this.router.navigate(['/admin/products']);
  }
}
