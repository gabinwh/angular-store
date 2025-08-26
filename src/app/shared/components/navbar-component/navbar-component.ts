import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth-service';
import { ToastrService } from 'ngx-toastr';

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
}
