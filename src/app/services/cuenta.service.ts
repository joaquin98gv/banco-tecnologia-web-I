import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { CommonService } from './common.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CuentaService {

  constructor( private common: CommonService, private http: HttpClient ) { }

  crearCuenta(o){
    const url = environment.urlApiBase + 'PostCuenta.php';
    return this.http.post(url, o);
  }

  enviarPago(o){
    const url = environment.urlApiBase + 'PostPagoCuenta.php';
    return this.http.post(url, o);
  }

}
