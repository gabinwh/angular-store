import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminHomeComponent } from './pages/admin-home-component/admin-home-component';
import { ProductTableComponent } from './pages/product-table-component/product-table-component';

const routes: Routes = [
  {
    path: '',
    component: AdminHomeComponent,
  },
  {
    path: 'products',
    component: ProductTableComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }