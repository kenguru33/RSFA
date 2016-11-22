import {Component, OnInit, Input} from '@angular/core';
import * as Weather from 'yr.no-forecast';

@Component({
  selector: 'app-yr-weather',
  templateUrl: './yr-weather.component.html',
  styleUrls: ['./yr-weather.component.css']
})
export class YrWeatherComponent implements OnInit {

  weather: any;
  @Input() position = {
    lat: 53.3478,
    lon: 6.2597
  };

  constructor() {

  }

  ngOnInit() {
    let yrno = new Weather;
    yrno.getWeather(this.position,function (error, location) {
      if (error) {
        console.log(error);
        return;
      }
      location.getCurrentSummary(function (error, summary) {
        console.log(summary);
      });
      location.getFiveDaySummary(function (error, summary) {
        console.log(summary);
      });
    }, '1.9');
  }

}
