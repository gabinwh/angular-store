import { Component, inject } from '@angular/core';
import { AuthService } from '../../../core/services/auth-service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-navbar-component',
  standalone: false,
  templateUrl: './navbar-component.html',
  styleUrl: './navbar-component.scss'
})
export class NavbarComponent {

  private authService = inject(AuthService);
  private toastrService = inject(ToastrService);

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  logout(): void {
    this.authService.logout();
    this.toastrService.success("Logout realizado com sucesso!");
  }
}
