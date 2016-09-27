import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { VesselClassesComponent } from './vessel-classes.component';
import { VesselClassesListComponent } from './vessel-classes-list/vessel-classes-list.component';
import { VesselClassesDetailComponent } from './vessel-classes-detail/vessel-classes-detail.component';
import {ModalWindowModule} from "../modal-window/modal-window.module";
import {VesselClassesService} from "./vessel-classes.service";
import {HttpModule} from "@angular/http";
import {FormsModule} from "@angular/forms";

@NgModule({
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    ModalWindowModule
  ],
  declarations: [
    VesselClassesComponent,
    VesselClassesListComponent,
    VesselClassesDetailComponent
  ],

  providers: [
    VesselClassesService
  ]
})
export class VesselClassesModule { }
