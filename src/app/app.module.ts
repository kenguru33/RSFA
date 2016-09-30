import { BrowserModule } from '@angular/platform-browser';
import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
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

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
