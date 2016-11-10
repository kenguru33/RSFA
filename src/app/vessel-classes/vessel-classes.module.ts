import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { VesselClassesComponent } from './vessel-classes.component';
import { VesselClassesListComponent } from './vessel-classes-list/vessel-classes-list.component';
import { VesselClassesDetailComponent } from './vessel-classes-detail/vessel-classes-detail.component';
import {ModalWindowModule} from "../modal-window/modal-window.module";
import {VesselClassesService} from "./vessel-classes.service";
import {HttpModule} from "@angular/http";
import {FormsModule} from "@angular/forms";
import {vesselClassesRouting} from "./vessel-classes.routing";
import {VesselClassesDetailEditComponent} from "./vessel-classes-detail/vessel-classes-detail-edit.component";
import {SpinnerModule} from "../spinner/spinner.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    ModalWindowModule,
    vesselClassesRouting,
    SpinnerModule
  ],
  declarations: [
    VesselClassesComponent,
    VesselClassesListComponent,
    VesselClassesDetailComponent,
    VesselClassesDetailEditComponent
  ],

  providers: [
    VesselClassesService
  ]
})
export class VesselClassesModule { }
