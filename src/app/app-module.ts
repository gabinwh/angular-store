import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { CartModule } from './features/cart/cart-module';
import { AuthModule } from './features/auth/auth-module';
import { ProductModule } from './features/product/product-module';
import { HomeModule } from './features/home/home-module';
import { SharedModule } from './shared/shared-module';
import { AuthInterceptor } from './core/interceptors/auth-interceptor';
import { AdminModule } from './features/admin/admin-module';

@NgModule({
  declarations: [
    App
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CartModule,
    AuthModule,
    ProductModule,
    AdminModule,
    HomeModule,
    SharedModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [App]
})
export class AppModule { }
