import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth-service';
import { CartService } from './services/cart-service';
import { ProductService } from './services/product-service';
import { UserService } from './services/user-service';
import { NavbarComponent } from './components/navbar-component/navbar-component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [NavbarComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    NavbarComponent
  ]
})
export class CoreModule { }
