import { Component, OnInit } from '@angular/core';
import {AuthService} from "../shared/auth.service";

@Component({
  selector: 'rs-header',
  templateUrl: 'header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  isLoggedIn: boolean;
  constructor(private authService: AuthService) { }

  ngOnInit() {

  }

}
