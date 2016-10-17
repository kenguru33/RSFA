import {NgModule, OpaqueToken} from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserManagerComponent } from './user-manager.component';
import {FirebaseUserService, UserServiceToken} from "./shared/services/firebase/firebase-user.service";
import {myFirebaseAuthConfig, myFirebaseConfig} from "./shared/services/firebase/firebase-config";
import {AngularFireModule} from "angularfire2";
import {FormsModule} from "@angular/forms";



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AngularFireModule.initializeApp(myFirebaseConfig, myFirebaseAuthConfig)
  ],
  declarations: [UserManagerComponent],
  providers: [{provide: UserServiceToken, useClass: FirebaseUserService}],
  exports: [UserManagerComponent]
})
export class UserManagerModule { }

