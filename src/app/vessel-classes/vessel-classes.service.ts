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

  updateVesselClass(vesselClass: VesselClass): Observable<string> {
    let key = vesselClass.key;
    delete vesselClass['key'];
    return this.http.put(`${this.baseUrl}/vessel-classes/${key}.json`, JSON.stringify(vesselClass)).map((response: Response) => {
      return response.json().name;
    }).catch(error=>{
      let errorMsg = `${error.statusText}(${error.statusCode})`;
      return Observable.throw(errorMsg);
    })
  }

  storeVesselClass(vesselClass: VesselClass): Observable<string> {
    return this.http.post(`${this.baseUrl}/vessel-classes.json?auth=${localStorage.getItem('userToken')}`, JSON.stringify(vesselClass)).map((response: Response) => {
      console.log('stored vessel', response.json());
      this.vesselClassListChanged.emit(response.json().name);
      return response.json().name;
    }).catch(error=> {
      console.log(error);
      let errorMsg = `${error.statusText}(${error.statusCode})`;
      return Observable.throw(errorMsg);
    });
  }

  deleteVesselClass(vesselClass: VesselClass): Observable<Response> {
    return this.http.delete(`${this.baseUrl}/vessel-classes/${vesselClass.key}.json?auth=${localStorage.getItem('userToken')}`).catch(error=> {
      console.log(error);
      return Observable.throw(error);
    });
  }

}
