import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginComponent } from './login-component/login-component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateUserModal } from './create-user-modal/create-user-modal';
import { MatTooltipModule } from '@angular/material/tooltip';


@NgModule({
  declarations: [
    LoginComponent,
    CreateUserModal
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatTooltipModule
  ]
})
export class AuthModule { }
