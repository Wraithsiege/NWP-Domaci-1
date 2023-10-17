import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanDeactivate,
  Router,
  RouterStateSnapshot,
  UrlTree
} from "@angular/router";
import { Observable } from "rxjs";
import {ConfigService} from "./services/config.service";

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate, CanDeactivate<unknown> {

  constructor(private router: Router, private configService: ConfigService) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      localStorage.setItem('token', this.configService.getToken().toString());

      if(localStorage.getItem('token') == '') {
        this.router.navigate(['configuration']);
        alert("Molimo, unesite token kako bi ste pristupili API")
      }

      return true;
    }

    canDeactivate(
      component: unknown,
      currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot,
      nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

        return true;
      }

}
