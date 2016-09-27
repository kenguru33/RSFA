import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Station} from "./models/station";
import {Http, Response} from "@angular/http";

@Injectable()
export class StationsService {

  baseUrl = 'https://rsfa-e3c2f.firebaseio.com';

  constructor(private http: Http) { }

  getStations(): Observable<Station[]> {
    return this.http.get(`${this.baseUrl}/stations.json`).map((response: Response) => {
      let stations = response.json() || {};
      let stationArray = [];
      for (let key in stations) {
        stations[key].key = key;
        stationArray.push(stations[key])
      }
      return stationArray;
    })
  }

  getStation(key): Observable<Station> {
    return this.http.get(`${this.baseUrl}/stations/${key}.json`).map((response: Response) => {
      let station = response.json();
      station.key = key;
      return station;
    })
  }
}
