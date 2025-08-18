import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth-service';
import { CartService } from './services/cart-service';
import { ProductService } from './services/product-service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  providers: [
    AuthService,
    CartService,
    ProductService
  ]
})
export class CoreModule { }
