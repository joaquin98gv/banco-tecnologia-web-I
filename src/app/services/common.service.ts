import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(  private http: HttpClient  ) { }

  public getCabecera() {
    const headers = new HttpHeaders()
          .append('Authorization',
          'Bearer ' + (localStorage.getItem('Authorization') == null ? '' : localStorage.getItem('Authorization')));
    return headers;
  }
}
