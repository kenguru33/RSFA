import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {Vessel} from "../models/vessel.model";
import {VesselsService} from "../vessels.service";
import {Location} from "@angular/common";

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
  vesselIsLoading;

  constructor(private vesselsService: VesselsService, private activatedRoute: ActivatedRoute, private router: Router, private location: Location) { }

  ngOnInit() {
    this.vesselIsLoading = true;
    this.activatedRouteSubscription = this.activatedRoute.params.subscribe((params: Params) => {
      this.vesselsService.getVessel(params['key']).subscribe(vessel=>{
        this.vessel = vessel;
        this.vesselIsLoading = false;
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
