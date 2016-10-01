import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {Vessel} from "../models/vessel.model";
import {VesselsService} from "../vessels.service";
import {Location} from "@angular/common";
import {StationsService} from "../../stations/stations.service";
import {Station} from "../../stations/models/station";
import {VesselClass} from "../models/vessel-class.model";
import {VesselClassesService} from "../../vessel-classes/vessel-classes.service";

@Component({
  selector: 'rs-vessel-detail',
  templateUrl: 'vessels-detail.component.html',
  styleUrls: ['vessels-detail.component.css']
})
export class VesselsDetailComponent implements OnInit, OnDestroy {
  vessel: Vessel;
  vesselId: number;
  activatedRouteSubscription: Subscription;
  viewTechnicalData = false;
  isLoading;
  station: Station;
  vesselClass: VesselClass;

  fadein = true;

  constructor(private vesselsService: VesselsService,
              private stationsService: StationsService,
              private vesselClassesService: VesselClassesService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private location: Location) { }

  ngOnInit() {
    this.activatedRouteSubscription = this.activatedRoute.params.subscribe((params: Params) => {
      this.isLoading = true;
      this.vesselsService.getVessel(params['key']).subscribe(vessel=>{
        this.vessel = vessel;
        this.stationsService.getStation(vessel.stationKey).subscribe((station: Station) => {
          this.station = station;
          this.vesselClassesService.getVesselClass(vessel.vesselClassKey).subscribe((vesselClass: VesselClass) => {
            this.vesselClass = vesselClass;
            this.isLoading = false;
          });
        });
      })
    });
  }

  ngOnDestroy(): void {
    this.activatedRouteSubscription.unsubscribe();
  }

  onTechnicalDataClicked() {
    this.viewTechnicalData = !this.viewTechnicalData;
  }

  onEditVessel() {
    console.log('trigger edit vessel', this.vessel);
  }
}
