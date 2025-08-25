import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductTableComponent } from './pages/product-table-component/product-table-component';
import { AdminHomeComponent } from './pages/admin-home-component/admin-home-component';


@NgModule({
  declarations: [
    ProductTableComponent,
    AdminHomeComponent
  ],
  imports: [
    CommonModule,
  ]
})
export class AdminModule { }
