import { Component, OnInit } from '@angular/core';
import {StationsService} from "../stations.service";
import {Station} from "../models/station";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'rs-stations-list',
  templateUrl: './stations-list.component.html',
  styleUrls: ['./stations-list.component.css']
})
export class StationsListComponent implements OnInit {

  stations = [];
  stationSelectedIndex: number;
  isLoading = true;

  stationChangedSubscription: Subscription;

  constructor(private stationsService: StationsService, private router: Router) { }

  ngOnInit() {
    this.stationChangedSubscription = this.stationsService.stationListChanged.subscribe(key=>{
      this.getStations();
    });
    this.getStations();
  }

  private getStations() {
    this.stationsService.getStations().subscribe((stations: Station[]) => {
      this.isLoading = true;
      this.stations = stations;
      this.isLoading = false;
    });
  }

  onStationSelect(index) {
    this.stationSelectedIndex = index;
  }

  onAddStation() {

  }
}
