import { Routes } from '@angular/router';
import { AdminHomeComponent } from './pages/admin-home-component/admin-home-component';
import { ProductTableComponent } from './pages/product-table-component/product-table-component';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    component: AdminHomeComponent,
  },
  {
    path: 'products',
    component: ProductTableComponent,
  },
];