import { Component, OnInit } from '@angular/core';
import {VesselsService} from "../vessels/vessels.service";
import {StationsService} from "../stations/stations.service";
import {Station} from "../stations/models/station";
import {Vessel} from "../vessels/models/vessel.model";

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {

  stations: Station[];
  vessels: Vessel[];

  constructor(private vesselsService: VesselsService, private stationsService: StationsService) { }

  ngOnInit() {
    this.vesselsService.getVessels().subscribe(vessels => {
      this.vessels = vessels;
    });

    this.stationsService.getStations().subscribe(stations => {
      this.stations = stations;
    });
  }

}
