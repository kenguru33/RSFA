import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {Vessel} from "../models/vessel.model";
import {VesselsService} from "../vessels.service";
import {Location} from "@angular/common";
import {StationsService} from "../../stations/stations.service";
import {Station} from "../../stations/models/station";
import {VesselClassesService} from "../../vessel-classes/vessel-classes.service";
import {VesselClass} from "../../vessel-classes/models/vessel-class";
import {AisService} from "../ais.service";
import {VesselPosition} from "../models/vessel-position";

@Component({
  selector: 'rs-vessel-detail',
  templateUrl: 'vessels-detail.component.html',
  styleUrls: ['vessels-detail.component.css']
})
export class VesselsDetailComponent implements OnInit, OnDestroy {
  vessel: Vessel;
  activatedRouteSubscription: Subscription;
  viewTechnicalData = false;
  isLoading = true;
  station: Station;
  vesselClass: VesselClass;
  vesselPosition: VesselPosition;
  vesselStatusColor: string;

  page = 1;

  constructor(private vesselsService: VesselsService,
              private stationsService: StationsService,
              private vesselClassesService: VesselClassesService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private location: Location,
              private aisService: AisService) { }

  ngOnInit() {

    this.activatedRouteSubscription = this.activatedRoute.params.subscribe((params: Params) => {
      if(params['key']) {
        this.isLoading = true;
        this.vesselsService.getVessel(params['key']).subscribe(vessel=> {
          this.vessel = vessel;
          this.vesselStatusColor = this.vesselsService.getStatusCodes()[vessel.status].color;
          this.aisService.getVesselPosition(vessel).subscribe((vesselPosition: VesselPosition) => {
            this.vesselPosition = vesselPosition;
            this.isLoading = false;
          });
          this.stationsService.getStation(vessel.stationKey).subscribe((station: Station) => {
            this.station = station;
            this.vesselClassesService.getVesselClass(vessel.vesselClassKey).subscribe((vesselClass: VesselClass) => {
              this.vesselClass = vesselClass;
            });
          });
        })
      }
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

  onPageSelect(page: number) {
    this.page = page;
  }
}
