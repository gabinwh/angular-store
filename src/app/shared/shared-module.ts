import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCard } from './components/product-card/product-card';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './components/navbar-component/navbar-component';



@NgModule({
  declarations: [
    ProductCard,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    ProductCard,
    NavbarComponent
  ]
})
export class SharedModule { }
