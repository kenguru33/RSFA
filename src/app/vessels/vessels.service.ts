import {Injectable, EventEmitter, ChangeDetectorRef} from "@angular/core";
import {Http, Response, Headers, RequestOptions} from "@angular/http";
import {Observable} from "rxjs";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";
import "rxjs/add/observable/throw";
import {Vessel} from "./models/vessel.model";
import {VesselStatusCode} from "./models/vessel-status-code";
import {AuthService} from "../shared/auth.service";
import {User} from "../shared/user";

@Injectable()
export class VesselsService {
  headers: Headers;
  requestOptions: RequestOptions;

  constructor(private http: Http, private authService: AuthService) {}

  baseUrl = 'https://rsfa-e3c2f.firebaseio.com';

  vesselListChanged: EventEmitter<string> = new EventEmitter<string>();
//{"uid":"j0PuCbm53SfY7CKa89TaruK8KwI2","displayName":null,"photoURL":null,"email":"bernt.anker@gmail.com","emailVerified":false,"isAnonymous":false,"providerData":[{"uid":"bernt.anker@gmail.com","displayName":null,"photoURL":null,"email":"bernt.anker@gmail.com","providerId":"password"}],"apiKey":"AIzaSyDgAkPHkC2KabvWelAFggwWQvGB-dTU5eI","appName":"[DEFAULT]","authDomain":"rsfa-e3c2f.firebaseapp.com","stsTokenManager":{"apiKey":"AIzaSyDgAkPHkC2KabvWelAFggwWQvGB-dTU5eI","refreshToken":"AGl2vTT1GlvTYX3fIDvL4VIQtP2N1zm8lcBc6o_HCwm78PnMjYYMxgKkJxVZZRGkqEYwmjxPAxVarXADH9U3R2Z-7Wif86v1YnnlHjbcGM6Jm-FVeu5YiXjcAqpdNYLA6sb40ubforrLNmJBlRHutpHR1-0GqPt29UumoTrxrQe-2CVjzP05KsUoO_SjkXdVRo-6LcJ6VxmcSs9kPk_8djZ7uLsRG91WMA","accessToken":"eyJhbGciOiJSUzI1NiIsImtpZCI6IjA5MjI0NjM1NDNmNjE1ZmRkMjUyYzNhY2M0OGQyNTk1ZDNlYzdiZWUifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vcnNmYS1lM2MyZiIsImF1ZCI6InJzZmEtZTNjMmYiLCJhdXRoX3RpbWUiOjE0NzYzMDE2ODQsInVzZXJfaWQiOiJqMFB1Q2JtNTNTZlk3Q0thODlUYXJ1SzhLd0kyIiwic3ViIjoiajBQdUNibTUzU2ZZN0NLYTg5VGFydUs4S3dJMiIsImlhdCI6MTQ3NjMwMTY4NSwiZXhwIjoxNDc2MzA1Mjg1LCJlbWFpbCI6ImJlcm50LmFua2VyQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJiZXJudC5hbmtlckBnbWFpbC5jb20iLCJiZXJudC5hbmtlckBnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.Bpu21jNcGExTS20Jbj_ZLPR3hfGaek_2WXoGPQw5dkt9wKmmJeYxM9K-DhpXjItg5mMIgZytufEysJzOLnagSCTXK81P1UyPJuvf4x1PCyguPdjIc-DRwlrACtub1J3rdSp0ryYKYLuEgtXbjkTgtUgRecbJoAv9m0ZDDE3Exk0dasK7sLUn4Qyq96nL1-LVvvu7rX1I5VNyhKoBpyTfzd21dND9P7J4PWizQloZnBuZkBTklXYSqXfUoQGlCizi5A52BVIBTgW3GKAlomGhqrk6QaVfdJsFe-sxuuWqLjkpqpMYB4YSMUbZHtZxMICH-fhf77-bbJ4W_lj4jZSreA","expirationTime":1476305283611},"redirectEventId":null}

  getVessels(): Observable<Vessel[]> {
    return this.http.get(`${this.baseUrl}/vessels.json?auth=${this.authService.getCurrentUser()['md']}`).map((response: Response) => {
      let vessels = response.json() || {};
      let vesselArray = [];

      for (let key in vessels) {
        vessels[key].key = key;
        vesselArray.push(vessels[key])
      }
      return vesselArray;

    }).catch(error=> {
      console.log(error);
      let errorMsg = `${error.statusText}(${error.statusCode})`;
      return Observable.throw(errorMsg);
    });
  }
  getVessel(key: any):Observable<Vessel> {
    return this.http.get(`${this.baseUrl}/vessels/${key}.json?auth=${this.authService.getCurrentUser()['md']}`).map((response: Response) =>{
      let vessel = response.json();
      vessel.key = key;
      return vessel;
    }).catch(error => {
      console.log(error);
      let errorMsg = `${error.statusText}(${error.statusCode})`;
      return Observable.throw(errorMsg);
    });
  }

  storeVessel(vessel: Vessel): Observable<string> {
    return this.http.post(`${this.baseUrl}/vessels.json`, JSON.stringify(vessel)).map((response: Response) => {
      console.log('stored vessel',response.json());
      this.vesselListChanged.emit(response.json().name);
      return response.json().name;
    }).catch(error=>{
      console.log(error);
      let errorMsg = `${error.statusText}(${error.statusCode})`;
      return Observable.throw(errorMsg);
    });
  }

  updateVessel(vessel: Vessel): Observable<string> {
    let key = vessel.key;
    delete vessel['key'];
    return this.http.put(`${this.baseUrl}/vessels/${key}.json`, JSON.stringify(vessel)).map((response: Response) => {
      this.vesselListChanged.emit(key);
      return key;
    }).catch(error=>{
      console.log(error);
      let errorMsg = `${error.statusText}(${error.statusCode})`;
      return Observable.throw(errorMsg);
    });
  }

  deleteVessel(vessel: Vessel): Observable<Response> {
    return this.http.delete(`${this.baseUrl}/vessels/${vessel.key}.json`).catch(error=> {
      console.log(error);
      let errorMsg = `${error.statusText}(${error.statusCode})`;
      return Observable.throw(errorMsg);
    });
  }

  getStatusCodes(): Array<VesselStatusCode> {
    return [
      { code: 'Operativ', color: '#5cb85c' },
      { code: 'Ute av tjeneste', color: '	#d9534f'},
      { code: 'Reserve', color: '#428bca'}
    ]
  }
}
