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
    var yrno = require('yr.no-interface'),
      dublin = {
        lat: 53.3478,
        lon: 6.2597
      },
      LOC_VER = 1.9;


    yrno.locationforecast(dublin, LOC_VER, function (err, xml) {
      if (err) {
        // Something went wrong...
      } else {
        console.log(xml);
      }
    });
  }

}
