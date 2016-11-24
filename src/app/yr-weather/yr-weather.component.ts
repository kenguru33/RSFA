import {Component, OnInit, Input, OnDestroy} from '@angular/core';
import {YrWeatherService} from "./yr-weather.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-yr-weather',
  templateUrl: './yr-weather.component.html',
  styleUrls: ['./yr-weather.component.css']
})
export class YrWeatherComponent implements OnInit, OnDestroy {


  @Input() latitude = 0;
  @Input() longitude = 0;

  showWeather = false;

  weatherSub: Subscription;

  icon = "";
  temperature = "";
  windSpeed: "";
  windDirection: "";

  constructor(private yrWeatherService: YrWeatherService) {

  }

  ngOnInit() {
    this.showWeather = false;
    this.getWeather();
  }

  ngOnDestroy(): void {
    this.weatherSub.unsubscribe();
  }

  private getWeather() {
    this.weatherSub =  this.yrWeatherService.getWeather(this.latitude, this.longitude).subscribe((response)=>{
      let weather = response.json().weatherReport.times[0] || {};
      this.icon = `http://api.met.no/weatherapi/weathericon/1.1/?symbol=${weather.symbol.number};content_type=image/png`;
      this.temperature = weather.temperature.value;
      this.windSpeed = weather.windSpeed.name;
      this.windDirection = weather.windDirection.name;
      this.showWeather = true;
    });
  }

}
