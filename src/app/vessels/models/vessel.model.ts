import {VesselClass} from "./vessel-class.model";
import {Station} from "../../stations/station";
import {VesselLocation} from "./vessel-location.model";
import {VesselStatusCode} from "./vessel-status-code";

export class Vessel {
    key: any;
    prefix: string;
    id: number;
    name: string;
    email: string;
    phone: string;
    imgUrl: string;
    status: number;
    mmsi: number;
    vesselClass: VesselClass;
    private station: Station;
    //private Position: VesselLocation;


    public get Station() {
        return this.station;
    }

    public set Station(station: Station) {
        this.station = station;
    }
}
