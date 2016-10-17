import {Observable} from "rxjs";
import {User} from "../models/user";
import {EventEmitter} from "@angular/core";
export interface UserService {
  userChanged: EventEmitter<User>;
  login(user: User);
  logout();
}
