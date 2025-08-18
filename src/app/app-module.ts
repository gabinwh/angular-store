import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { CartModule } from './features/cart/cart-module';
import { AuthModule } from './features/auth/auth-module';
import { ProductModule } from './features/product/product-module';
import { HomeModule } from './features/home/home-module';
import { SharedModule } from './shared/shared-module';

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
    HomeModule,
    SharedModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [App]
})
export class AppModule { }
