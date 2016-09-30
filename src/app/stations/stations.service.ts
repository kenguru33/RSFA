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

  storeStation(station: Station): Observable<string> {
    return this.http.post(`${this.baseUrl}/stations.json`, JSON.stringify(station)).map((response: Response) => {
      console.log('stored station',response.json());
      //this.vesselListChanged.emit(response.json().name);
      return response.json().name;
    }).catch(error=>{
      console.log(error);
      let errorMsg = `${error.statusText}(${error.statusCode})`;
      return Observable.throw(errorMsg);
    });
  }

  updateStation(station: Station): Observable<string> {
    console.log('update station');
    return new Observable;
  }
}
