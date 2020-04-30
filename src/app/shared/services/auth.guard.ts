import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserService } from './user.service';
import { AuthService } from './authentication.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    private userService: UserService,
    private router: Router,
    private authService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.authService.currentUserValue;
    return this.userService.isAllowed(route).pipe(
      map(val => {
        if (val.allowed && currentUser) {
          return true;
        } else {
          this.router.navigate(['/login'], {
            queryParams: {
              return: state.url
            }
          });
          return false;
        }
      }));
  };
}
