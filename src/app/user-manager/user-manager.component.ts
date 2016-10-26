import {Component, OnInit, Inject, OnDestroy} from '@angular/core';
import {UserService} from "./shared/services/user.service";
import {UserServiceToken} from "./shared/services/firebase/firebase-user.service";
import {User} from "./shared/models/user";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-user-manager',
  templateUrl: 'user-manager.component.html',
  styleUrls: ['user-manager.component.css']
})
export class UserManagerComponent implements OnInit, OnDestroy {

  userChanged: Subscription;
  user: User = new User();

  constructor(@Inject(UserServiceToken) private userService: UserService){}


  ngOnInit() {
    this.userChanged = this.userService.authStateChanged.subscribe(user => {
      this.user = user;
      console.log(user);
    });
  }

  ngOnDestroy(): void {
    this.userChanged.unsubscribe();
  }

  onTestLogin() {

  }

  onSignOut(){

  }

}
