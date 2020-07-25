import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LogeadoGuard implements CanActivate {
  constructor(  private router: Router  ) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    console.log(state);
    if (localStorage.getItem('Authorization') === null || localStorage.getItem('user_tw1') === null) {
      console.log(this.router);
      this.router.navigateByUrl(`/login?next=${state.url}`);
      // return false;
    }
    return true;
  }
}
