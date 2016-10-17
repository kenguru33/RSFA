import {Injectable, OpaqueToken, EventEmitter} from '@angular/core';
import {UserService} from "../user.service";
import {Observable} from "rxjs";
import {User} from "../../models/user";
import {AngularFire, FirebaseAuthState} from "angularfire2";

export let UserServiceToken = new OpaqueToken("UserService");

@Injectable()
export class FirebaseUserService implements UserService{

  userChanged: EventEmitter<User> = new EventEmitter<User>();

  constructor(private af: AngularFire) {
    this.af.auth.subscribe( firebaseUser => {
      let user: User;
      console.log(firebaseUser);
      if(firebaseUser) {
        // user logged in
        user = new User();
        user.email = firebaseUser.auth['email'];
        user.displayName = firebaseUser.auth['displayName'];
        localStorage.setItem('userToken',firebaseUser.auth['kd']);
      }
      else {
        // user not logged in
        localStorage.removeItem('userToken');
      }
      this.userChanged.emit(user);
    });
  }

  login(user: User) {
    this.af.auth.login(user);
  }

  logout() {
    this.af.auth.logout();
  }


}
