import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { YrWeatherComponent } from './yr-weather.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [YrWeatherComponent],
  exports: [
    YrWeatherComponent
  ]
})
export class YrWeatherModule { }
