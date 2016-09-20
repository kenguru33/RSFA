import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { StationsComponent } from './stations/stations.component';
import { LoginComponent } from './login/login.component';
import {VesselsModule} from "./vessels/vessels.module";
import {routing} from "./app.routing";
import {HeaderComponent } from './header/header.component';

@NgModule({
    declarations: [
        AppComponent,
        StationsComponent,
        LoginComponent,
        HeaderComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        routing,
        VesselsModule,

    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
