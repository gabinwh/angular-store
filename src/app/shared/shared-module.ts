import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Navbar } from './components/navbar/navbar';
import { ProductCard } from './components/product-card/product-card';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';



@NgModule({
  declarations: [
    Navbar,
    ProductCard
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    Navbar,  
    ProductCard
  ]
})
export class SharedModule { }
