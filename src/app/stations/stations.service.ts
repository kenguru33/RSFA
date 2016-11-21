import {Injectable, EventEmitter} from '@angular/core';
import {Observable} from "rxjs";
import {Station} from "./models/station";
import {Http, Response} from "@angular/http";
import {Vessel} from "../vessels/models/vessel.model";
import {VesselsService} from "../vessels/vessels.service";

@Injectable()
export class StationsService {

  baseUrl = 'https://rsfa-e3c2f.firebaseio.com';

  stationListChanged: EventEmitter<string> = new EventEmitter<string>();

  constructor(private http: Http, private vesselsService: VesselsService) { }

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
      this.stationListChanged.emit(response.json().name);
      return response.json().name;
    }).catch(error=>{
      console.log(error);
      let errorMsg = `${error.statusText}(${error.statusCode})`;
      return Observable.throw(errorMsg);
    });
  }

  updateStation(station: Station): Observable<string> {
    let key = station.key;
    delete station['key'];
    return this.http.put(`${this.baseUrl}/stations/${key}.json`, JSON.stringify(station)).map((response: Response) => {
      this.stationListChanged.emit(key);
      return key;
    }).catch(error=>{
      console.log(error);
      let errorMsg = `${error.statusText}(${error.statusCode})`;
      return Observable.throw(errorMsg);
    });
  }

  deleteStation(station: Station): Observable<Response> {
    return this.http.delete(`${this.baseUrl}/stations/${station.key}.json`).catch(error=> {
      console.log(error);
      let errorMsg = `${error.statusText}(${error.statusCode})`;
      return Observable.throw(errorMsg);
    });
  }

  getStationsTypeColor(stationType: string): string {
    if (stationType.toLowerCase() == "primærstasjon") {
      return '#5cb85c';
    }
    if (stationType.toLowerCase() == "sekundærstasjon") {
      return '#D3D3D3';
    }

    if (stationType.toLowerCase() == "ambulansestasjon") {
      return '#FF8C00';
    }

    if (stationType.toLowerCase() == "sjøredningskorps") {
      return '#428bca';
    }
  }
}
