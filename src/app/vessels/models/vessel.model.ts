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
    station: Station;
    staff: string;
    callSign: string;
    financing: string;
    buildingYard: string;
    buildingYear: string;
    dnvClass: string;
    statusInfo: string;
    deckMachinery: string;
    salvageEquipment: string;
    divingEquipment: string;
    navigationEquipment: string;
    communicationEquipment: string;

    //private Position: VesselLocation;
}
