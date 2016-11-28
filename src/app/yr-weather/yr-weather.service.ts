import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Response, Http} from "@angular/http";

@Injectable()
export class YrWeatherService {

  baseUrl = "https://bernt-anker.com/api/json2";

  constructor(private http: Http) {
  }

  getWeather(latitude, longitude): Observable<any> {
    return this.http.get(`${this.baseUrl}?lat=${latitude}&lon=${longitude}`).map((response: Response) => {
      return response;
    });
  }

}
