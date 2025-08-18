import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth-service';
import { CartService } from './services/cart-service';
import { ProductService } from './services/product-service';
import { UserService } from './services/user-service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  providers: [
    AuthService,
    CartService,
    ProductService,
    UserService
  ]
})
export class CoreModule { }
