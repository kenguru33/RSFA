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
    lat: 0,
    lng: 0
  };

  constructor() { }

  ngOnInit() {

    YrNoForecast.getWeather((error,position)=>{
      position.getWeather((error, summary)=>{
        console.log('weather', summary );
      });
    },'1.9');
  }

}
