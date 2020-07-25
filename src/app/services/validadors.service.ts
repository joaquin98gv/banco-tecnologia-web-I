import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { CommonService } from './common.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { ClienteService } from './cliente.service';
import { Result } from '../models/result.model';

@Injectable({
  providedIn: 'root'
})
export class ValidadorsService {

  dataUser = JSON.parse(localStorage.getItem('user_tw1'));
  cliente;
  constructor( private clienteS: ClienteService ) { }

  // Solo lo hice para tener un ejemplo de validacion asincrona
  tieneAlMenos(control: FormControl): Promise<any> | Observable<any>{
    return new Promise((resolve, reject) => {
      this.clienteS.getCliente(this.dataUser.id).subscribe((x: Result) => {
        if (x.status === 200) {
          if (x.data.Monto >= control.value) {
            resolve({noCumple: true});
          } else {
            resolve( null );
          }
        } else {
          console.log(x.msg);
        }
      });
    });
  }

}
