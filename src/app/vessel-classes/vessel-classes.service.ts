import {Injectable, EventEmitter} from '@angular/core';
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs";
import {VesselClass} from "./models/vessel-class"

@Injectable()
export class VesselClassesService {

  baseUrl = 'https://rsfa-e3c2f.firebaseio.com';

  vesselClassListChanged: EventEmitter<string> = new EventEmitter<string>();

  constructor(private http: Http) {

  }

  getVesselClasses() : Observable<VesselClass[]> {
    return this.http.get(`${this.baseUrl}/vessel-classes.json`).map((response: Response) => {
      let vesselClasses = response.json() || {};
      let vesselClassArray = [];

      for (let key in vesselClasses) {
        vesselClasses[key].key = key;
        vesselClassArray.push(vesselClasses[key])
      }
      return vesselClassArray;
    })
  }

  getVesselClass(key: any) {
    return this.http.get(`${this.baseUrl}/vessel-classes/${key}.json`).map((response: Response) => {
      let vesselClass = response.json();
      vesselClass.key = key;
      return vesselClass;
    })
  }

  storeVesselClass(vesselClass: VesselClass): Observable<string> {
    return this.http.post(`${this.baseUrl}/vessels.json?auth=${localStorage.getItem('userToken')}`, JSON.stringify(vesselClass)).map((response: Response) => {
      console.log('stored vessel', response.json());
      this.vesselClassListChanged.emit(response.json().name);
      return response.json().name;
    }).catch(error=> {
      console.log(error);
      let errorMsg = `${error.statusText}(${error.statusCode})`;
      return Observable.throw(errorMsg);
    });
  }
}
