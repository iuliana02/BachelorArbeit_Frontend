import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "../service/auth.service";

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private authService : AuthService, private router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let url: string = state.url;
    return this.checkUserLogin(next);
  }

  checkUserLogin(route: ActivatedRouteSnapshot): boolean {
    if (this.authService.isLoggedIn()) {
      const userRole = this.authService.getRole();
      if (route.data['role'] == "landlord") {
          this.router.navigate(['home-landlord']);
          return false;
        // else if (route.data['role'] == 'landlord')
        // {
        //   this.router.navigate(['home-landlord']);
        //   return false;
        // }
      }
      return true;
    }
    return false;
  }

}
