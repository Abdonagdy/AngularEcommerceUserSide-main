import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { UserService } from '../Components/user/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    const token = localStorage.getItem('token');

    if (!token) {
      this.router.navigate(['/Login'], { queryParams: { returnUrl: state.url } });
      return of(false);
    }

    return this.userService.getuserValue(token).pipe(
      map(auth => {
        if (auth) {
          return true;
        } else {
          this.router.navigate(['/Login'], { queryParams: { returnUrl: state.url } });
          return false;
        }
      }),
      catchError(() => {
        this.router.navigate(['/Login'], { queryParams: { returnUrl: state.url } });
        return of(false);
      })
    );
  }
}
