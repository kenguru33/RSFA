import {Injectable, Inject} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from "@angular/router";
import {Observable} from "rxjs";
import {Location} from "@angular/common";
import {UserService} from "../user-manager/shared/services/user.service";
import {UserServiceToken} from "../user-manager/shared/services/firebase/firebase-user.service";

@Injectable()
export class LoginGuard implements CanActivate{

  constructor(@Inject(UserServiceToken) private userService: UserService, private router: Router, private location: Location) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|Promise<boolean>|boolean {

    if (state.url !== '/logginn' && !localStorage.getItem('userToken')) {
      this.router.navigate(['/logginn']);
      return false;
    }
    console.log(route);
    return true;
  }
}
