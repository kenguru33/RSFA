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
import { StationsDetailEditComponent } from './stations-detail/stations-detail-edit.component';
import {SpinnerModule} from "../spinner/spinner.module";

@NgModule({
  imports: [
    CommonModule,
    stationsRouting,
    FormsModule,
    HttpModule,
    ModalWindowModule,
    SpinnerModule
  ],
  declarations: [StationsComponent, StationsListComponent, StationsDetailComponent, StationsDetailEditComponent],
  providers: [StationsService]
})
export class StationsModule { }