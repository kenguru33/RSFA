import {Injectable, OpaqueToken, EventEmitter} from '@angular/core';
import {UserService} from "../user.service";
import {Observable} from "rxjs";
import {User} from "../../models/user";
import {AngularFire, FirebaseAuthState, AngularFireAuth} from "angularfire2";

export let UserServiceToken = new OpaqueToken("UserService");

@Injectable()
export class FirebaseUserService implements UserService{

  private authState: FirebaseAuthState = null;

  authStateChanged: EventEmitter<User> = new EventEmitter<User>();

  constructor(private auth: AngularFireAuth) {
    auth.subscribe( (state: FirebaseAuthState) => {
      let user: User;
      if(state) {
        // user logged in
        user = new User();
        user.email = state.auth['email'];
        user.displayName = state.auth['displayName'];
        //noinspection TypeScriptUnresolvedFunction
        state.auth.getToken(true).then(token=>{
          localStorage.setItem('userToken',token);
          //noinspection TypeScriptUnresolvedVariable
          localStorage.setItem('refreshToken', state.auth.refreshToken);
          this.authState = state;
          this.authStateChanged.emit(user);
        });
      }
      else {
        // user not logged in
        localStorage.removeItem('userToken');
        localStorage.removeItem('refreshToken');
        this.authState = state;
        this.authStateChanged.emit(user);
      }
    });
  }

  login(user: User) {
    this.auth.login(user);
  }

  logout() {
    this.auth.logout();
  }

  get authenticated(): boolean {
    // trigger refresh token.
    return this.authState !== null;
  }

  get token(): Promise<any>
  {
    if (this.authenticated) {
      //noinspection TypeScriptUnresolvedFunction
      return this.authState.auth.getToken(true) as Promise<any>;
    }
    else return null;


  }

}
