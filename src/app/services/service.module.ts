import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  LoginService,
  ClienteService,
  CuentaService,
  TransaccionService,
  ValidadorsService
 } from './service.index';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    LoginService,
    ClienteService,
    CuentaService,
    TransaccionService,
    ValidadorsService
  ]
})
export class ServiceModule { }
