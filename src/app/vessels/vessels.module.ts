import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {HttpModule} from "@angular/http";
import {VesselsComponent} from "./vessels.component";
import {vesselsRouting} from "./vessels.routing";
import {SpinnerComponent} from "../shared/spinner/spinner.component";
import {ModalWindowModule} from "../modal-window/modal-window.module";
import {VesselsListComponent} from "./vessels-list/vessels-list.component";
import {VesselsService} from "./vessels.service";
import {VesselsDetailComponent} from "./vessels-detail/vessels-detail.component";
import { VesselsDetailEditComponent } from './vessels-detail/vessels-detail-edit.component';

@NgModule({
  declarations: [
    VesselsComponent,
    VesselsListComponent,
    SpinnerComponent,
    VesselsDetailComponent,
    VesselsDetailEditComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    vesselsRouting,
    ModalWindowModule
  ],
  exports:[
    VesselsComponent
  ],
  providers: [ VesselsService ]
})
export class VesselsModule {
}
