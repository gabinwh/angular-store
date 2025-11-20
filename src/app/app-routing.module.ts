import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './features/home/home-component/home-component';
import { ProductDetailComponent } from './features/product/product-detail-component/product-detail-component';
import { LoginComponent } from './features/auth/login-component/login-component';
import { authGuard } from './core/guards/auth-guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule)
  },

  {
    path: 'home',
    loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule)
  },

  {
    path: 'product/:id',
    loadChildren: () => import('./features/product/product.module').then(m => m.ProductModule)
  },

  {
    path: 'cart',
    canActivate: [authGuard],
    loadChildren: () => import('./features/cart/cart.module').then(m => m.CartModule)
  },

  {
    path: 'admin',
    canActivate: [authGuard],
    loadChildren: () => import('./features/admin/admin.module').then(m => m.AdminModule),
  },

  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
