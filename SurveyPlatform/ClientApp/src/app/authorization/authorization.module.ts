import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RegisterComponent} from './register/register.component';
import {RegisterEmailComponent} from './register-email/register-email.component';
import {RegisterInfoComponent} from './register-info/register-info.component';
import {RegisterPasswordComponent} from './register-password/register-password.component';
import { ReactiveFormsModule } from '@angular/forms';

import {routing} from './authorization.routing';
 

@NgModule({
  declarations: [RegisterComponent,
                  RegisterEmailComponent,
                  RegisterInfoComponent,
                  RegisterPasswordComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    routing
  ],
  exports: [RegisterComponent]
})
export class AuthorizationModule { }
