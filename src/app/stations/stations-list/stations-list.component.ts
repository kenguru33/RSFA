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

  private showFilterOptions = false;
  private filterPrimary = false;
  private filterRSRK = false;
  private filterAmbulanse = false;
  private filterSecondary = false;


  private showDialog = false;
  private dialogMessage = '';
  private dialogTitle = '';
  private buttonPrimaryText = '';
  private buttonSecondaryText = '';

  private page = 1;

  private stationSearch ="";

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

  onStationSelect(key: string) {

    this.selectedStation = this.stations.find(station=>station.key === key);
    this.selectedIndex = this.stations.findIndex(station=>station.key === key);
  }

  onAddStation() {

  }

  private showDialogBox(message: string) {
    this.dialogTitle = '';
    this.dialogMessage = message;
    this.showDialog = true;
  }

  private deleteStation(value: boolean) {
    console.log('selected Station', this.selectedStation);
    console.log('selected Index Station', this.selectedIndex);
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

  onDeleteStation(key: string) {

    if (key) {
      this.selectedStation = this.stations.find(station=>station.key === key);
      this.selectedIndex = this.stations.findIndex(station=>station.key === key);
    }
    this.showDialogBox('Slette ' + this.selectedStation.name + '?');
  }


  onShowFilterOptions() {
    this.showFilterOptions = !this.showFilterOptions;
  }

  onPageSelect(page: number) {
    setTimeout(()=>{
      this.page = page;
    },0);
  }
}
