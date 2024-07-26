import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { tap, map, switchMap, take } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor( public authService: AuthService, public router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): any {

    var userlocal:any = JSON.parse(localStorage.getItem("user")||"{}");
    //
    if (userlocal.hotel === "true") {
      return true
    } else {
      this.router.navigate(['/auth/login'], {
        queryParams: {},
      });
      return false
    }
    // return
    // this.afAuth.user.pipe(
    //   take(1),
    //   map(user => !!user),
    //     tap(loggedIn => {
    //       if (!loggedIn) {
    //         console.log('access denied');
    //         this.router.navigate(['/login']);
    //       } else {
    //         this.router.navigate(['/main']);
    //       }
    //     })
    // );
    // this.afAuth.authState.pipe(
    //   take(1),
    //   map(user => !!user),
    //   tap(isAdmin => {
    //     if (isAdmin) {
    //       console.log('admin user, you shall pass');
    //     } else {
    //       console.log('non-admin user, go home');
    //       this.router.navigate(['/']);
    //     }
    //   })
    // );
    // if (this.authService.isLoggedIn !== true) {
    //   this.router.navigate(['sign-in']);
    // }
    // return this.afAuth.authState
    // .take(1)
    // .map(user => !!user)
    // .do(loggedIn => {
    // if (!loggedIn) {
    // this.router.navigate(['/login']);
    // }
    // });
  }

}
