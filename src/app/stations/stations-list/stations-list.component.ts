import { Component, OnInit } from '@angular/core';
import {StationsService} from "../stations.service";
import {Station} from "../models/station";
import {Router} from "@angular/router";

@Component({
  selector: 'rs-stations-list',
  templateUrl: './stations-list.component.html',
  styleUrls: ['./stations-list.component.css']
})
export class StationsListComponent implements OnInit {

  stations = [];
  stationSelectedIndex: number;
  isLoading = true;
  constructor(private stationsService: StationsService, private router: Router) { }

  ngOnInit() {
    this.stationsService.getStations().subscribe((stations: Station[]) => {
      this.isLoading = true;
      this.stations = stations;
      this.isLoading = false;
    })
  }

  onStationSelect(index) {
    this.stationSelectedIndex = index;
  }

  onAddStation() {

  }
}
