import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from "@angular/router";


@Injectable()
export class AuthGuardService implements CanActivateChild{

    constructor(private router: Router) { }
    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (this.checkLogin() ) {
            return true;
          }
          this.router.navigate(["login"]);
          return false;
    }
    checkLogin() {
        return true;
    }

}