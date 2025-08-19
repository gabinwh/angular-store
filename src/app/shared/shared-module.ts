import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './components/navbar-component/navbar-component';
import { ProductCardComponent } from './components/product-card-component/product-card-component';



@NgModule({
  declarations: [
    NavbarComponent,
    ProductCardComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    ProductCardComponent,
    NavbarComponent
  ]
})
export class SharedModule { }
