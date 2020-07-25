import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagenPipe } from './imagen.pipe';
import { TipoTransaccionPipe } from './tipo-transaccion.pipe';



@NgModule({
  declarations: [
    ImagenPipe,
    TipoTransaccionPipe
  ],
  imports: [],
  exports: [
    ImagenPipe,
    TipoTransaccionPipe
  ]
})
export class PipeModule { }
