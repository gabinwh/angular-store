import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductTableComponent } from './pages/product-table-component/product-table-component';
import { AdminHomeComponent } from './pages/admin-home-component/admin-home-component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    ProductTableComponent,
    AdminHomeComponent
  ],
  imports: [
    CommonModule,
    NgbDropdownModule 
  ]
})
export class AdminModule { }
