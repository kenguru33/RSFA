import { Injectable } from '@angular/core';
import {User} from "./user";

declare var firebase: any;

@Injectable()
export class AuthService {

  constructor() {
    var config = {
      apiKey: "AIzaSyDgAkPHkC2KabvWelAFggwWQvGB-dTU5eI",
      authDomain: "rsfa-e3c2f.firebaseapp.com",
      databaseURL: "https://rsfa-e3c2f.firebaseio.com",
      storageBucket: "rsfa-e3c2f.appspot.com",
      messagingSenderId: "439046788820"
    };
    firebase.initializeApp(config);
  }

  login(user: User): Promise<User> {
    return firebase.auth().signInWithEmailAndPassword(user.email, user.password).then(user=>{
      console.log(user.email);
      return user;
    }).catch(error=>{
      console.log(error);
      return error;
    })
  }

  isLoggedIn() {
    let user = firebase.auth().currentUser;
    if (user) {
      return true
    } else {
      return false;
    }
  }

  logout() {

    return firebase.auth().signOut();
  }

}
