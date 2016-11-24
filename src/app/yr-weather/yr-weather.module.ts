import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { YrWeatherComponent } from './yr-weather.component';
import {YrWeatherService} from "./yr-weather.service";
import {SpinnerModule} from "../spinner/spinner.module";

@NgModule({
  imports: [
    CommonModule,
    SpinnerModule
  ],
  declarations: [YrWeatherComponent],
  exports: [
    YrWeatherComponent
  ],
  providers: [ YrWeatherService ]
})
export class YrWeatherModule { }
