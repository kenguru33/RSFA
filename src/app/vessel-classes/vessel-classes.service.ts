import { Injectable } from '@angular/core';
import {Http, Response} from "@angular/http";
import {VesselClass} from "../vessels/models/vessel-class.model";
import {Observable} from "rxjs";

@Injectable()
export class VesselClassesService {

  baseUrl = 'https://rsfa-e3c2f.firebaseio.com';

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
}
