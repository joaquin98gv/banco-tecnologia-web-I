import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { CommonService } from './common.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor( private common: CommonService, private http: HttpClient ) { }

  getCliente(id: number){
    const url = environment.urlApiBase + `GetCliente.php?idCliente=${id}`;
    return this.http.get(url);
  }

  getClientes(){
    const url = environment.urlApiBase + 'GetClientes.php';
    return this.http.get(url);
  }

}
