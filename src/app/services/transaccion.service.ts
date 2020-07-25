import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { CommonService } from './common.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TransaccionService {

  constructor( private common: CommonService, private http: HttpClient ) { }

  GetTransacciones(id: number){
    const url = environment.urlApiBase + `GetTransacciones.php?idCuenta=${id}`;
    return this.http.get(url);
  }
}
