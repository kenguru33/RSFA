import {Component, OnInit, Input} from '@angular/core';
import * as YrNoForecast from 'yr.no-forecast';

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

  constructor() { }

  ngOnInit() {

    YrNoForecast.getWeather(this.position, (error,location)=>{
      location.getCurrentSummary((error, summary)=>{
        console.log('weather', summary );
      });
    },'1.9');
  }

}
