import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { StationsComponent } from './stations.component';
import { StationsListComponent } from './stations-list/stations-list.component';
import { StationsDetailComponent } from './stations-detail/stations-detail.component';
import {StationsService} from "./stations.service";
import {stationsRouting} from "./stations.routing";
import {ModalWindowModule} from "../modal-window/modal-window.module";
import {HttpModule} from "@angular/http";
import {FormsModule} from "@angular/forms";

@NgModule({
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  imports: [
    CommonModule,
    stationsRouting,
    FormsModule,
    HttpModule,
    ModalWindowModule
  ],
  declarations: [StationsComponent, StationsListComponent, StationsDetailComponent],
  providers: [StationsService]
})
export class StationsModule { }
