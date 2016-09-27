import { Component, OnInit } from '@angular/core';
import {StationsService} from "../stations.service";
import {Station} from "../models/station";

@Component({
  selector: 'rs-stations-list',
  templateUrl: './stations-list.component.html',
  styleUrls: ['./stations-list.component.css']
})
export class StationsListComponent implements OnInit {

  stations = [];

  constructor(private stationsService: StationsService) { }

  ngOnInit() {
    this.stationsService.getStations().subscribe((stations: Station[]) => {
      this.stations = stations;
    })
  }

}
