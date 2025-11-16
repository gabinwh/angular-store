import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { CartRoutingModule } from './cart-routing.module';
import { CartComponent } from './cart-component/cart-component';

@NgModule({
  declarations: [
    CartComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    CartRoutingModule
  ]
})
export class CartModule { }
