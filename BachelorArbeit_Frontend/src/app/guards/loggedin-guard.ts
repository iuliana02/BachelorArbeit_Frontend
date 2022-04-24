import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";

@Injectable()
export class LoggedInGuard implements CanActivate {
  constructor(private router: Router) {
  }

  /**
   * Check the elements stored in local storage during login
   * If all of them is set that means it was a successful login
   * the values can be considered set if they differ from null
   *
   * @param route
   * @param state
   */
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log("USERNAME: " + localStorage.getItem('username'));
    if (localStorage.getItem('STATE') == 'true') {
      return true;
    } else {
      return this.router.navigate(['login']);
    }
  }
}
