import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-yr-weather',
  templateUrl: './yr-weather.component.html',
  styleUrls: ['./yr-weather.component.css']
})
export class YrWeatherComponent implements OnInit {

  @Input() position = {
    lat: 53.3478,
    lon: 6.2597
  };

  constructor() {

  }

  ngOnInit() {
    var client = require("metno-client");
    client.getWeather({
      params: {lat: 20.123, lon: 43.232},
      request: {timeout: 1000}
    }, function(error, report){
      console.log(report);
    });
  }

}
