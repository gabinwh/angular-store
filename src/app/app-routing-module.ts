import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './features/home/home-component/home-component';
import { ProductDetailComponent } from './features/product/product-detail-component/product-detail-component';
import { LoginComponent } from './features/auth/login-component/login-component';
import { CartComponent } from './features/cart/cart-component/cart-component';
import { authGuard } from './core/guards/auth-guard';
import { AdminHomeComponent } from './features/admin/pages/admin-home-component/admin-home-component';
import { ProductTableComponent } from './features/admin/pages/product-table-component/product-table-component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },

  { path: 'product/:id', component: ProductDetailComponent },

  { path: 'login', component: LoginComponent },

  // { path: 'cart', component: CartComponent, canActivate: [authGuard] },

  {
    path: 'cart',
    canActivate: [authGuard],
    loadChildren: () => import('../app/features/cart/cart.module').then(m => m.CartModule)
  },

  {
    path: 'admin',
    canActivate: [authGuard],
    children: [
      {
        path: '', 
        component: AdminHomeComponent
      },
      {
        path: 'products', 
        component: ProductTableComponent
      }
    ]
  },

  { path: '', redirectTo: '/home', pathMatch: 'full' },

  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }