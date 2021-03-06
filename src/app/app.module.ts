import { BrowserModule } from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {HttpModule, JsonpModule} from '@angular/http';

import { AppComponent } from './app.component';
import {VesselsModule} from "./vessels/vessels.module";
import {routing} from "./app.routing";
import {LoginComponent} from "./login/login.component";
import {HeaderComponent} from "./header/header.component";
import {VesselClassesModule} from "./vessel-classes/vessel-classes.module";
import {StationsModule} from "./stations/stations.module";
import {SpinnerModule} from "./spinner/spinner.module";
import {LoginGuard} from "./shared/login.guard";
import {UserManagerModule} from "./user-manager/user-manager.module";
import {Ng2PaginationModule} from "ng2-pagination";
import { OverviewComponent } from './overview/overview.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    OverviewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    VesselsModule,
    routing,
    VesselClassesModule,
    StationsModule,
    UserManagerModule,
    SpinnerModule
  ],
  providers: [LoginGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
