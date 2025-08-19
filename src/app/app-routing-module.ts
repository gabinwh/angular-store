import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './features/home/home-component/home-component';
import { ProductDetailComponent } from './features/product/product-detail-component/product-detail-component';
import { LoginComponent } from './features/auth/login-component/login-component';
import { CartComponent } from './features/cart/cart-component/cart-component';
import { authGuard } from './core/guards/auth-guard';

const routes: Routes = [
  { path: 'home', component: HomeComponent },

  { path: 'product/:id', component: ProductDetailComponent },

  { path: 'login', component: LoginComponent },

  { path: 'cart', component: CartComponent, canActivate: [authGuard] },

  {
    path: 'admin',
    loadChildren: () => import('./features/admin/admin-module').then(m => m.AdminModule),
    canActivate: [authGuard]
  },

  // Rota padrão (redireciona para a página inicial)
  { path: '', redirectTo: '/home', pathMatch: 'full' },

  // Rota curinga para lidar com caminhos não encontrados
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }