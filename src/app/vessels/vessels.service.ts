import {Injectable, EventEmitter, ChangeDetectorRef, Inject} from "@angular/core";
import {Http, Response, Headers, RequestOptions} from "@angular/http";
import {Observable} from "rxjs";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";
import "rxjs/add/observable/throw";
import {Vessel} from "./models/vessel.model";
import {VesselStatusCode} from "./models/vessel-status-code";
import {UserServiceToken} from "../user-manager/shared/services/firebase/firebase-user.service";
import {UserService} from "../user-manager/shared/services/user.service";
import {Station} from "../stations/models/station";
import {VesselClass} from "../vessel-classes/models/vessel-class";

@Injectable()
export class VesselsService {
  headers: Headers;
  requestOptions: RequestOptions;

  constructor(private http: Http, @Inject(UserServiceToken) private userService: UserService) {}

  baseUrl = 'https://rsfa-e3c2f.firebaseio.com';

  vesselListChanged: EventEmitter<string> = new EventEmitter<string>();

  getVessels(): Observable<Vessel[]> {
    return this.http.get(`${this.baseUrl}/vessels.json?auth=${localStorage.getItem('userToken')}`).map((response: Response) => {
      let vessels = response.json() || {};
      let vesselArray = [];
      for (let key in vessels) {
        vessels[key].key = key;
        vesselArray.push(vessels[key])
      }
      return vesselArray;

    }).catch(error => {
      console.log(error);
      return Observable.throw(error);
    });

  }

  getVessel(key: any): Observable<Vessel> {
    if (!key) return;
    return this.http.get(`${this.baseUrl}/vessels/${key}.json?auth=${localStorage.getItem('userToken')}`).map((response: Response) => {
      let vessel = response.json();
      vessel.key = key;
      return vessel;
    }).catch(error => {
      console.log(error);
      return Observable.throw(error);
    });
  }

  storeVessel(vessel: Vessel): Observable<string> {
    return this.http.post(`${this.baseUrl}/vessels.json?auth=${localStorage.getItem('userToken')}`, JSON.stringify(vessel)).map((response: Response) => {
      console.log('stored vessel', response.json());
      this.vesselListChanged.emit(response.json().name);
      return response.json().name;
    }).catch(error=> {
      console.log(error);
      return Observable.throw(error);
    });
  }

  updateVessel(vessel: Vessel): Observable<string> {
    let key = vessel.key;
    delete vessel['key'];
    return this.http.put(`${this.baseUrl}/vessels/${key}.json?auth=${localStorage.getItem('userToken')}`, JSON.stringify(vessel)).map((response: Response) => {
      this.vesselListChanged.emit(key);
      return key;
    }).catch(error=> {
      console.log(error);
      return Observable.throw(error);
    });
  }

  deleteVessel(vessel: Vessel): Observable<Response> {
    return this.http.delete(`${this.baseUrl}/vessels/${vessel.key}.json?auth=${localStorage.getItem('userToken')}`).catch(error=> {
      console.log(error);
      return Observable.throw(error);
    });
  }

  getStatusCodes(): Array<VesselStatusCode> {
    return [
      {code: 'Operativ', color: '#5cb85c'},
      {code: 'Transit', color: '#428bca'},
      {code: 'Spesialoppdrag', color: '#428bca'},
      {code: 'Verksted', color: '#428bca'},
      {code: 'Ute av tjeneste', color: '	#d9534f'},
      {code: 'Redusert', color: '#FF8C00'},
      {code: 'Reserve', color: '#428bca'},
      {code: 'Solgt', color: '#D3D3D3'},
      {code: 'Museum', color: '#D3D3D3'},
      {code: 'Forlist', color: '#D3D3D3'},
      {code: 'Under bygging', color: '#D3D3D3'}
    ]
  }

  getVesselsOnStation(station: Station): Observable<Vessel[]> {
    return this.http.get(`${this.baseUrl}/vessels.json?auth=${localStorage.getItem('userToken')}`).map((response: Response) => {
      let vessels = response.json() || {};
      let vesselArray = [];
      for (let key in vessels) {
        if (vessels[key].stationKey === station.key) {
          vessels[key].key = key;
          vesselArray.push(vessels[key]);
        }
      }
      return vesselArray;

    }).catch(error => {
      console.log(error);
      return Observable.throw(error);
    });
  }
  getVesselsInVesselClass(vesselClass: VesselClass) : Observable<Vessel[]> {
    return this.http.get(`${this.baseUrl}/vessels.json?auth=${localStorage.getItem('userToken')}`).map((response: Response) =>{
      let vessels = response.json() || {};
      let vesselArray = [];
      console.log('kokovesselclass',vesselClass);
      for (let key in vessels) {
        if (vessels[key].vesselClassKey === vesselClass.key) {
          vessels[key].key = key;
          vesselArray.push(vessels[key]);
        }
      }
      return vesselArray;

    }).catch(error => {
      console.log(error);
      return Observable.throw(error);
    });
  }
}
