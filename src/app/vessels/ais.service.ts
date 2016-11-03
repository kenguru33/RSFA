import {Injectable, EventEmitter} from '@angular/core';
import {VesselPosition} from "./models/vessel-position";
import {Vessel} from "./models/vessel.model";
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs";
import {IntervalObservable} from "rxjs/observable/IntervalObservable";

@Injectable()
export class AisService {

  private baseUrl = "https://ais.rs.no";
  vesselPositionRefreshed: EventEmitter<null> = new EventEmitter<null>();

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


  getDecPos(dmsString: string) {
    if(!dmsString) return;
    dmsString = dmsString.trim();

    // Inspired by https://gist.github.com/JeffJacobson/2955437
    // See https://regex101.com/r/kS2zR1/3
    var dmsRe = /([NSEW])?(-)?(\d+(?:\.\d+)?)[°º:d\s]?\s?(?:(\d+(?:\.\d+)?)['’‘′:]\s?(?:(\d{1,2}(?:\.\d+)?)(?:"|″|’’|'')?)?)?\s?([NSEW])?/i;

    var result = {};

    var m1, m2, decDeg1, decDeg2, dmsString2;

    m1 = dmsString.match(dmsRe);

    if (!m1) throw 'Could not parse string';

    // If dmsString starts with a hemisphere letter, then the regex can also capture the
    // hemisphere letter for the second coordinate pair if also in the string
    if (m1[1]) {
      m1[6] = undefined;
      dmsString2 = dmsString.substr(m1[0].length - 1).trim();
    } else {
      dmsString2 = dmsString.substr(m1[0].length).trim();
    }

    decDeg1 = this.decDegFromMatch(m1);

    m2 = dmsString2.match(dmsRe);

    decDeg2 = m2 ? this.decDegFromMatch(m2) : {};

    if (typeof decDeg1.latLon === 'undefined') {
      if (!isNaN(decDeg1.decDeg) && isNaN(decDeg2.decDeg)) {
        // If we only have one coordinate but we have no hemisphere value,
        // just return the decDeg number
        return decDeg1.decDeg;
      } else if (!isNaN(decDeg1.decDeg) && !isNaN(decDeg2.decDeg)) {
        // If no hemisphere letter but we have two coordinates,
        // infer that the first is lat, the second lon
        decDeg1.latLon = 'lat';
        decDeg2.latLon = 'lon';
      } else {
        throw 'Could not parse string';
      }
    }

    // If we parsed the first coordinate as lat or lon, then assume the second is the other
    if (typeof decDeg2.latLon === 'undefined') {
      decDeg2.latLon = decDeg1.latLon === 'lat' ? 'lon' : 'lat';
    }

    result[decDeg1.latLon] = decDeg1.decDeg;
    result[decDeg2.latLon] = decDeg2.decDeg;

    return result;

  };

  private decDegFromMatch(m) {
  var signIndex = {
    "-": -1,
    "N": 1,
    "S": -1,
    "E": 1,
    "W": -1
  };

  var latLonIndex = {
    "N": "lat",
    "S": "lat",
    "E": "lon",
    "W": "lon"
  };
  var degrees, minutes, seconds, sign, latLon;

  sign = signIndex[m[2]] || signIndex[m[1]] || signIndex[m[6]] || 1;
  degrees = Number(m[3]);
  minutes = m[4] ? Number(m[4]) : 0;
  seconds = m[5] ? Number(m[5]) : 0;
  latLon = latLonIndex[m[1]] || latLonIndex[m[6]];

  if (!this.inRange(degrees, 0, 180)) throw 'Degrees out of range';
  if (!this.inRange(minutes, 0, 60)) throw 'Minutes out of range';
  if (!this.inRange(seconds, 0, 60)) throw 'Seconds out of range';

  return {
    decDeg: sign * (degrees + minutes / 60 + seconds / 3600),
    latLon: latLon
  };
}

  private inRange(value, a, b) {
  return value >= a && value <= b;
}


}
