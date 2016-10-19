import { Injectable } from '@angular/core';
import {VesselPosition} from "./models/vessel-position";
import {Vessel} from "./models/vessel.model";
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs";
import {vesselsRouting} from "./vessels.routing";

@Injectable()
export class AisService {

  private baseUrl = "http://192.168.1.20";

  constructor(private http: Http) {}

  getVesselPositions(): Observable<VesselPosition[]> {
    return this.http.get(`${this.baseUrl}/aktive.json`).map((response: Response) => {
      return response.json();
    });
  }

  getVesselPosition(vessel: Vessel): Observable<VesselPosition> {
    return this.http.get(`${this.baseUrl}/aktive.json`).map((response: Response) => {
      let  vessels = response.json();
      for (let v of vessels) {
        if (vessel.mmsi == v['MMSI']) {
          let vpos = new VesselPosition();
          vpos.mmsi = v['MMSI'];
          vpos.latitude = v['Latitude'];
          vpos.longitude = v['Longitude'];
          vpos.timeStamp = new Date(v['Time_stamp']);
          return vpos;
        }
      }
      return null;
    })
  }


}
