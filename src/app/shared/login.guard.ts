import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from "@angular/router";
import {Observable} from "rxjs";
import {AuthService} from "./auth.service";
import {Location} from "@angular/common";

@Injectable()
export class LoginGuard implements CanActivate{

  constructor(private authService: AuthService, private router: Router, private location: Location) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|Promise<boolean>|boolean {

    if (state.url !== '/logginn' && !localStorage.getItem('userToken')) {
      this.router.navigate(['/logginn']);
      return false;
    }
    console.log(route);
    return true;
  }
}
