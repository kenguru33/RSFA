import {Component, OnInit, OnChanges, SimpleChanges, ChangeDetectorRef, Inject, OnDestroy} from '@angular/core';
import {UserServiceToken} from "../user-manager/shared/services/firebase/firebase-user.service";
import {UserService} from "../user-manager/shared/services/user.service";
import {Subscription} from "rxjs";
import {User} from "../user-manager/shared/models/user";

@Component({
  selector: 'rs-header',
  templateUrl: 'header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit, OnDestroy {

  private userChanged: Subscription;
  private user: User;
  private isLoggedIn: boolean;

  constructor(@Inject(UserServiceToken) private userService: UserService) { }

  ngOnInit() {
    this.userChanged = this.userService.userChanged.subscribe(user=>{
      if(user) {
        this.user = user;
        this.isLoggedIn = true;
      }
      else {
        this.user = new User();
        this.user.email = "Ikke logget inn!"
        this.isLoggedIn = false;
      }
    });
  }

  ngOnDestroy(): void {
  }

  onLogOut(){
    this.userService.logout();
  }
}
