import {Component, OnInit, OnChanges, SimpleChanges} from '@angular/core';
import {AuthService} from "../shared/auth.service";
import {User} from "../shared/user";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnChanges {
  ngOnChanges(changes: SimpleChanges): void {
    console.log('change detected',changes);
  }


  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  login(user: User) {
    this.authService.login(user).then(user=>{
      console.log(user);
      this.router.navigate(['skøyter']);
    }).catch(error=>{
      console.log(error);
    })
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  logOut() {
    console.log('isloogedOut:',this.isLoggedIn());
    this.authService.logout().then(()=>{

    })
  }

}
