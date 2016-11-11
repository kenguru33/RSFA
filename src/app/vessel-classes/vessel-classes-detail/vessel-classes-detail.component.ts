import { Component, OnInit } from '@angular/core';
import {Subscription} from "rxjs";
import {Params, ActivatedRoute} from "@angular/router";
import {VesselClassesService} from "../vessel-classes.service";
import {VesselsService} from "../../vessels/vessels.service";
import {Vessel} from "../../vessels/models/vessel.model";
import {VesselClass} from "../models/vessel-class";

@Component({
  selector: 'rs-vessel-classes-detail',
  templateUrl: './vessel-classes-detail.component.html',
  styleUrls: ['./vessel-classes-detail.component.css']
})
export class VesselClassesDetailComponent implements OnInit {

  vesselClass: VesselClass;
  activatedRouteSubscription: Subscription;
  private viewMoreStationData = false;
  vesselsInClass: Vessel[] = [];

  isLoading = false;

  constructor(private vesselsClassesService: VesselClassesService, private vesselsService: VesselsService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRouteSubscription = this.activatedRoute.params.subscribe((params: Params) => {
      this.isLoading = true;
      if(params['key']) {
        this.vesselsClassesService.getVesselClass(params['key']).subscribe((vesselClass) => {
          this.vesselClass = vesselClass;
          console.log('vesselclass...',vesselClass)
          this.isLoading = false;
          this.vesselsService.getVesselsInVesselClass(vesselClass).subscribe((vessels: Vessel[])=>{
            this.vesselsInClass = vessels;
            console.log('veesels in class',this.vesselsInClass);
          })
        });
      }
    });
  }

  onEditVesselClass() {

  }
}


