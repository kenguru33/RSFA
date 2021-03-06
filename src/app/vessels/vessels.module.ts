import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {HttpModule} from "@angular/http";
import {VesselsComponent} from "./vessels.component";
import {vesselsRouting} from "./vessels.routing";
import {ModalWindowModule} from "../modal-window/modal-window.module";
import {VesselsListComponent} from "./vessels-list/vessels-list.component";
import {VesselsService} from "./vessels.service";
import {VesselsDetailComponent} from "./vessels-detail/vessels-detail.component";
import { VesselsDetailEditComponent } from './vessels-detail/vessels-detail-edit.component';
import {SpinnerModule} from "../spinner/spinner.module";
import {FilterPipe} from "./filter.pipe";
import { SortPipe } from './sort.pipe';
import { SearchPipe } from './search.pipe';
import {AisService} from "./ais.service";
import {AgmCoreModule} from "angular2-google-maps/core";
import {Ng2baPaginationModule} from "../ng2ba-pagination/ng2ba-pagination.module";
import {YrWeatherModule} from "../yr-weather/yr-weather.module";



// Initialize Firebase
export const firebaseConfig = {
  apiKey: "AIzaSyDgAkPHkC2KabvWelAFggwWQvGB-dTU5eI",
  authDomain: "rsfa-e3c2f.firebaseapp.com",
  databaseURL: "https://rsfa-e3c2f.firebaseio.com",
  storageBucket: "rsfa-e3c2f.appspot.com",
  messagingSenderId: "439046788820"
};

@NgModule({

  declarations: [
    VesselsComponent,
    VesselsListComponent,
    VesselsDetailComponent,
    VesselsDetailEditComponent,
    FilterPipe,
    SortPipe,
    SearchPipe,
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    vesselsRouting,
    ModalWindowModule,
    SpinnerModule,
    Ng2baPaginationModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAkkr1PCZqPd2S4-tX0ociz2-_mtdQsUcg'
    }),
    YrWeatherModule

  ],
  exports:[
    VesselsComponent
  ],
  providers: [ VesselsService, AisService ]
})
export class VesselsModule {
}
