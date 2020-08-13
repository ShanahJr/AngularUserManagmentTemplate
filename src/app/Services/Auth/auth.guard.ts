import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (localStorage.getItem('UserToken') == null) {
      // return false;
      this.router.navigate(['/LogIn']);
    } else {
      let role = next.data['roles'] as string;

      if (role) {
        debugger;
        if (role == localStorage.getItem('UserRole')) {
          return true;
        } else {
          this.router.navigate(['/Forbidden']);
        }
      }

      return true;
    }
  }
}
