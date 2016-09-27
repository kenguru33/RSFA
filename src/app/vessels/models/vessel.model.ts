import {VesselClass} from "./vessel-class.model";
import {VesselLocation} from "./vessel-location.model";
import {VesselStatusCode} from "./vessel-status-code";
import {Station} from "../../stations/models/station";

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
    vesselClassKey: any;
    stationKey: any;
    //private Position: VesselLocation;
}
