import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {Subscription} from "rxjs";
import {Vessel} from "../models/vessel.model";
import {VesselsService} from "../vessels.service";

@Component({
  selector: 'rs-vessel-detail',
  templateUrl: 'vessels-detail.component.html',
  styleUrls: ['vessels-detail.component.css']
})
export class VesselsDetailComponent implements OnInit {
  vessel: Vessel;
  vesselId: number;
  activatedRouteSubscription: Subscription;
  viewTechnicalData = false;

  constructor(private vesselsService: VesselsService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRouteSubscription = this.activatedRoute.params.subscribe((params: Params) => {
      this.vesselsService.getVessel(params['key']).subscribe(vessel=>{
        this.vessel = vessel;
      })
    });
  }

  onTechnicalDataClicked() {
    this.viewTechnicalData = !this.viewTechnicalData;
  }

  onEditVessel() {

  }
}