import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductTableComponent } from './pages/product-table-component/product-table-component';
import { AdminHomeComponent } from './pages/admin-home-component/admin-home-component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { CreateEditProudct } from './pages/modals/create-edit-proudct/create-edit-proudct';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';


@NgModule({
  declarations: [
    ProductTableComponent,
    AdminHomeComponent,
    CreateEditProudct
  ],
  imports: [
    CommonModule,
    NgbDropdownModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatTooltipModule
  ]
})
export class AdminModule { }
