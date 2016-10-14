import { BrowserModule } from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import {VesselsModule} from "./vessels/vessels.module";
import {routing} from "./app.routing";
import {LoginComponent} from "./login/login.component";
import {HeaderComponent} from "./header/header.component";
import {VesselClassesModule} from "./vessel-classes/vessel-classes.module";
import {StationsModule} from "./stations/stations.module";
import {SpinnerModule} from "./spinner/spinner.module";
import {AuthService} from "./shared/auth.service";
import {LoginGuard} from "./shared/login.guard";
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    VesselsModule,
    routing,
    VesselClassesModule,
    StationsModule
  ],
  providers: [AuthService,LoginGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
