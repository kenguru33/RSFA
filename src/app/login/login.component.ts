import {Component, OnInit, OnChanges, SimpleChanges, EventEmitter, Inject} from '@angular/core';
import {Router} from "@angular/router";
import {Location} from "@angular/common";
import {UserServiceToken} from "../user-manager/shared/services/firebase/firebase-user.service";
import {UserService} from "../user-manager/shared/services/user.service";
import {User} from "../user-manager/shared/models/user";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private authStateChanged: Subscription;

  private isLoading = false;

  constructor(@Inject(UserServiceToken) private userService: UserService, private router: Router, private location: Location ) { }

  ngOnInit() {
    this.authStateChanged = this.userService.authStateChanged.subscribe(user=>{
      if(user) {
        this.router.navigate(['fartøyer']);
        this.isLoading = false;
      }
    });
  }

  login(user: User) {
    this.userService.login(user);
    this.isLoading = true;
    setTimeout(()=>{ this.isLoading = false; }, 5000);
  }

  logOut() {
    this.userService.logout();
  }
}
