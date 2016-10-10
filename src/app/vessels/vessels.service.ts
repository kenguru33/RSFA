import {Injectable, EventEmitter} from "@angular/core";
import {Http, Response, Headers, RequestOptions} from "@angular/http";
import {Observable} from "rxjs";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";
import "rxjs/add/observable/throw";
import {Vessel} from "./models/vessel.model";
import {VesselStatusCode} from "./models/vessel-status-code";
import {AuthService} from "../shared/auth.service";

@Injectable()
export class VesselsService {

    constructor(private http: Http, private authService: AuthService) {
      console.log('Getting vesselslist',this.authService.isLoggedIn());
    }

    baseUrl = 'https://rsfa-e3c2f.firebaseio.com';

    vesselListChanged: EventEmitter<string> = new EventEmitter<string>();

    getVessels(): Observable<Vessel[]> {
        return this.http.get(`${this.baseUrl}/vessels.json`).map((response: Response) => {
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
        return this.http.get(`${this.baseUrl}/vessels/${key}.json`).map((response: Response) =>{
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
