import {Component, OnInit, Input, OnDestroy, OnChanges, SimpleChanges} from '@angular/core';
import {YrWeatherService} from "./yr-weather.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-yr-weather',
  templateUrl: './yr-weather.component.html',
  styleUrls: ['./yr-weather.component.css']
})
export class YrWeatherComponent implements OnInit, OnDestroy, OnChanges {
  ngOnChanges(changes: SimpleChanges): void {
    this.showWeather = false;
    this.getWeather();
    console.log(changes);
  }


  @Input() latitude: string;
  @Input() longitude: string;

  showWeather = true;

  icon: string;
  temperature: string;
  windSpeed: string;
  windDirection: string;

  weatherReport: any;

  constructor(private yrWeatherService: YrWeatherService) {}

  ngOnInit() {

  }

  ngOnDestroy(): void {
  }

  private getWeather() {
    this.yrWeatherService.getWeather(this.latitude, this.longitude).subscribe((response)=>{
      const weatherReport = response.json().weatherReport;
      if (weatherReport) {
        let weather = weatherReport.times[0];
        this.icon = `http://api.met.no/weatherapi/weathericon/1.1/?symbol=${weather.symbol.number};content_type=image/png`;
        this.temperature = weather.temperature.value;
        this.windSpeed = weather.windSpeed.name;
        this.windDirection = weather.windDirection.name;
        this.showWeather = true;
      }
    });
  }

}
