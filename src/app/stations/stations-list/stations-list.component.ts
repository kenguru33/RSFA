import { Component, OnInit } from '@angular/core';
import {StationsService} from "../stations.service";
import {Station} from "../models/station";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";
import {VesselsService} from "../../vessels/vessels.service";

@Component({
  selector: 'rs-stations-list',
  templateUrl: './stations-list.component.html',
  styleUrls: ['./stations-list.component.css']
})
export class StationsListComponent implements OnInit {

  stations = [];
  selectedIndex: number;
  selectedStation: Station;
  isLoading = true;

  stationChangedSubscription: Subscription;

  private showDialog = false;
  private dialogMessage = '';
  private dialogTitle = '';
  private buttonPrimaryText = '';
  private buttonSecondaryText = '';

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
    this.selectedIndex = index;
    this.selectedStation = this.stations[index];
  }

  onAddStation() {

  }

  private showDialogBox(message: string) {
    this.dialogTitle = '';
    this.dialogMessage = message;
    this.showDialog = true;
  }

  private deleteStation(value: boolean) {
    this.showDialog = false;
    if (!value) return;
    let index = this.selectedIndex;
    if (index > -1) {
      this.stations.splice(index, 1);
    }
    this.stationsService.deleteStation(this.selectedStation).subscribe(()=>{
      console.log('we have a successfull deltion');
    },error => {
      console.log(error);
    });
  }
  onDeleteStation(index: number) {
    if (index > -1) {
      this.selectedStation= this.stations[index];
      this.selectedIndex = index;
    }
    this.showDialogBox('Slette ' + this.stations[index].name + '?');
  }

  onFilterOperativ() {
    console.log ('filter operative...');
  }
}
