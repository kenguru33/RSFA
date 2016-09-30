import { Component, OnInit } from '@angular/core';
import {StationsService} from "../stations.service";
import {Station} from "../models/station";
import {ActivatedRoute, Params} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-stations-detail',
  templateUrl: './stations-detail.component.html',
  styleUrls: ['./stations-detail.component.css']
})
export class StationsDetailComponent implements OnInit {

  station: Station;
  activatedRouteSubscription: Subscription;
  constructor(private stationsService: StationsService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRouteSubscription = this.activatedRoute.params.subscribe((params: Params) => {
      this.stationsService.getStation(params['key']).subscribe((station) => {
        this.station = station;
        console.log('from station', this.station);
      });
    });
  }

  onStationSelect(){
    console.log('station selected');
  }

}
