import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NoLogeadoGuard implements CanActivate {
  constructor( private router: Router ) { }

  canActivate(): boolean {
    if (localStorage.getItem('Authorization') != null && localStorage.getItem('user_tw1') != null) {
      this.router.navigateByUrl('/');
      return false;
    }
    return true;
  }

}
