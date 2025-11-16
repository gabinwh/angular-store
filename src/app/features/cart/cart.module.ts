import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { CartRoutingModule } from './cart-routing.module';
import { CartComponent } from './cart-component/cart-component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    CartComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    CartRoutingModule,
    RouterModule
  ]
})
export class CartModule { }
