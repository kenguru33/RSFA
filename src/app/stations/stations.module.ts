import {NgModule} from '@angular/core';
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
import {SortPipe} from "./sort.pipe";
import {FilterPipe} from "./filter.pipe";
import {SearchPipe} from "./search.pipe";
import {Ng2baPaginationModule} from "../ng2ba-pagination/ng2ba-pagination.module";

@NgModule({
  imports: [
    CommonModule,
    stationsRouting,
    FormsModule,
    HttpModule,
    ModalWindowModule,
    SpinnerModule,
    Ng2baPaginationModule
  ],
  declarations: [
    StationsComponent,
    StationsListComponent,
    StationsDetailComponent,
    StationsDetailEditComponent,
    SortPipe,
    FilterPipe,
    SearchPipe
  ],
  providers: [StationsService]
})
export class StationsModule { }
