import {Observable} from "rxjs";
import {User} from "../models/user";
import {EventEmitter} from "@angular/core";
export interface UserService {
  authStateChanged: EventEmitter<User>;
  login(user: User);
  logout();
  authenticated: boolean;
  token: Promise<string>;
}
