import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home-component/home-component';
import { SharedModule } from "../../shared/shared-module";
import { MatProgressBar } from '@angular/material/progress-bar';
import { HomeRoutingModule } from './home-routing.module';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatProgressBar,
    HomeRoutingModule
  ]
})
export class HomeModule { }
