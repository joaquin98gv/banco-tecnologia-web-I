import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { CommonService } from './common.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor( private common: CommonService, private http: HttpClient ) { }

  logear(o: any){
    const url = environment.urlApiBase + 'login.php';
    return this.http.post(url, o);
  }
}
