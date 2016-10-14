import { Component, OnInit } from '@angular/core';
import {AuthService} from "../shared/auth.service";
import {User} from "../shared/user";

@Component({
  selector: 'rs-header',
  templateUrl: 'header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {


  constructor(private authService: AuthService) { }

  ngOnInit() {

  }

}
