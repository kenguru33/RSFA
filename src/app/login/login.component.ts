import {Component, OnInit, OnChanges, SimpleChanges} from '@angular/core';
import {AuthService} from "../shared/auth.service";
import {User} from "../shared/user";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    if(this.isLoggedIn()) {
      //this.router.navigate(['/skøyter']);
      //let location = new Location();
      //location.assign('skøyter');
    }
  }

  login(user: User) {
    this.authService.login(user).then(user=>{
      this.authService.getCurrentUser()['md'];
      this.router.navigate(['/skøyter']);
    }).catch(error=>{
      console.log(error);
    });
  }


  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  logOut() {
    this.authService.logout().then(()=>{
      localStorage.removeItem('mytoken');
    })
  }
}
